<template>
    <header ref="top-bar-ref" class="top-bar">
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
                <li :class="[isDesktop ? 'menu__item_desktop' : 'menu__item_mobile']"
                    class="menu__item menu__item_state_active">Главная
                </li>
                <li :class="[isDesktop ? 'menu__item_desktop' : 'menu__item_mobile']" class="menu__item">Избранное</li>
                <li :class="[isDesktop ? 'menu__item_desktop' : 'menu__item_mobile']" class="menu__item">Корзина</li>
                <li :class="[isDesktop ? 'menu__item_desktop' : 'menu__item_mobile']" class="menu__item">Выйти</li>
                <li :class="[isDesktop ? 'menu__item_desktop' : 'menu__item_mobile']" class="menu__item icon"
                    @click="openDrawer">
                    <img src="../assets/img/menu.png" alt="">
                </li>
                <li class="menu__item icon"><i class="el-icon-search"></i></li>
            </ul>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "top-bar1",
        computed: {
            ...mapGetters('user', ['lengthUserCart']),
            ...mapGetters('pages', ['sideBarActive'])
        },
        data() {
            return {
                isOpenMenu: false,
                direction: 'ltr',
                isDesktop: true
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
            openDrawer() {
                this.isOpenMenu = !this.isOpenMenu;
                this.$refs['top-bar-ref'].style.position = 'static';
            },
            closeDrawer(done) {
                done();
                this.isOpenMenu = false;
                this.$refs['top-bar-ref'].style.position = 'fixed';
            },
            updateWidth() {
                if (window.innerWidth > 600) {
                    this.isOpenMenu = false;
                    this.isDesktop = true;
                    this.$refs['top-bar-ref'].style.position = 'fixed';
                } else {
                    this.isDesktop = false;
                }
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
            width: 100%;

            .icon {
                display: none;
            }
        }

        &__item {
            float: left;
            display: block;
            color: black;
            text-align: center;
            padding: 14px 10px;

            &_mobile {
                font-size: 20px;
                cursor: default;

                &:last-child {
                    cursor: pointer;

                    &:hover {
                        background-color: #ddd;
                    }
                }
            }

            &_desktop {
                padding: 14px 16px;
                font-size: 18px;

                &:hover {
                    background-color: #ddd;
                    color: black;
                }
            }

            &_state_active {
                background-color: #4CAF50;
                color: white;
            }
        }
    }


    @media screen and (max-width: 600px) {
        .top-bar {
            justify-content: space-between !important;

            &__logo {
                display: none;
            }
        }

        .menu {
            width: 100%;
            &__list {
                display: flex;
            }
        }

        .menu__item:not(.menu__item_state_active) {
            display: none;
        }

        .menu__item_state_active {
            order: 2;
            background-color: white;
            color: black;
        }

        .menu__list li.icon {
            order: 1;
            display: block;
            margin: 0 !important;
        }

        li.icon:last-child {
            order: 3;
            position: absolute;
            right: 0;
        }
    }
</style>