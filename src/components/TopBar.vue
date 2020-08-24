<template>
    <header class="top-bar">
        <el-drawer
                class="drawer"
                :before-close="closeDrawer"
                :size="'80%'"
                :visible.sync="isOpenMenu"
                :direction="direction">
            <div class="drawer__img">
                <el-avatar :size="size" :src="circleUrl"></el-avatar>
            </div>
            <div class="drawer__user-name">
                <span>{{user.name}}</span>
            </div>
            <div class="drawer__user-info">
                <div class="column">
                    <div class="column__top">
                        <span>00</span>
                    </div>
                    <div class="column__bottom">
                        <span>Мои заказы</span>
                    </div>
                </div>
                <div class="column">
                    <div class="column__top">
                        <span>00</span>
                    </div>
                    <div class="column__bottom">
                        <span>Корзина</span>
                    </div>
                </div>
                <div class="column">
                    <div class="column__top">
                        <span>00</span>
                    </div>
                    <div class="column__bottom">
                        <span>Избранное</span>
                    </div>
                </div>
            </div>
            <div class="drawer__app-logo">
                <img src="../assets/img/logo1.png">
            </div>
        </el-drawer>
        <img class="top-bar__logo" src="../assets/img/logo.png">
        <nav class="menu">
            <ul class="menu__list">
                <li class="menu__item" @click="setPage('/main')">
                    Главная
                </li>
                <li @click="setPage('/favourites')" class="menu__item">
                    Избранное
                </li>
                <li @click="setPage('/cart')" class="menu__item">
                    <el-badge class="menu__item-badge" v-if="lengthUserCart > 0" :max="99" :value="lengthUserCart"
                              type="primary">
                    </el-badge>
                    <span>Корзина</span>
                </li>
                <li @click="setPage('/logout')" class="menu__item">Выйти
                </li>
                <li class="menu__item menu__icon" @click="openDrawer">
                    <el-badge class="menu__item-badge menu__item-badge_pos_dot" is-dot v-if="lengthUserCart > 0"
                              type="primary"></el-badge>
                    <i class="el-icon-s-unfold"></i>
                </li>
                <li class="menu__item menu__icon">
                    <i class="el-icon-search"></i>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapGetters, mapState} from 'vuex'

    export default {
        name: "top-bar",
        computed: {
            ...mapGetters('user', ['lengthUserCart']),
            ...mapState('user', ['user']),
            //...mapState('pages', ['topBarActive']),
            topBarActive: {
                get: function () {
                    return this.$store.state.pages.topBarActive
                },
                set: function (page) {
                    this.$store.commit('pages/setTopBarActive', page)
                }
            }
        },
        data() {
            return {
                isOpenMenu: false,
                direction: 'ltr',
                data: '',
                size: 100,
                circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                topBar: {}
            }
        },
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            this.topBar = document.getElementsByClassName('top-bar')[0];
            this.updateWidth();
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
            openDrawer() {
                this.isOpenMenu = !this.isOpenMenu;
                this.topBar.style.position = 'static';
            },
            closeDrawer(done) {
                done();
                this.isOpenMenu = false;
                this.topBar.style.position = 'fixed';
            },
            updateWidth() {
                if (window.innerWidth > 600) {
                    this.isOpenMenu = false;
                    this.topBar.style.position = 'fixed';
                }
            },
            setPage(page) {
                if (page === '/logout') {
                    this.$store.commit('user/logOut')
                    this.$router.push('/login')
                } else {
                    this.$router.push(page);
                }
            }
        },
        watch: {
            topBarActive(newPage, oldPage) {
                const el = this.topBar.getElementsByClassName('menu__item')
                el[oldPage.index].classList.remove('menu__item_state_active');
                el[newPage.index].classList.add('menu__item_state_active')
            }
        }
    }
</script>

<style lang="scss">
    .drawer {
        &__user-name {
            font-weight: 700;
            letter-spacing: 1px;
        }

        &__user-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 25px;
            padding: 0 10px;
            height: 11vw;
            background-color: #dddddd;

            .column {
                display: flex;
                flex-direction: column;
                font-weight: 600;
                font-size: 3vw;

                &__top {
                    color: #409EFF;
                    flex-grow: 1;
                }
            }
        }

        &__app-logo {
            margin-top: 80px;

            img {
                width: 60%;
                min-width: 150px;
            }
        }
    }

    @media screen and (max-width: 300px) {
        .drawer {
            &__user-info {
                height: 33px;
            }

            .column {
                font-size: 0.6rem;
            }
        }
    }

    .top-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80px;
        width: 100vw;
        top: 0;
        z-index: 1;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        border-bottom: 1px solid #DCDFE6;

        &__logo {
            display: block;
            width: 165px;
            height: 59px;
        }
    }

    .menu {
        &__list {
            background-color: white;
            overflow: hidden;
            cursor: pointer;
            padding: 0;
            width: 100%;

            .menu__icon {
                display: none;
            }
        }

        &__item {
            float: left;
            position: relative;
            display: block;
            color: black;
            text-align: center;
            padding: 14px 16px;
            margin-left: 10px;
            font-size: 17px;

            &:hover {
                background-color: #ddd;
                color: black;
            }

            &_state_active {
                //background-color: #4CAF50;
                background-color: #409EFF;
                color: white;
            }

            &-badge {
                position: absolute;
                right: 0;
                top: 2px;

                &_pos_dot {
                    right: 10px;
                }
            }
        }
    }


    @media screen and (max-width: 600px) {
        .top-bar {
            height: 58px;
        }
        .top-bar__logo {
            display: none;
        }

        .menu {
            height: 100%;
            width: 100%;

            &__list {
                cursor: default;
                height: 100%;
                display: flex;
                align-items: center;

                li.menu__icon {
                    font-size: 25px;
                    display: block;

                    &:hover {
                        cursor: pointer;
                        color: #409EFF;
                    }

                    &:last-child {
                        font-weight: 900 !important;
                        position: absolute;
                        right: 10px;
                    }
                }
            }

            &__item {
                padding: 0;

                &:nth-child(5) {
                    margin-left: 10px;
                }

                &:hover {
                    background: none;
                }

                &:not(&_state_active) {
                    display: none;
                }

                &_state_active {
                    order: 2;
                    font-size: large;
                    font-style: normal;
                    font-weight: 700;
                    background-color: white;
                    color: black;
                    cursor: default;
                    margin-left: 10px;
                }
            }
        }
    }

</style>