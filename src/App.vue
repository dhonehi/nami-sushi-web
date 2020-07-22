<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
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

    /* Set core body defaults */
    body {
        min-height: 100vh;
        scroll-behavior: smooth;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        overflow-x: hidden;
    }

    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100%;
        min-height: 100vh;
        background-color: #edeae5;
    }

</style>

<script>
    export default {
        mounted() {
            if (!this.$store.state.user.user.isLoggedIn) this.$router.push('login');
        }
    }
</script>
