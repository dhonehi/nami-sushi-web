<template>
    <transition name="rotate" v-on:afterLeave="leave">
        <button v-if="show" @click="show = !show" class="delete-icon">
            <i class="el-icon-close"></i>
        </button>
    </transition>
</template>

<script>
    export default {
        name: "delete-icon",
        props: ['product'],
        destroyed() {
            console.log('destroyed')
            console.log(this.product.name)
        },
        beforeUpdate() {
            console.log('beforeUpdate')
            console.log(this.product.name)
        },
        updated() {
            console.log('updated')
            console.log(this.product.name)
        },
        beforeDestroy() {
            console.log('beforeDestroy')
            console.log(this.product.name)
        },
        data() {
            return {
                show: this.product.active
            }
        },
        methods: {
            leave() {
                this.$emit('delete', this.product)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rotate-enter-active, .rotate-leave-active {
        transition: transform .5s ease-in-out;
    }

    .rotate-enter, .rotate-leave-to {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
    }

    .delete-icon {
        color: black;
        font-size: 1.2rem;
        border: none;
        background: 0 0;
        cursor: pointer;
        padding: 0;
        margin: 0;

        .el-icon-close {
            font-weight: 900;
        }
    }

</style>