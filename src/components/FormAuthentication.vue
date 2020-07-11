<template>
    <el-container class="form-wrapper"
                  v-loading.fullscreen.lock="isLoading">
        <el-form class="form-wrapper__form-authentication" :model="validateForm" ref="formOfAuthentication">
            <el-header class="form-wrapper__title" style="height: 10px">Вход</el-header>
            <el-divider></el-divider>
            <el-form-item
                    prop="email"
                    label="Email"
                    :rules="[
                        { required: true, message: 'Введите email', trigger: 'blur' },
                        { type: 'email', message: 'Некорректный email', trigger: ['blur', 'change'] } ]">
                <el-input v-model="validateForm.email" size="medium"></el-input>
            </el-form-item>
            <el-form-item
                    prop="password"
                    label="Пароль"
                    :rules="[
                        { required: true, message: 'Введите пароль', trigger: ['blur', 'change'] } ]">
                <el-input type="password" v-model="validateForm.password" size="medium" show-password
                          @keyup.enter="submitForm('formOfAuthentication')">Войти>
                </el-input>
            </el-form-item>
            <el-form-item class="form-buttons">
                <el-button type="primary" @click="submitForm('formOfAuthentication')">Войти</el-button>
                <el-button @click="loadFormRegistration">Регистрация</el-button>
                <el-button @click="resetForm('formOfAuthentication')">Сбросить</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    export default {
        name: "FormAuthentication",
        data() {
            return {
                validateForm: {
                    password: '',
                    email: ''
                },
                isLoading: false
            };
        },
        methods: {
            submitForm: function (formName) {

                /*fetch('http://localhost:8081/message/2', {
                    method: 'DELETE'
                }).then(result => console.log(result))*/

                fetch('/message/2').then(response => response.json().then(console.log))

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 2000);
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm: function (formName) {
                this.$refs[formName].resetFields();
            },
            loadFormRegistration: function () {
                this.$router.push('registration')
            }
        }
    }
</script>

<style scoped>
    .form-wrapper {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
    }

    .form-wrapper__form-authentication {
        border: 1px solid #DCDFE6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 4px;
        padding: 40px 40px;
    }

    .form-wrapper__title {
        font-size: 18px;
    }

    .form-buttons__button {
        text-decoration: none;
        color: white;
    }

</style>