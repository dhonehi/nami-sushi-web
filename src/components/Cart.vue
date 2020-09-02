<template>
  <h1 v-if="lengthUserCart === 0">Здесь ничего нет!</h1>
  <div v-else class="cart">
    <el-dialog
        title="Заказать?"
        :visible.sync="dialogVisible"
        width="300px">
      <el-button @click="dialogClickEvent(false)">Отмена</el-button>
      <el-button type="primary" @click="dialogClickEvent(true)">Подтвердить</el-button>
    </el-dialog>
    <div class="cart__header">
      <el-page-header v-if="currentStep === 2" @back="goBack" title="Назад">
      </el-page-header>
      <el-steps process-status="wait" :active="currentStep" finish-status="success" simple>
        <el-step :status="currentStep === 1 ? 'process': 'success'" title="Корзина"></el-step>
        <el-step :status="currentStep === 2 ? 'process': 'wait'" title="Оформление заказа"></el-step>
      </el-steps>
    </div>
    <div class="cart__body">
      <table v-if="currentStep === 1" class="cart-table">
        <thead>
        <tr>
          <th class="cart-table__cell"></th>
          <th class="cart-table__cell"></th>
          <th class="cart-table__cell cart-table__title">Название</th>
          <th class="cart-table__cell cart-table__title">Кол-во</th>
          <th class="cart-table__cell cart-table__title">Цена</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in userCart" :key="product._id">
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <delete-icon :product="product" @delete="leave"></delete-icon>
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <!--<img class="cart__img" :src="`${host}/image/${product.images[0]}`">-->
            <img class="cart__img" :src="require(`../assets/data/${product.images[0]}`)">
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            {{ product.name }}
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <vertical-select :min="1" v-model="product.count"></vertical-select>
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            {{ product.regular_price * product.count }} &#8381;
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else class="ordering">
        <div class="ordering__form">
          <el-form ref="form" :label-position="windowWidth <= 600? 'top' : 'left'" :model="orderingForm" :rules="rules" label-width="120px" size="mini">
            <el-form-item v-if="orderingForm.deliveryType === 'Доставка'" label="Адрес" prop="address">
              <el-input v-model="orderingForm.address"></el-input>
            </el-form-item>
            <el-form-item label="Дата" prop="date">
              <datetime type="datetime" v-model="orderingForm.date" @input="selectDate"></datetime>
            </el-form-item>
            <el-form-item label="Телефон" prop="phoneNumber">
              <el-input v-model="orderingForm.phoneNumber"></el-input>
            </el-form-item>
            <el-form-item label="Тип доставки">
              <el-radio-group v-model="orderingForm.deliveryType" size="medium">
                <el-radio border label="Nami Sushi"></el-radio>
                <el-radio border label="Доставка"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="cart__footer">
      <div class="cart__info">
        <div class="cart__info-title">Сумма</div>
        <div class="cart__info-price">{{ finalAmount }} &#8381;</div>
      </div>
      <div class="cart__btn" @click="placeOrder">
        <span>{{ buttonText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import DeleteIcon from "./DeleteIcon";
import VerticalSelect from "./VerticalSelect";
import 'vue-datetime/dist/vue-datetime.css'
import {Datetime} from 'vue-datetime';

export default {
  name: "cart",
  components: {VerticalSelect, DeleteIcon, Datetime},
  mounted() {
    window.addEventListener('resize', this.updateWidth)
    this.$store.commit('pages/setTopBarActive', {path: '/cart', index: 3});
  },
  data() {
    let validatePhoneNumber = (rule, value, callback) => {
      let regexp = /\d{10}/g;

      if (value === '')
        callback(new Error('Укажите номер телефона!'));
      else if (!regexp.test(value) || value.length > 10)
        callback(new Error('Неверный номер!'));
      else
        callback();
    };

    let validateDate = (rule, value, callback) => {
      let input = document.querySelector('.vdatetime-input');

      input.style.borderColor = '#DCDFE6';

      if (value === '') {
        callback(new Error('Укажите дату!'));
        input.style.borderColor = '#F56C6C';
      } else
        callback();
    };

    return {
      currentStep: 1,
      dialogVisible: false,
      windowWidth: 0,
      isValidForm: false,
      orderingForm: {
        address: '',
        date: '',
        phoneNumber: '',
        deliveryType: 'Nami Sushi',
      },
      rules: {
        address: [
          {required: true, message: 'Укажите адрес!'},
        ],
        date: [
          {required: true, validator: validateDate},
        ],
        phoneNumber: [
          {required: true, validator: validatePhoneNumber},
        ],
      }
    }
  },
  computed: {
    ...mapGetters('user', ['userCart', 'lengthUserCart']),
    ...mapState(['host']),
    finalAmount() {
      return this.userCart.reduce((accumulator, current) =>
          accumulator + current.regular_price * current.count,
          0
      )
    },
    buttonText() {
      if (this.currentStep === 1) return 'Продолжить';
      else return 'Заказать'
    }
  },
  methods: {
    leave(product) {
      this.$store.commit('user/removeCompletely', product)
    },
    placeOrder() {
      this.updateWidth();
      if (this.currentStep === 2) {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.dialogVisible = true;
            return valid;
          }
        })
      } else {
        this.currentStep = 2;
      }
    },
    selectDate() {
      if (this.$refs.form !== undefined)
        this.$refs.form.validate((valid) => {
          return valid;
        })
    },
    goBack() {
      this.currentStep = 1;
    },
    dialogClickEvent(isConfirm) {
      if (isConfirm) {
        this.$store.commit('user/clearUserCart');
        this.$router.push('/');
      }
      this.dialogVisible = false;
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    }
  }
}
</script>

