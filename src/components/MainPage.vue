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
            <el-card class="box-card">
                <div class="products-item">
                    <el-image
                            style="width: 100px; height: 100px"
                            :src="url"
                            :fit="fit">
                    </el-image>
                    <div class="products-item__name">

                    </div>
                    <div class="products-item__description">

                    </div>
                    <div class="products-item__footer">
                        <div class="products-item__price">

                        </div>
                        <div class="products-item__buy">

                        </div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MainPage",
        components: {},
        mounted() {
            this.isLoading = true;
            this.$store.commit('pages/setSideBarActive', 'main');
            this.loadData().then(status => {
                this.isLoading = false;
                const isValid = this.isValidResponse(status);
                if (isValid)
                    this.productsData = this.products()
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
</style>