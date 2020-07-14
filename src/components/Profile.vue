<template>
    <div>
        <h3>Hello</h3>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        mounted() {
            this.$store.commit('setSideBarActive', 'profile')
        }

    }
</script>

<style scoped>

</style>