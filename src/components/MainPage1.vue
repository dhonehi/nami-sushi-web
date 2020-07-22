<template>
    <div class="home" v-loading.fullscreen="isLoading">
        <div class="home__filters-container">
            <div class="home__filters">
                <div class="home__filters-search">
                    <el-input
                            size="mini"
                            placeholder="Поиск..."
                            prefix-icon="el-icon-search"
                            v-model="search">
                    </el-input>
                </div>
                <el-divider></el-divider>
                <div class="home__filters-category">
                    <el-select @change="sortingByCategory" style="margin: 15px 0" size="mini" v-model="value"
                               placeholder="Категории">
                        <el-option
                                v-for="item in categories"
                                :key="item._id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div class="home__filters-price">
                    <div class="home__filters-price-header">
                        <span>Цена</span>
                    </div>
                    <el-slider
                            @change="sortingByPrices"
                            v-model="prices"
                            range
                            show-stops
                            :step="300"
                            :marks="marks"
                            :max="3000">
                    </el-slider>
                    <div class="home__filters-price_selected">
                        <span>{{prices[0]}}-{{prices[1]}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="home__body">
            <div class="products">
                <div class="products__item" v-for="product in productsData" :key="product._id">
                    <product-card :product="product"></product-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ProductCard from "./ProductCard";

    export default {
        name: "MainPage",
        components: {ProductCard},
        mounted() {
            this.isLoading = true;
            this.$store.commit('pages/setSideBarActive', 'main');
            this.loadData().then(status => {
                this.isLoading = false;
                const isValid = this.isValidResponse(status);
                if (isValid) {
                    this.productsData = this.products()
                }
            })
        },
        data() {
            return {
                search: '',
                fit: 'fill',
                isLoading: false,
                value: 'Все категории',
                productsData: [],
                prices: [300, 900],
                marks: {
                    0: '0',
                    300: '300',
                    900: '900',
                    1500: '1500',
                    2100: '2100',
                    3000: '3000'
                }

            }
        },
        watch: {
            search(newValue) {
                this.productsData = this.products().filter(data => data.name.toLowerCase().includes(newValue.toLowerCase()))
            }
        },
        computed: {
            ...mapGetters('products', ['categories'])
        },
        methods: {
            ...mapActions('products', ['loadData']),
            ...mapGetters('products', ['products', 'productsByCategory', 'productsByPrice']),
            isValidResponse(status, isFirstLoad = true) {
                if (status !== 200) {
                    this.$notify.error({
                        title: 'Ошибка',
                        message: 'Что-то пошло не так!'
                    })
                    return false
                } else {
                    if (!isFirstLoad)
                        this.$notify.success({
                            title: 'Успех',
                            message: 'Успешно обновлено!'
                        })
                    return true
                }
            },
            refreshData() {
                this.isLoading = true;
                this.loadData().then(status => {
                    this.isLoading = false;
                    const isValid = this.isValidResponse(status, false);
                    if (isValid)
                        this.productsData = this.products();
                })
            },
            sortingByCategory(category) {
                this.productsData = this.productsByCategory()(category);
            },
            sortingByPrices(priceArray) {
                this.isLoading = true;
                this.productsData = this.productsByPrice()(priceArray);
                setTimeout(() => {
                    this.isLoading = false;
                }, 500);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cross {
        text-decoration: line-through;
        font-size: 0.9rem !important;
        color: #909399 !important
    }

    .home {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;

        &__filters {
            position: fixed;
        }

        &__filters-container {
            display: flex;
            justify-content: center;
            margin-top: 25px;
            width: 20%;
        }

        &__filters-price {
            margin-top: 15px;
        }

        &__filters-price_selected {
            margin-top: 20px;
            text-align: left;
            font-size: 0.8rem;
        }

        &__body {
            margin-top: 15px;
            width: 80%;
        }
    }

    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        &__item {
            margin-bottom: 20px;
        }
    }

</style>