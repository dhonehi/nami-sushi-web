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
        }
    }
</script>

<style lang="scss" scoped>
    .pages-wrapper {
        width: 100%;
        margin-top: 80px;
    }

    .page-content {
        margin: 0 auto;
        max-width: 1130px;
    }
</style>