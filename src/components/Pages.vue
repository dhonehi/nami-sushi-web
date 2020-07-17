<template>
    <el-container direction="vertical">
        <top-bar/>
        <el-main class="page-wrapper">
            <router-view/>
        </el-main>
    </el-container>
</template>

<script>
    import TopBar from "@/components/TopBar";

    export default {
        name: "pages",
        components: {
            TopBar
        },
        data() {
            return {
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-wrapper {
    }

</style>