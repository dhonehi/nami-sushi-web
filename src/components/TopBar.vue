<template>
    <div class="header-wrapper">
        <header class="header">
            <h1 style="color: white">Nami Sushi</h1>
            <el-menu :default-active="'main'" class="menu" mode="horizontal" @select="handleSelect">
                <el-menu-item index="main">Главная</el-menu-item>
                <el-menu-item index="favourites">Избранное</el-menu-item>
                <el-menu-item index="cart">Корзина
                    <el-badge v-if="userCart.length > 0" :max="99" :value="userCart.length" class="menu__item-badge"
                              type="primary"/>
                </el-menu-item>
                <el-menu-item index="logout">Выйти</el-menu-item>
            </el-menu>
        </header>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "top-bar",
        computed: mapGetters('user', ['userCart']),
        methods: {
            handleSelect: function (key) {
                if (key === 'logout') {
                    this.$store.commit('user/logOut')
                    this.$router.push('/login')
                } else {
                    this.$router.push(key)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .menu__item-badge {
        position: absolute;
        bottom: 8px;
    }

    .header-wrapper {
        height: 80px;
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 1;
        background-color: #51453d;

        .header {
            margin: 0 auto;
            width: 1130px;
            height: 60px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #dcdfe6;
            background-color: #51453d;

            @media screen and (max-width: 1010px) {
                width: 100%;
            }

            .menu {
                background-color: #51453d;
                border-bottom: none;

                .el-menu-item {
                    font-weight: normal;
                    letter-spacing: 1px;
                    font-size: 1rem;
                }

                .el-menu-item:last-child {
                    margin-left: 25px;
                }
            }
        }
    }
</style>