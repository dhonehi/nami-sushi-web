<template>
    <div>
        <top-bar/>
        <div class="pages">
            <div class="pages__content">
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
    .pages {
        width: 100%;
        margin-top: 80px;

        &__content {
            margin: 0 auto;
            max-width: 1130px;

            @media screen and (max-width: 860px) {
                width: 800px;
            }
        }
    }

    .page-content {
        margin: 0 auto;
        max-width: 1130px;

        @media screen and (max-width: 1000px) {
            margin-left: 10px;
        }

        /*@media screen and (max-width: 1150px) {
            width: 1000px;
        }*/

        /*@media screen and (max-width: 930px) {
            width: 850px;
        }
        @media screen and (max-width: 860px) {
            max-width: 100%;
            width: 100%;
            margin-left: 10px;
        }*/
    }
</style>