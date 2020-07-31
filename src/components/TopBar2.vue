<template>
    <header ref="topBar" class="top-bar">
        <el-drawer
                :before-close="closeDrawer"
                :size="'60%'"
                title="I am the title"
                :visible.sync="isOpenMenu"
                :direction="direction">
            <span>Hi, there!</span>
        </el-drawer>
        <img class="top-bar__logo" src="../assets/img/logo.png">
        <nav class="menu">
            <ul class="menu__list">
                <li :class="{'menu__item_hover': isDesktop}" class="menu__item menu__item_state_active">Главная</li>
                <li :class="{'menu__item_hover': isDesktop}" class="menu__item">Избранное</li>
                <li :class="{'menu__item_hover': isDesktop}" class="menu__item">
                    <el-badge class="menu__item-badge" v-if="lengthUserCart > 0" :max="99" :value="lengthUserCart"
                              type="primary">
                    </el-badge>
                    <span>Корзина</span>
                </li>
                <li :class="{'menu__item_hover': isDesktop}" class="menu__item">Выйти</li>
                <li class="menu__item menu__item_hover menu__icon" @click="openDrawer">
                    <el-badge class="menu__item-badge menu__item-badge_pos_dot" is-dot v-if="lengthUserCart > 0"
                              type="primary"></el-badge>
                    <img src="../assets/img/menu.png" alt="">
                </li>
                <li class="menu__item menu__item_hover menu__icon">
                    <i class="el-icon-search"></i>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "top-bar2",
        computed: {
            ...mapGetters('user', ['lengthUserCart']),
            ...mapGetters('pages', ['sideBarActive'])
        },
        data() {
            return {
                isOpenMenu: false,
                direction: 'ltr',
                isDesktop: true,
                data: ''
            }
        },
        mounted() {
            window.addEventListener('resize', this.updateWidth);
            if (window.innerWidth < 600) this.isDesktop = false;
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
                this.$refs.topBar.style.position = 'static';
            },
            closeDrawer(done) {
                done();
                this.isOpenMenu = false;
                this.$refs.topBar.style.position = 'fixed';
            },
            updateWidth() {
                if (window.innerWidth > 600) {
                    this.isOpenMenu = false;
                    this.isDesktop = true;
                    this.$refs.topBar.style.position = 'fixed';
                } else {
                    this.isDesktop = false;
                }
            },
            page(item) {
                console.log(item.target.textContent)
            },
        },
        watch: {
            data() {
                console.log('ok')
            }
        }
    }
</script>

<style lang="scss" scoped>
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
            font-size: 17px;

            &_hover:hover {
                background-color: #ddd;
                color: black;
            }

            &_state_active {
                background-color: #4CAF50;
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
                height: 100%;
                display: flex;
                align-items: center;

                li.menu__icon {
                    order: 1;
                    display: block;

                    &:last-child {
                        order: 3;
                        font-weight: 900 !important;
                        position: absolute;
                        right: 25px;
                        font-size: 25px;
                        padding-top: 6px;
                    }
                }
            }

            &__item {
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
                    padding: 0 0 5px;
                }
            }
        }
    }
</style>