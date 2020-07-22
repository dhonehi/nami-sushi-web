<template>
    <el-card class="product-card" shadow="hover">
        <div class="product-card__header">
            <img class="product-card__img" :src="`${host}/image/${product.images[0]}`" alt="">
            <el-tooltip popper-class="pop-custom" class="product-card__fav" effect="light" content="В избранное" placement="bottom-end">
                <el-button type="warning" icon="el-icon-star-off" circle></el-button>
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
                <span :class="{'cross': product.on_sale}">{{product.regular_price}}  &#8381;</span>
                <span v-if="product.on_sale"> {{product.sale_price}}  &#8381;</span>
            </div>
            <div class="product-card__btn">
                <el-button size="mini" type="success">В корзину</el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "product-card",
        props: ['product'],
        computed: mapState(['host'])
    }
</script>

<style lang="scss">
    .pop-custom {
        border: 1px solid #F2F6FC !important;
        font-family: Arial,serif;
    }

    .cross {
        text-decoration: line-through;
        font-size: 0.9rem !important;
        color: #909399 !important
    }

    .product-card {
        position: relative;
        width: 350px;

        &__img {
            width: 100%;
            height: 350px;
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
            .el-button {
                font-size: 1rem;
                letter-spacing: 1px;
            }
        }

    }

</style>