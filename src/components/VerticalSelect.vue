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
            },
            min: {
                type: Number,
            }
        },
        data: function () {
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
                if (this.inputValue !== this.min) {
                    this.inputValue--
                    this.$emit('input', this.inputValue)
                }
            }
        }
    }
</script>

<style lang="scss">
    .select {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .el-button {
            text-rendering: auto;
            padding: 0;
            color: black;

            i {
                margin: 0;
                font-size: 1.2rem;
                font-weight: 900;
            }
        }
    }
</style>