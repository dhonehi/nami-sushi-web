<template>
    <div class="select">
        <el-button icon="el-icon-arrow-up" type="text"></el-button>
        <span>{{value}}</span>
        <el-button icon="el-icon-arrow-down" type="text"></el-button>
    </div>
</template>

<script>
    export default {
        name: "select",
        props: ['value']
    }
</script>

<style lang="scss" scoped>
    .select {
        display: flex;
        flex-direction: column;

        .el-button {
            font-size: 1.5rem;
            letter-spacing: 1px;
        }
    }
</style>