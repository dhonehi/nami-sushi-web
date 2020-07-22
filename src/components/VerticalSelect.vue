<template>
    <div class="select">
        <el-button @click="increment" icon="el-icon-arrow-up" type="text"></el-button>
        <span>{{inputValue}}</span>
        <el-button @click="decrement" icon="el-icon-arrow-down" type="text"></el-button>
    </div>
</template>

<script>
    export default {
        name: "vertical-select",
        props: {
            value: {
                type: Number,
                required: true
            }
        },
        data: function() {
            return {
                inputValue: this.value
            }
        },
        methods: {
            increment() {
                this.inputValue++
                this.$emit('input', this.inputValue)
            },
            decrement() {
                this.inputValue--
                this.$emit('input', this.inputValue)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .select {
        display: flex;
        flex-direction: column;

        .el-button {
            padding: 0;
            font-size: 1.5rem;
            letter-spacing: 1px;
        }
    }
</style>