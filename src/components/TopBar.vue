<template>
  <header class="top-bar">
    <el-drawer
        ref="drawer"
        class="drawer"
        :before-close="closeDrawer"
        :size="'80%'"
        :visible.sync="isOpenMenu"
        :direction="direction">
      <div class="drawer__img">
        <el-avatar :size="size" :src="circleUrl"></el-avatar>
      </div>
      <div class="drawer__user-name">
        <span>{{ user.name }}</span>
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
        <div class="column" @click="setPage('/cart')">
          <div class="column__top">
            <span>{{ lengthUserCartStr }}</span>
          </div>
          <div class="column__bottom">
            <span>Корзина</span>
          </div>
        </div>
        <div class="column" @click="setPage('/fav')">
          <div class="column__top">
            <span>{{ lengthUserFavStr }}</span>
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
        <li @click="setPage('/fav')" class="menu__item">
          <el-badge class="menu__item-badge" v-if="lengthUserFav > 0 && windowWidth > 600" :max="99"
                    :value="lengthUserFav"
                    type="primary">
          </el-badge>
          <span>Избранное</span>
        </li>
        <li @click="setPage('/fav')" class="menu__item">
          Заказы
        </li>
        <li @click="setPage('/cart')" class="menu__item">
          <el-badge class="menu__item-badge" v-if="lengthUserCart > 0 && windowWidth > 600" :max="99"
                    :value="lengthUserCart"
                    type="primary">
          </el-badge>
          <span>Корзина</span>
        </li>
        <li class="menu__item" @click="showProfile"><span class="el-icon-user"></span></li>
        <li class="menu__item menu__icon" @click="openDrawer">
          <el-badge class="menu__item-badge menu__item-badge_pos_dot" is-dot v-if="lengthUserCart > 0"
                    type="primary"></el-badge>
          <i class="el-icon-s-unfold"></i>
        </li>
        <li class="menu__item menu__icon">
          <div class="search">
            <i @click="backToTheGoods" class="el-icon-back"></i>
            <div class="search__wrapper">
              <input ref="inputSearch" v-model="search" @focus="focusAndBlur" @blur="focusAndBlur"
                     type="text"
                     placeholder="Поиск...">
            </div>
          </div>
        </li>
      </ul>
    </nav>
    <profile :show="show"></profile>
  </header>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import Profile from "@/components/Profile";

export default {
  name: "top-bar1",
  components: {Profile},
  computed: {
    ...mapGetters('user', ['lengthUserCart', 'lengthUserFav']),
    ...mapState('user', ['user']),
    ...mapState('pages', ['topBarActive']),
    lengthUserCartStr() {
      return this.lengthToString(this.lengthUserCart);
    },
    lengthUserFavStr() {
      return this.lengthToString(this.lengthUserFav);
    }
  },
  data() {
    return {
      show: false,
      search: '',
      windowWidth: 0,
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

    if (this.windowWidth <= 600)
      this.$refs.inputSearch.oninput = () => {
        this.search = this.$refs.inputSearch.value;
      }
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
    editHeightOfApp() {
      document.querySelector('#app').classList.toggle('app_height_window');
    },
    openDrawer() {
      this.$emit('drawerEvent');
      this.isOpenMenu = !this.isOpenMenu;
      this.topBar.style.position = 'static';
      this.editHeightOfApp()
    },
    closeDrawer(done) {
      done();
      this.$emit('drawerEvent');
      this.isOpenMenu = false;
      this.topBar.style.position = 'fixed';
      this.editHeightOfApp()
    },
    updateWidth() {
      if (this.windowWidth !== window.innerWidth)
        this.topBar.style.position = 'fixed';

      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 600) {
        if (this.isOpenMenu)
          this.$refs.drawer.closeDrawer();

        this.isOpenMenu = false;
      }

      if (this.windowWidth <= 600) this.show = false;
    },
    setPage(page) {
      if (this.$route.path !== page) {
        if (page === '/logout') {
          this.$store.commit('user/logOut')
          this.$router.push('/login')
        } else {
          if (this.windowWidth <= 600) this.$refs.drawer.closeDrawer();
          this.$router.push(page);
        }
      }
    },
    showProfile() {
      this.show = !this.show;
    },
    lengthToString(length) {
      if (length < 10) return '0' + length;
      else return length;
    },
    focusAndBlur() {
      const
          searchWrapper = document.querySelector('.search__wrapper'),
          menuIcon = document.querySelectorAll('.menu__icon'),
          menuActive = document.querySelector('.menu__item_state_active'),
          iconBack = document.querySelector('.el-icon-back');

      if (this.search === '') {
        iconBack.classList.toggle('el-icon-back_show');
        menuActive.classList.toggle('menu__item_hidden');
        searchWrapper.classList.toggle('search__wrapper_display_none');
        menuIcon[0].classList.toggle('menu__item_hidden');
      }
    },
    backToTheGoods() {
      if (this.search !== '') {
        this.search = '';
        this.focusAndBlur();
        this.$emit('search', '');
      }
    }
  },
  watch: {
    topBarActive(newPage, oldPage) {
      const el = this.topBar.getElementsByClassName('menu__item');
      el[oldPage.index].classList.remove('menu__item_state_active');
      el[newPage.index].classList.add('menu__item_state_active');
    },
    search(value) {
      this.$emit('search', value);
    }
  }
}
</script>

<!--Style for search-->
<style lang="scss">
.menu__item .el-icon-back {
  margin-top: 10px;
  transition: opacity .5s;
  margin-right: 5px;
  opacity: 0 !important;

  &_show {
    opacity: 1 !important;
  }
}

.menu__item_hidden {
  transform: translateX(-150px);
}

.search__wrapper_display_none:after {
  height: 0 !important;
  top: 35px !important;
}

.search {
  display: flex;
  margin-bottom: 13px;
  margin-right: 5px;
}

.search > .search__wrapper {
  display: inline-block;
  position: relative;
}

.search > .search__wrapper:after {
  content: "";
  background: black;
  width: 2px;
  height: 8px;
  position: absolute;
  top: 30px;
  right: 0;
  transform: rotate(135deg);
  transition: .5s;
}

.search > .search__wrapper > input {
  color: black;
  background: transparent;
  width: 18px;
  height: 18px;
  border: solid 2px black;
  outline: none;
  border-radius: 20px;
  transition: width .5s;
}

.search > .search__wrapper > input::placeholder {
  color: rgba(54, 53, 51, 0.55);
  opacity: 0;
  transition: opacity 150ms ease-out;
}

.search > .search__wrapper > input:focus::placeholder {
  opacity: 1;
}

.search > .search__wrapper > input:focus,
.search > .search__wrapper > input:not(:placeholder-shown) {
  width: calc(100vw - 60px);
  padding-left: 10px;
  //border: 2px solid transparent;
  border: none;
  border-radius: 0;
  font-size: 15px;
  border-bottom: 2px solid black;
  margin-top: 10px;
}
</style>

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

      &:hover {
        cursor: pointer;
      }

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
    padding: 14px 14px;
    margin-left: 20px;
    font-size: 17px;
    transition: transform .5s;

    &:hover {
      background-color: #ddd;
      color: black;
    }

    &_state_active {
      background-color: #409EFF;
      color: white;
    }

    &-badge {
      position: absolute !important;
      right: 0;
      top: 2px;

      &_pos_dot {
        top: -8px;
        right: -6px;
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