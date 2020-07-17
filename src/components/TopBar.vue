<template>
    <div class="header-wrapper">
        <el-header class="header">
            <div class="container">
                <h1>Nami Sushi</h1>
                <el-menu :default-active="'main'" class="menu" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="main">Главная</el-menu-item>
                    <el-menu-item index="favourites">Избранное</el-menu-item>
                    <el-menu-item index="cart">Корзина</el-menu-item>
                    <el-menu-item index="logout">Выйти</el-menu-item>
                </el-menu>
            </div>
        </el-header>
    </div>
</template>

<script>
    export default {
        name: "top-bar",
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
    .header-wrapper {
        height: 80px;
        width: 100%;

        .header {
            display: flex;
            justify-content: center;

            .container {
                display: flex;
                justify-content: space-around;
                border-bottom: 1px solid #dcdfe6;
                height: 100%;
                width: 60%;

                @media screen and (max-width: 1010px) {
                    width: 100%;
                }

                .menu {
                    border-bottom: none;

                    .el-menu-item:last-child {
                        margin-left: 25px;
                    }
                }
            }
        }
    }
</style>