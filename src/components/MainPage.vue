<template>
    <div>

    </div>
</template>

<script>

    export default {
        name: "MainPage",
        mounted() {
            this.$store.commit('setSideBarActive', 'main')
        }
    }
</script>

<style scoped>

</style>