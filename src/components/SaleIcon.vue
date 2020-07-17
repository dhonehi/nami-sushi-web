<template>
    <el-tooltip effect="light" content="Товар со скидкой" placement="top">
        <button class="icon-container shape_circle"><i class="el-icon-check"></i></button>
    </el-tooltip>
</template>

<script>
    export default {
        name: "sale-icon"
    }
</script>

<style lang="scss" scoped>
    .icon-container {
        background-color: #67C23A;

        i {
            color: #ffffff;
        }
    }
    .shape_circle {
        border-radius: 50%;
        border: 1px solid #67C23A;
        padding: 5px;
    }
</style>