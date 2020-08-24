<template>
    <div class="cart">
        <div class="cart__body">
            <h1 style="display: block" v-if="userCart.length === 0">Здесь ничего нет</h1>
            <table v-else class="cart-table" style="background-color: white; width: 100%">
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
                        {{product.name}}
                    </td>
                    <td class="cart-table__cell cart-table__cell_border-bottom"
                        :class="{'cart-table__cell_border-top': index===0}">
                        <vertical-select :min="1" v-model="product.count"></vertical-select>
                    </td>
                    <td class="cart-table__cell cart-table__cell_border-bottom"
                        :class="{'cart-table__cell_border-top': index===0}">
                        {{product.regular_price * product.count}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'
    import DeleteIcon from "./DeleteIcon";
    import VerticalSelect from "./VerticalSelect";

    export default {
        name: "cart",
        components: {VerticalSelect, DeleteIcon},
        mounted() {
            this.$store.commit('pages/setTopBarActive',{path: '/cart', index: 2})
        },
        computed: {
            ...mapGetters('user', ['userCart']),
            ...mapState(['host'])
        },
        methods: {
            leave(product) {
                this.$store.commit('user/removeCompletely', product)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cart {
        padding-top: 10px;

        tr:hover {
            background-color: rgb(245,247,250);
            transition: background-color .5s;
        }


        &__img {
            width: 100px;
            height: 100px;
            object-fit: fill;
        }

        &-table {
            color: #000;
            font-size: 13px;
            border-spacing: 0;
            padding: 10px 50px;

            &__cell {
                color: #606266;
                font-size: 0.9rem;
                padding: 5px 0;

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
            }

        }
    }
</style>