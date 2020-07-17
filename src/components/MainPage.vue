<template>
    <div class="main-container">
        <div class="main-content">
            <el-select style="margin: 15px 0" size="mini" v-model="value" placeholder="Категории">
                <el-option
                        v-for="item in categories"
                        :key="item._id"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <el-table
                    v-loading="isLoading"
                    :data="products.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
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
                        <el-tooltip effect="light" content="В корзину" placement="top">
                            <el-button size="mini" type="success" icon="el-icon-shopping-cart-2" circle></el-button>
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
                this.isLoading = false
                this.isValidResponse(status);
            })
        },
        data() {
            return {
                search: '',
                fit: 'fill',
                isLoading: false,
                value: '',
            }
        },
        computed: mapGetters('products', ['products', 'categories']),
        methods: {
            ...mapActions('products', ['loadData']),

            isValidResponse(status) {
                if (status !== 200) {
                    this.$notify.error({
                        title: 'Ошибка',
                        message: 'Что-то пошло не так!'
                    })
                }
            },

            refreshData() {
                this.isLoading = true
                this.loadData().then(status => {
                    this.isLoading = false
                    this.isValidResponse(status);
                })
            }
        }
    }
</script>

<style lang="scss">
    .main-container {
        width: 100%;
        height: 100%;
        overflow: auto;

    }
    .main-content {
        margin: 0 auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        width: 60%;

        @media screen and (max-width: 1010px) {
            width: 100%;
        }
    }

    .main-container::-webkit-scrollbar {width:0px;}
</style>