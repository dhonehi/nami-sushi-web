<template>
  <h1 v-if="userFav.length === 0">Здесь ничего нет!</h1>
  <div v-else class="fav">
    <div class="fav__header">
      <span>В избранном {{ userFav.length }} товар</span>
    </div>
    <div class="fav__body">
      <table class="cart-table">
        <thead>
        <tr>
          <th class="cart-table__cell"></th>
          <th class="cart-table__cell"></th>
          <th class="cart-table__cell cart-table__title">Название</th>
          <th class="cart-table__cell cart-table__title">Цена</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(product, index) in userFav" :key="product._id">
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <delete-icon :product="product" @delete="leave"></delete-icon>
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <img class="cart__img" :src="require(`../assets/data/${product.images[0]}`)">
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            {{ product.name }}
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            {{ product.regular_price }} &#8381;
          </td>
          <td class="cart-table__cell cart-table__cell_border-bottom"
              :class="{'cart-table__cell_border-top': index===0}">
            <el-button @click="addToCart(product)" size="mini" type="success" icon="el-icon-s-goods" round></el-button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import DeleteIcon from "@/components/DeleteIcon";

export default {
  name: "fav",
  components: {DeleteIcon},
  computed: {
    ...mapGetters('user', ['userFav'])
  },
  mounted() {
    this.$store.commit('pages/setTopBarActive', {path: '/fav', index: 1});
  },
  methods: {
    leave(product) {
      this.$store.commit('user/removeFromFav', product);
    },
    addToCart(product) {
      this.$store.commit('user/addToCart', product);
      this.$message({
        message: 'Добавлено в корзину',
        duration: 1000,
        offset: 60,
        center: true,
        type: 'success'
      });
    }
  }
}
</script>

<style lang="scss" scoped>

.cart-table {
  &__title {
    @media screen and (max-width: 600px) {
      font-size: 0.8rem;
    }
  }

  &__cell:nth-child(3):not(.cart-table__title) {
    font-weight: 600;
    font-style: italic;
    color: #374376;
    @media screen and (max-width: 600px) {
      padding-right: 10px;
      font-size: 0.7rem;
    }
  }

  &__cell:nth-child(4):not(.cart-table__title) {
    font-size: 1.2rem;
    font-style: italic;
    font-weight: 700;
    color: #e9a23c;
    @media screen and (max-width: 600px) {
      font-size: 0.9rem;
      padding-right: 5px;
    }
  }

  &__cell:nth-child(2):not(.cart-table__title) {
    padding-left: 10px;
  }

  .cart__img {
    @media screen and (max-width: 600px) {
      width: 60px;
      height: 40px;
    }
  }
}


.fav {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  border: 1px solid #DCDFE6;

  &__header {
    background-color: white;

    span {
      padding: 10px 25px;
      float: left;
      font-weight: 700;
      font-size: 1.8rem;

      @media screen and (max-width: 600px) {
        font-size: 1rem;
      }
    }
  }

  &__body {
    background-color: white;
    padding: 10px 25px;

    @media screen and (max-width: 600px) {
      padding: 10px 5px;
    }
  }
}
</style>