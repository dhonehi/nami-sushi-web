<template>
    <div class="home">
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
                        <img :src="`http://95.216.143.170:9000/image/${product.images[0]}`" alt="">
                        <div class="products__item-name">
                            <span>{{product.name}}</span>
                        </div>
                        <div class="products__item-description">
                            <span>{{product.description}}</span>
                        </div>
                        <div class="products__item-footer">
                            <div class="product__item-cost">
                                <span>{{product.price}}</span>
                            </div>
                            <div class="products__item-btn">
                                <button>Купить</button>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainPage",
        components: {},
        mounted() {
            this.loadData();
/*            this.isLoading = true;
            this.$store.commit('pages/setSideBarActive', 'main');
            this.loadData().then(status => {
                this.isLoading = false;
                const isValid = this.isValidResponse(status);
                if (isValid)
                    this.productsData = this.products()
            })*/
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
        methods: {
            loadData: async function () {
                try {
                    let response = await this.$http.get(`/products`);
                    console.log(response);
                    this.productsData = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        }
        /* computed: mapGetters('products', ['categories']),
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
         }*/
    }
</script>

<style lang="scss">
    .page-content {
        width: 100%;
        height: 100%;
        overflow: auto;

    }

    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        >.el-card {
            margin: 20px;
        }

        &__item {
            width: 360px;

            >img {
                width: 100%;
                height: 200px;
                object-fit: contain;
            }
        }
    }
</style>