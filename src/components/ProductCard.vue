<template>
  <el-card class="product-card" shadow="hover">
    <div class="product-card__header">
      <img class="product-card__img" :src="require(`../assets/data/${product.images[0]}`)" alt="">
      <el-tooltip :disabled="isDisableToolTip" popper-class="pop-custom" class="product-card__fav" effect="light"
                  :content="isAddedToFav? 'В избранном' : 'В избранное'"
                  placement="bottom-end">
        <el-button :disabled="isAddedToFav" @click="addToFav" size="mini" type="warning"
                   icon="el-icon-star-off" circle></el-button>
      </el-tooltip>
    </div>
    <div class="product-card__body">
      <div class="product-card__name">
        <span>{{ product.name }}</span>
      </div>
      <div class="product-card__description">
        <span>{{ product.description }}</span>
      </div>
    </div>
    <div class="product-card__footer">
      <div class="product-card__price">
        <span :class="{'cross': product.on_sale}">{{ product.price }}  &#8381;</span>
        <span v-if="product.on_sale"> {{ product.regular_price }}  &#8381;</span>
      </div>
      <div class="product-card__btn">
        <el-button :class="{addedToCart: isAddedToCart}" slot="reference" @click="addToCart"
                   size="mini" :disabled="isAddedToCart"
                   type="success">{{ isAddedToCart ? 'В КОРЗИНЕ' : 'КУПИТЬ' }}
        </el-button>
        <vertical-select v-if="isAddedToCart"
                         v-model="productCount"></vertical-select>
      </div>
    </div>
  </el-card>
</template>

<script>
import {mapState} from 'vuex'
import VerticalSelect from "./VerticalSelect";

export default {
  name: "product-card",
  components: {VerticalSelect},
  data: function () {
    return {
      productCount: this.amountOfProduct(),
      isDisableToolTip: false
    }
  },
  props: ['product', 'windowWidth'],
  computed: {
    ...mapState(['host']),
    isAddedToCart() {
      return this.$store.getters['user/isAddedToCart'](this.product);
    },
    isAddedToFav() {
      return this.$store.getters['user/isAddedToFav'](this.product);
    }
  },
  methods: {
    addToCart() {
      this.$store.commit('user/addToCart', this.product);
      this.productCount = 1
    },
    addToFav() {
      this.$store.commit('user/addToFav', this.product);
    },
    amountOfProduct() {
      return this.$store.getters['user/amountOfProduct'](this.product);
    }
  },
  watch: {
    productCount(newVal, oldVal) {
      if (newVal > oldVal && newVal > 1)
        this.$store.commit('user/addToCart', this.product);
      else if (newVal < oldVal)
        this.$store.commit('user/removeFromCart', this.product);
    },
    windowWidth(newVal) {
      this.isDisableToolTip = newVal <= 600;
    }
  }
}
</script>

<style lang="scss">
.el-card__body {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0 !important;
  padding-top: 0 !important;
  @media screen and (max-width: 600px) {
    padding: 5px 5px 0 !important;
  }
}

.el-button--mini {
  @media screen and (max-width: 600px) {
    padding: 5px 5px !important;
  }
}

.select .el-button i {
  @media screen and (max-width: 600px) {
    font-size: 0.5rem !important;
  }
}

.addedToCart {
  background-color: #eae8e8 !important;
  border: 1px solid #eae8e8 !important;
  color: black !important;
  font-size: 0.6rem !important;
  @media screen and (max-width: 600px) {
    font-size: 0.5rem !important;
  }
  @media screen and (max-width: 350px) {
    font-size: 0.4rem !important;
  }
}

.pop-custom {
  border: 1px solid #F2F6FC !important;
  font-family: Arial, serif;
}

.cross {
  @media screen and (max-width: 600px) {
    font-size: 2vw !important;
  }

  text-decoration: line-through;
  font-size: 0.9rem !important;
  color: #909399 !important
}

.product-card {
  position: relative;
  width: 415px;
  height: 100%;
  padding-top: 10px;
  border: 1px solid #DCDFE6 !important;

  @media screen and (max-width: 1150px) {
    width: 350px;
  }
  @media screen and (max-width: 1000px) {
    width: 300px;
  }
  @media screen and (max-width: 860px) {
    width: 415px;
  }

  &__body {
    flex-grow: 1;
  }

  &__img {
    width: 100%;
    height: 300px;
    object-fit: cover;

    @media screen and (max-width: 1150px) {
      height: 250px;
    }
    @media screen and (max-width: 1000px) {
      height: 200px;
    }
    @media screen and (max-width: 860px) {
      height: 300px;
    }
    @media screen and (max-width: 600px) {
      height: 25vw;
    }
  }

  &__fav {
    position: absolute;
    top: 20px;
    right: 30px;

    @media screen and (max-width: 860px) {
      top: 20px;
      right: 30px;
    }
    @media screen and (max-width: 600px) {
      right: 10px;
    }
    @media screen and (max-width: 320px) {
      font-size: 4vw !important;
    }
  }

  &__name {
    color: #374376;
    font-style: italic;
    font-weight: bold;
    font-size: 1.3em;
    text-align: left;
    margin-top: 10px;
  }

  &__description {
    font-style: italic;
    font-weight: 400;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    box-orient: vertical;
  }

  &__footer {
    flex-grow: 0;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__price {
    span {
      @media screen and (max-width: 600px) {
        font-size: 2.5vw;
      }

      font-weight: 600;
      font-size: 1.2rem;
      color: #E6A23C;
    }
  }

  &__btn {
    height: 15px;
    display: flex;
    align-items: center;

    .el-button {
      @media screen and (max-width: 600px) {
        font-size: 2vw;
      }

      font-size: 1rem;
      letter-spacing: 1px;
    }
  }

}

</style>