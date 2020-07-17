<template>
    <div class="main-page-content">
        <div class="header">
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
        <div class="goods">
            <el-table
                    v-loading="isLoading"
                    :data="productsData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <p>Описание: {{ scope.row.description }}</p>
                        <p></p>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-image
                                lazy
                                style="width: 100px; height: 100px"
                                :src="scope.row.images[0]"
                                :fit="fit"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Название"
                        prop="name">
                </el-table-column>
                <el-table-column align="center"
                                 label="Скидка">
                    <template slot-scope="scope">
                        <sale-icon v-if="scope.row.on_sale"/>
                    </template>
                </el-table-column>
                <el-table-column
                        label="Цена"
                        prop="price">
                </el-table-column>
                <el-table-column>
                    <template slot="header" slot-scope="scope">
                        <el-input
                                prefix-icon="el-icon-search"
                                v-model="search"
                                size="mini"
                                placeholder="Поиск товара"/>
                    </template>
                    <template slot-scope="scope">
                        <el-tooltip effect="light" :content="scope.row.active ? 'В корзину' : 'Товар не доступен'"
                                    placement="top">
                            <el-button :disabled="!scope.row.active" size="mini" type="success"
                                       icon="el-icon-shopping-cart-2" circle></el-button>
                        </el-tooltip>
                        <el-tooltip effect="light" content="В избранное" placement="top">
                            <el-button size="mini" type="warning" icon="el-icon-star-off" circle></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot="header">
                        <el-tooltip effect="light" content="Обновить" placement="top">
                            <el-button @click="refreshData" size="medium" type="primary" icon="el-icon-refresh"
                                       circle></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import SaleIcon from "./SaleIcon";

    export default {
        name: "MainPage",
        components: {
            SaleIcon
        },
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
        computed: mapGetters('products', ['categories']),
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
    .page-content {
        width: 100%;
        height: 100%;
        overflow: auto;

    }

    .content {
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        width: 60%;

        @media screen and (max-width: 1010px) {
            width: 100%;
        }
    }
</style>