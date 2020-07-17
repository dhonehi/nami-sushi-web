<template>
    <el-container direction="vertical">
        <top-bar/>
        <el-main class="page-wrapper">
            <div class="page-content scrollable">
                <div class="content">
                    <router-view/>
                </div>
            </div>
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
    .scrollable {
        overflow: auto;
    }

    .page-content {
        width: 100%;
        height: 100%;
    }
    .content {
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
        width: 60%;

        @media screen and (max-width: 1010px) {
            width: 100%;
        }
    }

</style>