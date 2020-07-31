<template>
    <header class="top-bar" :class="{'top-bar_display_block': isOpenMenu}">
        <!-- <header class="header">
            &lt;!&ndash; <img class="header__logo" src="../assets/img/logo.png">
             <el-menu :default-active="sideBarActive" class="menu" mode="horizontal" @select="handleSelect">
                 <el-menu-item index="main">Главная</el-menu-item>
                 <el-menu-item index="favourites">Избранное</el-menu-item>
                 <el-menu-item index="cart">Корзина
                     <el-badge v-if="lengthUserCart > 0" :max="99" :value="lengthUserCart" class="menu__item-badge"
                               type="primary"/>
                 </el-menu-item>
                 <el-menu-item index="logout">Выйти</el-menu-item>
             </el-menu>&ndash;&gt;
         </header>-->
        <img class="top-bar__logo" :class="{'top-bar__logo_invisible': isOpenMenu}" src="../assets/img/logo.png">
        <nav class="menu">
            <ul class="menu__list" :class="{'menu__list_responsive': isOpenMenu}">
                <li class="menu__item menu__item_state_active">Главная</li>
                <li class="menu__item">Избранное</li>
                <li class="menu__item">Корзина</li>
                <li class="menu__item">Выйти</li>
                <li class="menu__item icon" @click="openMenu">
                    <img src="../assets/img/menu.png" alt="">
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "top-bar",
        computed: {
            ...mapGetters('user', ['lengthUserCart']),
            ...mapGetters('pages', ['sideBarActive'])
        },
        data() {
            return {
                isOpenMenu: false
            }
        },
        created() {
            window.addEventListener('resize', this.updateWidth);
        },
        methods: {
            handleSelect: function (key) {
                if (key === 'logout') {
                    this.$store.commit('user/logOut')
                    this.$router.push('/login')
                } else {
                    this.$router.push(key)
                }
            },
            openMenu() {
                this.isOpenMenu = !this.isOpenMenu;
            },
            updateWidth() {
                if (window.innerWidth > 600) this.isOpenMenu = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .top-bar {
        display: flex;
        justify-content: space-around;
        height: 80px;
        width: 100vw;
        position: fixed;
        top: 0;
        z-index: 1;
        background-color: #ffffff;

        &_display_block {
            display: block !important;
        }

        &__logo {
            display: block;
            margin-top: 10px;
            width: 165px;
            height: 59px;

            &_invisible {
                display: none;
            }
        }
    }

    .menu {
        &__list {
            background-color: white;
            overflow: hidden;
            cursor: pointer;
            margin-top: 15px;
            padding: 0;

            &_responsive {
                position: relative !important;

                li.icon {
                    position: absolute;
                    right: 0;
                    top: 0;
                }

                .menu__item {
                    float: none !important;
                    display: block !important;
                    text-align: left !important;
                }
            }

            .icon {
                display: none;
            }
        }

        &__item {
            float: left;
            display: block;
            color: black;
            text-align: center;
            padding: 14px 16px;
            font-size: 17px;

            &_state_active {
                background-color: #4CAF50;
                color: white;
            }

            &:hover {
                background-color: #ddd;
                color: black;
            }
        }
    }

    @media screen and (max-width: 600px) {
        .top-bar {
            justify-content: space-between !important;

            &__logo {
                margin-left: 25px;
            }

            .menu__item:last-child {
                margin-right: 25px;
            }
        }

        .menu__item {
            display: none;
        }

        .menu__list li:not(:first-child) {
            display: none;
        }
        .menu__list li.icon {
            float: right;
            display: block;
        }
    }
</style>