<template>
    <div class="main-page" v-loading.fullscreen.lock="isLoading">
        <div class="sidebar" v-if="categories.length !== 0 && windowWidth >= 600">
            <div class="sidebar__content">
                <div class="sidebar__search">
                    <el-input
                            size="mini"
                            placeholder="Поиск..."
                            prefix-icon="el-icon-search"
                            v-model="search">
                    </el-input>
                </div>
                <el-divider></el-divider>
                <ul class="category">
                    <li class="category__item" v-for="(item, index) in categories" :key="item.name"
                        @click="sortingByCategory(item.name); setActive(index)">
                        <span ref="category-ref" class="category__name" :class="{'category__name_active': index===0}">
                            {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-page__body">
            <div class="products">
                <div class="products__item" v-for="product in productsData" :key="product._id">
                    <product-card :product="product"></product-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import ProductCard from "./ProductCard";

    export default {
        name: "main-page1",
        components: {ProductCard},
        mounted() {
            /*this.isLoading = true;
            this.$store.commit('pages/setTopBarActive', {path: '/main', index: 0});
            this.loadData().then(status => {
                this.isLoading = false;
                const isValid = this.isValidResponse(status);
                if (isValid) {
                    this.currentCategory = this.categories[0].name;
                    this.productsData = this.productsByCategory()(this.currentCategory);
                }
            })*/
            this.isLoading = true;
            this.$store.commit('pages/setTopBarActive', {path: '/main', index: 0});
            this.loadDataL().then(status => {
                setTimeout(() => {
                    this.isLoading = false;
                    const isValid = this.isValidResponse(status);
                    if (isValid) {
                        this.currentCategory = this.categories[0].name;
                        this.productsData = this.productsByCategory()(this.currentCategory);
                    }
                }, 500)
            })
            window.addEventListener('resize', this.updateWidth);
            this.updateWidth();

        },
        data() {
            return {
                search: '',
                fit: 'fill',
                windowWidth: 0,
                isLoading: false,
                value: 'Все категории',
                productsData: [],
                currentCategory: '',
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
        computed: mapGetters('products', ['categories']),
        watch: {
            search(newValue) {
                this.productsData = this.productsByCategory()(this.currentCategory).filter(data => data.name.toLowerCase().includes(newValue.toLowerCase()))
            }
        },
        methods: {
            ...mapActions('products', ['loadDataL']),
            ...mapGetters('products', ['productsByCategory', 'productsByPrice']),
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
            },
            setActive(categoryIndex) {
                this.currentCategory = this.categories[categoryIndex].name;
                this.$refs["category-ref"].forEach((item, index) => {
                    if (index === categoryIndex)
                        item.classList.add('category__name_active');
                    else
                        item.classList.remove('category__name_active');
                })
            },
            updateWidth() {
                this.windowWidth = window.innerWidth;
                console.log(this.windowWidth);
            }
        }
    }
</script>

<style lang="scss">
    .main-page {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-around;

        @media screen and (max-width: 860px) {
            justify-content: center;
        }

        .sidebar {
            display: flex;
            justify-content: center;
            width: 250px;
            max-width: 250px;
            flex-shrink: 0;

            &__search {
                .el-input__inner {
                    height: 35px;
                    line-height: 35px;
                }
            }

            .el-divider {
                background-color: black;

                &--horizontal {
                    height: 1px;
                }
            }

            &__content {
                margin: 20px 0 0 10px;
                position: fixed;
                max-width: inherit;
            }

            .price {
                &__header {
                    margin-top: 15px;
                }

                &__select {
                    margin-top: 20px;
                    text-align: left;
                    font-size: 0.8rem;
                }
            }

            .category {
                padding: 0;
                list-style: none;
                background-color: white;
                border-radius: 5px;
                box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .15);

                &__item {
                    cursor: pointer;
                    width: 100%;
                    border-bottom: 1px solid #efefef;
                }

                &__name {
                    font-weight: 700;
                    font-size: 1em;
                    letter-spacing: 1px;
                    text-align: start;
                    padding: 15px 25px;
                    color: #332f2e;
                    text-transform: uppercase;
                    display: block;

                    &:hover {
                        color: #da4038;
                    }

                    &_active {
                        color: red;
                    }
                }
            }
        }

        &__body {
            margin-top: 15px;
            width: 80%;

            @media screen and (max-width: 860px) {
                width: 60%;
            }

            @media screen and (max-width: 600px) {
                width: 100%;
            }

            .products {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;

                &__item {
                    margin-bottom: 20px;

                    @media screen and (max-width: 860px) {
                        width: 100%;
                        margin-right: 15px;
                    }

                    @media screen and (max-width: 600px) {
                        margin-left: 15px;
                    }

                    .product-card {
                        @media screen and (max-width: 860px) {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
</style>