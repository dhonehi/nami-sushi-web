<template>
    <div>
        <SideBar/>
        <router-view/>
    </div>
</template>

<script>
    import SideBar from "@/components/SideBar";

    export default {
        name: "Pages",
        components: {
            SideBar
        }
    }
</script>

<style scoped>

</style>