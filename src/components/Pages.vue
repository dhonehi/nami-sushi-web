<template>
    <div>
        <top-bar/>
        <div class="pages-wrapper">
            <div class="page-content">
                <router-view />
            </div>
        </div>
    </div>
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

            }
        }
    }
</script>

<style lang="scss" scoped>
    .pages-wrapper {
        width: 100%;
        height: 100%;
        margin-top: 80px;
    }

    .page-content {
        margin: 0 auto;
        width: 1130px;

        @media screen and (max-width: 1100px) {
            width: 100%;
        }
    }
</style>