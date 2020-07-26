<template>
    <div class="header-wrapper">
        <header class="header">
            <img class="header__logo" src="../assets/img/logo.png">
            <el-menu :default-active="sideBarActive" class="menu" mode="horizontal" @select="handleSelect">
                <el-menu-item index="main">Главная</el-menu-item>
                <el-menu-item index="favourites">Избранное</el-menu-item>
                <el-menu-item index="cart">Корзина
                    <el-badge v-if="lengthUserCart > 0" :max="99" :value="lengthUserCart" class="menu__item-badge"
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
        computed: {
            ...mapGetters('user', ['lengthUserCart']),
            ...mapGetters('pages', ['sideBarActive'])
        },
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
        background-color: #ffffff;

        .header {
            margin: 0 auto;
            width: 1130px;
            height: 60px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #dcdfe6;
            padding-top: 10px;
            //background-color: rgba(90,90,90,0.55);

            &__logo {
                width: 165px;
                padding-bottom: 2px;
                height: 59px;
            }

            @media screen and (max-width: 1010px) {
                width: 100%;
            }

            .menu {
                //background-color: #384478;
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