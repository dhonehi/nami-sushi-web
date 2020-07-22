<template>
    <el-container style="height: 100vh; width: 100vw" :v-loading="isLoading">

    </el-container>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
                isLoading: true
            }
        },
        mounted() {
            this.$store.commit('pages/setSideBarActive', 'profile')
        }

    }
</script>

<style lang="scss">

</style>