<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "Profile",
        data() {
            return {
            }
        },
        mounted() {
            this.$store.commit('pages/setSideBarActive', 'profile')
        }

    }
</script>

<style lang="scss">

</style>