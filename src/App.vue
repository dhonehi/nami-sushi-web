<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/scss/fonts.scss";

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

html {
}

/* Set core body defaults */
body {
  //min-height: 100vh;
  min-width: 100vw;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  overflow-x: hidden;
}

#app {
  /*font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;*/
  font-family: 'PT Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  font-size: 15px;
  background: url("assets/img/bg.jpg") 0 0 no-repeat fixed;
  min-height: calc(100vh - 80px);
  @media screen and (max-width: 600px) {
    min-height: calc(100vh - 58px);
  }
}

.app_height_window {
  height: 100vh;
}

</style>

<script>
export default {
  mounted() {
    //if (!this.$store.state.user.user.isLoggedIn) this.$router.push('login');
  }
}
</script>
