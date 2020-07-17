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
            <i class="el-icon-s-home"></i>
            <span class="el-menu-item__header">Главная</span>
        </el-menu-item>
        <el-menu-item index="order-history">
            <i class="el-icon-s-goods"></i>
            <span class="el-menu-item__header">История заказов</span>
            <el-badge :value="12" :max="10" :class="{'el-badge_collapse': isCollapse}"></el-badge>
        </el-menu-item>
        <el-menu-item index="cart">
            <i class="el-icon-shopping-cart-2"></i>
            <span class="el-menu-item__header">Корзина</span>
            <el-badge :value="12" :max="10" :class="{'el-badge_collapse': isCollapse}"></el-badge>
        </el-menu-item>
        <el-menu-item index="profile">
            <i class="el-icon-user"></i>
            <span class="el-menu-item__header">Профиль</span>
        </el-menu-item>
        <el-menu-item index="/login" @click="logOut">
            <i class="el-icon-back"></i>
            <span class="el-menu-item__header">Выйти</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "SideBar",
        mounted() {
            window.addEventListener('resize', this.resize);
        },
        computed: mapGetters('pages', ['sideBarActive']),
        data() {
            return {
                isCollapse: false,
                isHiddenOrderHistory: false,
                isHiddenCart: false
            }
        },
        methods: {
            resize: function () {
                this.isCollapse = window.innerWidth < 980;
            },
            logOut() {
                this.$store.commit('user/logOut')
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-menu {
        position: relative;
        height: 100vh;

        &--collapse {
            width: 80px;
        }

        &:not(&--collapse) {
            width: 300px;
        }

        .el-menu-item {
            position: relative;

            &__header {
                letter-spacing: 1px;
                font-weight: 500;
                font-family: "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            }

            &:last-child {
                position: absolute;
                bottom: 20%;
                width: 100%;
            }

            &:not(:last-child) {
                margin-top: 20px;
            }

            .el-badge {
                position: absolute;
                right: 25px;

                &_collapse {
                    bottom: 15px;
                    right: 2px;
                }
            }
        }
    }

</style>