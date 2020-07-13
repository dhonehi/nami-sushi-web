<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    body {
        margin: 0;
    }

    #app {
        display: flex;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }


    /* .el-table__row {
         .cell {
             &:last-child{ text-align: center; }
         }
     }

     .has-gutter {
         .cell {
             &:last-child{ text-align: center; }
         }
     }*/

</style>
<script>
    //import SideBar from "./components/SideBar";

    export default {
        components: {
            //SideBar
        }
    }
</script>
