<template>
  <transition name="fade">
    <div ref="profile" v-if="show" class="profile">
      <div class="profile__header">
        <el-avatar :size="50" :src="circleUrl"></el-avatar>
        <img class="logout-icon" src="../assets/img/logout.png" alt="#">
      </div>
      <div class="profile__body">
        <el-form :model="userDataForm" :hide-required-asterisk="true" :rules="rules" size="mini">
          <el-form-item label="Логин" prop="login">
            <el-input v-model="userDataForm.login"></el-input>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="userDataForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Телефон" prop="phoneNumber">
            <el-input v-model="userDataForm.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item size="medium">
            <el-button type="primary" @click="onSubmit">Сохранить</el-button>
            <el-button>Изменить пароль</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "profile",
  props: ['show'],
  data() {
    let validateEmail = (rule, value, callback) => {
      let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

      if (value === '')
        callback(new Error('Введите email!'));
      else if (!regexp.test(value))
        callback(new Error('Неверный email'));
      else
        callback();

    };
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userDataForm: {
        login: 'Sergey',
        email: 'email1@gmail.com',
        phoneNumber: '0713508981',
      },
      rules: {
        login: [
          {required: true, message: 'Укажите email!'}
        ],
        email: [
          {required: true, validator: validateEmail}
        ],
        phoneNumber: [
          {required: true, message: 'Укажите телефон'}
        ]
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.createProfile);
    this.createProfile();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.createProfile)
  },
  methods: {
    createProfile() {
      this.$nextTick(() => {
        let box = document.querySelectorAll('.menu__item')[3].getBoundingClientRect();
        if (box !== null && this.show) {
          this.$refs.profile.style.right = Math.round(window.innerWidth - box.left - 120) + 'px';
        }
      })
    }
  },
  watch: {
    show() {
      this.createProfile()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 5px !important;
}

.el-button {
  width: 100%;
  margin-top: 10px;

  &:last-child {
    margin-top: 10px;
    margin-left: 0;
  }
}

.profile {
  position: fixed;
  z-index: 999;
  width: 200px;
  height: 360px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
  border: 2px solid #DCDFE6;
  top: 60px;

  &__header {
    position: relative;
    margin-top: 10px;

    .logout-icon {
      position: absolute;
      right: 10px;
      top: 0;

      &:hover {
        cursor: pointer;
      }
    }
  }

  &__body {
    margin: 5px 10px;
  }
}

/* Анимации появления и исчезновения могут иметь */
/* различные продолжительности и динамику.       */
.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-to {
  transform: translatey(-100px);
  opacity: 0;
}
</style>