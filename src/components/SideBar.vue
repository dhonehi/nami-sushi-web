<template>
    <el-menu
            :collapse="isCollapse"
            :router="true"
            :default-active="sideBarActive"
            class="el-menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="main">
            <i class="el-icon-user"></i>
            <span>Главная</span>
        </el-menu-item>
        <el-menu-item index="favourites">
            <i class="el-icon-star-off"></i>
            <span>Избранное</span>
        </el-menu-item>
        <el-menu-item index="cart">
            <i class="el-icon-shopping-cart-2"></i>
            <span>Корзина</span>
        </el-menu-item>
        <el-menu-item index="profile">
            <i class="el-icon-user"></i>
            <span>Профиль</span>
        </el-menu-item>
        <el-menu-item index="logout">
            <i class="el-icon-back"></i>
            <span>Выйти</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "SideBar",
        mounted() {
            window.addEventListener('resize', this.resize);
        },
        computed: {
            sideBarActive() {
                return this.$store.state.sideBarActive
            }
        },
        data() {
            return {
                isCollapse: false
            }
        },
        methods: {
            resize: function () {
                this.isCollapse = window.innerWidth < 980;
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu {
        height: 100vh;

        .el-menu-item {
            margin-top: 20px;
        }

        .el-menu-item:last-child {
            position: relative;
            top: 50%;
        }
    }

    .el-menu:not(.el-menu--collapse) {
        width: 300px;
    }

</style>