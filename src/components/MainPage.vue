<template>
    <div class="home" :v-loading="isLoading">
        <header class="home__header">
            <el-select @change="sortingByCategory" style="margin: 15px 0" size="mini" v-model="value"
                       placeholder="Категории">
                <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </header>
        <div class="home__body">
            <div class="products">
                <el-card class="box-card" v-for="product in productsData" :key="product._id">
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
                                <span>{{product.price}}</span>
                            </div>
                            <div class="products__item-btn">
                                <button>В корзину</button>
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
                    console.log('products', this.products())
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
            }
        }
    }
</script>

<style lang="scss">
    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        > .el-card {
            margin: 20px;
        }

        &__item {
            display: flex;
            flex-direction: column;
            width: 350px;

            &-name {
                text-align: left;
                margin-top: 15px;
                flex-grow: 0;
            }

            &-body {
                text-align: left;
                margin-top: 25px;
                flex-grow: 1;
            }

            &-footer {
                margin-top: 15px;
                flex-grow: 0;
                display: flex;
                justify-content: space-between;
            }


            > img {
                width: 100%;
                height: 200px;
                object-fit: contain;
            }
        }
    }
</style>