<style lang="scss">
.cart {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  border: 1px solid #DCDFE6;

  tr:hover {
    background-color: rgb(245, 247, 250);
    transition: background-color .5s;
  }

  &__header {
    background-color: white;
    padding: 15px 25px;
    @media screen and (max-width: 600px) {
      padding-right: 0;
    }

    .el-steps {
      width: 45%;
      padding-top: 20px;
      background-color: white;
    }

    .el-step__icon {
      position: static;
    }
  }

  &__body {
    background-color: white;
    padding: 10px 25px;
  }

  &__footer {
    background-color: white;
    padding: 10px 25px;
    display: flex;
    font-size: 3em;

    @media screen and (max-width: 600px) {
      height: 40px;
      font-size: 1.5em;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 0.5em;

    &-title {

    }

    &-price {

    }
  }

  &__btn {
    display: flex;
    border-radius: 5px;
    margin-left: 5px;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #409EFF;
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    flex-grow: 2;
    transition: background-color .2s;
    text-align: center;
    font-size: 0.5em;

    &:hover {
      cursor: pointer;
      background-color: rgba(36, 79, 141, 0.55);
    }
  }

  &__img {
    width: 100px;
    height: 80px;
    object-fit: fill;
    @media screen and (max-width: 600px) {
      width: 60px;
      height: 40px;
    }
  }
}

.ordering {
  display: flex;
  flex-direction: column;
  align-items: start;

  @media screen and (max-width: 600px) {
    align-items: center;
  }
}

</style>

<!-- Style for cart-table -->
<style lang="scss">
.cart-table {
  color: #000;
  font-size: 13px;
  width: 100%;
  border-spacing: 0;

  &__cell {
    font-size: 0.9rem;
    padding: 5px 0;

    &:nth-child(3):not(.cart-table__title) {
      font-weight: 600;
      font-style: italic;
      color: #374376;
      @media screen and (max-width: 600px) {
        font-size: 0.7rem;
      }
    }

    &:nth-child(5):not(.cart-table__title) {
      font-size: 1.2rem;
      font-style: italic;
      font-weight: 700;
      color: #e9a23c;
      @media screen and (max-width: 600px) {
        font-size: 0.9rem;
      }
    }

    &_border {
      &-top {
        border-top: 1px solid #E4E7ED;
      }

      &-bottom {
        border-bottom: 1px solid #E4E7ED;
      }
    }

    &_active {
      background-color: #26b83a;
      color: #fff;
      box-shadow: 0 10px 10px rgba(38, 184, 58, 0.2);
    }
  }

  &__title {
    color: #606266;
    font-size: 1rem;
    font-style: italic;
    @media screen and (max-width: 600px) {
      font-size: 0.8rem;
    }
  }

}
</style>

<style lang="scss">
.el-radio {
  @media screen and (max-width: 600px) {
    margin: 5px 0 !important;
    width: 100%;
  }
}

.el-page-header__left {
  align-items: center !important;
}

.el-page-header__title {
  @media screen and (max-width: 350px) {
    font-size: 0.8em !important;
  }
}

.el-steps {
  padding-top: 20px !important;
  padding-left: 5px !important;
  padding-right: 10px !important;
  @media screen and (max-width: 690px) {
    width: 90% !important;
  }

  .el-step__title {
    @media screen and (max-width: 350px) {
      font-size: 0.8em !important;
    }
  }
}

.vdatetime-input {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  line-height: 28px;
  outline: 0;
  padding: 0 15px;
  transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
  width: 100%;

  &:hover {
    border-color: #C0C4CC;
  }
}
</style>