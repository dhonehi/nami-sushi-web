<template>
    <el-card class="product-card" shadow="hover">
        <div class="product-card__header">
            <img class="product-card__img" :src="`${host}/image/${product.images[0]}`" alt="">
            <el-tooltip popper-class="pop-custom" class="product-card__fav" effect="light" content="В избранное"
                        placement="bottom-end">
                <el-button size="mini" type="warning" icon="el-icon-star-off" circle></el-button>
            </el-tooltip>
        </div>
        <div class="product-card__body">
            <div class="product-card__name">
                <span>{{product.name}}</span>
            </div>
            <div class="product-card__description">
                <span>{{product.description}}</span>
            </div>
        </div>
        <div class="product-card__footer">
            <div class="product-card__price">
                <span :class="{'cross': product.on_sale}">{{product.price}}  &#8381;</span>
                <span v-if="product.on_sale"> {{product.regular_price}}  &#8381;</span>
            </div>
            <div class="product-card__btn">
                <el-button :class="{addedToCart: isAddedToCart}" slot="reference" @click="addToCart"
                           size="mini" :disabled="isAddedToCart"
                           type="success">{{isAddedToCart ? 'В КОРЗИНЕ': 'КУПИТЬ'}}
                </el-button>
                <vertical-select style="margin-left: 10px" v-if="isAddedToCart"
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
                productCount: this.amountOfProduct()
            }
        },
        props: ['product'],
        computed: {
            ...mapState(['host']),
            isAddedToCart() {
                return this.$store.getters['user/isAddedToCart'](this.product)
            }
        },
        methods: {
            addToCart() {
                this.$store.commit('user/addToCart', this.product);
                this.productCount = 1
            },
            amountOfProduct() {
                return this.$store.getters['user/amountOfProduct'](this.product)
            }
        },
        watch: {
            productCount(newVal, oldVal) {
                if (newVal > oldVal && newVal > 1)
                    this.$store.commit('user/addToCart', this.product);
                else if (newVal < oldVal)
                    this.$store.commit('user/removeFromCart', this.product);

            }
        }
    }
</script>

<style lang="scss">
    .addedToCart {
        background-color: #eae8e8 !important;
        border: 1px solid #eae8e8 !important;
        color: black !important;
        font-size: 0.6rem !important;
    }

    .pop-custom {
        border: 1px solid #F2F6FC !important;
        font-family: Arial, serif;
    }

    .cross {
        text-decoration: line-through;
        font-size: 0.9rem !important;
        color: #909399 !important
    }

    .product-card {
        position: relative;
        width: 415px;
        border: 1px solid #DCDFE6 !important;

        @media screen and (max-width: 1110px) {
            width: 350px;
        }
        @media screen and (max-width: 1000px) {
            width: 300px;
        }

        &__img {
            width: 100%;
            height: 300px;
            object-fit: cover;

            @media screen and (max-width: 1110px) {
                height: 250px;
            }
        }

        &__fav {
            position: absolute;
            top: 30px;
            right: 30px;
        }

        &__name {
            text-align: left;
            margin-top: 10px;
        }

        &__description {
            text-align: left;
            margin-top: 25px;
        }

        &__footer {
            margin-top: 15px;
            flex-grow: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__price {
            span {
                font-weight: 600;
                font-size: 1.2rem;
                color: #E6A23C;
            }
        }

        &__btn {
            display: flex;
            align-items: center;
            height: 50px;

            .el-button {
                font-size: 1rem;
                letter-spacing: 1px;
            }
        }

    }

</style>