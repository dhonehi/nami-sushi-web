<template>
    <div class="home" v-loading.fullscreen="isLoading">
        <header class="home__header">
            <el-select @change="sortingByCategory" style="margin: 15px 0" size="medium" v-model="value"
                       placeholder="Категории">
                <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-input
                    placeholder="Поиск..."
                    prefix-icon="el-icon-search"
                    v-model="search">
            </el-input>
        </header>
        <div class="home__body">
            <div class="products">
                <el-card shadow="hover" v-for="product in productsData" :key="product._id">
                    <div class="products__item">
                        <img :src="`${host}/image/${product.images[0]}`" alt="">
                        <div class="products__item-name">
                            <span>{{product.name}}</span>
                        </div>
                        <div class="products__item-body">
                            <span>{{product.description}}</span>
                        </div>
                        <div class="products__item-footer">
                            <div class="products__item-price">
                                <span><del>ddf</del></span>
                            </div>
                            <div class="products__item-btn">
                                <el-button @click="addToCart" size="mini" type="success">В корзину</el-button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex'

    export default {
        name: "MainPage",
        components: {},
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
                productsData: []
            }
        },
        watch: {
            search(newValue) {
                this.productsData = this.products().filter(data => data.name.toLowerCase().includes(newValue.toLowerCase()))
            }
        },
        computed: {
            ...mapState(['host']),
            ...mapGetters('products', ['categories'])
        },
        methods: {
            ...mapActions('products', ['loadData']),
            ...mapGetters('products', ['products', 'productsByCategory']),
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
                this.isLoading = true
                this.loadData().then(status => {
                    this.isLoading = false;
                    const isValid = this.isValidResponse(status, false);
                    if (isValid)
                        this.productsData = this.products()
                })
            },
            sortingByCategory(category) {
                this.productsData = this.productsByCategory()(category);
            },
            addToCart() {
                console.log('asd')
            }
        }
    }
</script>

<style lang="scss">
    .home__header {
        display: flex;
        justify-content: center;
        align-items: center;

        > .el-select {
            margin-right: 15px !important;
        }

        > .el-input {
            margin-left: 15px;
            width: 200px;
        }
    }

    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        > .el-card {
            background-color: rgba(255, 125, 93, 0.17);
            margin: 20px;
        }

        &__item {
            width: 350px;

            &-name {
                text-align: left;
                margin-top: 10px;
            }

            &-body {
                text-align: left;
                margin-top: 20px;
            }

            &-footer {
                margin-top: 15px;
                flex-grow: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            &-btn {
                span {
                    font-size: 1rem;
                    letter-spacing: 1px
                }
            }

            &-price {
                span {
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: #E6A23C;
                }
            }

            > img {
                width: 100%;
                height: 300px;
                object-fit: fill;
            }
        }
    }
</style>