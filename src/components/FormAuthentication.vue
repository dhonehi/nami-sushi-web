<template>
    <el-container class="form-wrapper form-wrapper_pos_center" v-loading="isLoading">
        <el-form
                class="form-wrapper__form"
                :model="authForm"
                :rules="rules"
                ref="authForm">
            <el-header class="form-wrapper__title" style="height: 10px">Вход</el-header>
            <el-divider></el-divider>
            <el-form-item
                    prop="username"
                    label="Email">
                <el-input v-model="authForm.username"></el-input>
            </el-form-item>
            <el-form-item
                    prop="password"
                    label="Пароль">
                <el-input type="password" v-model="authForm.password" size="medium" show-password
                          @keyup.enter="submitForm('authForm')">Войти>
                </el-input>
            </el-form-item>
            <el-form-item class="form-buttons">
                <el-button type="primary" @click="submitForm('authForm')">Войти</el-button>
                <el-button @click="loadFormRegistration">Регистрация</el-button>
                <el-button @click="resetForm('authForm')">Сбросить</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    export default {
        name: "FormAuthentication",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '')
                    callback(new Error('Введите пароль!'));

                callback();
            };
            let validateEmail = (rule, value, callback) => {
                let regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/

                if (value === '')
                    callback(new Error('Введите email!'));
                else if (!regexp.test(value))
                    callback(new Error('Неверный email'));
                else
                    callback();

            };
            return {
                authForm: {
                    username: '',
                    password: '',
                },
                isLoading: false,
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    username: [
                        {validator: validateEmail, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm: function (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       const authJson = JSON.stringify(this.authForm);

                        this.$store.dispatch('user/logIn', authJson).then(response => {
                            this.isLoading = false;
                            if (response.status === 200) this.$router.push('/')
                            else if (response.status === 401) {
                                this.$notify.error({
                                    title: 'Ошибка',
                                    message: 'Неверный email или пароль!'
                                });
                            } else {
                                this.$notify.error({
                                    title: 'Ошибка',
                                    message: 'Что-то пошло не так!'
                                });
                            }
                        })
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
                this.$router.push('registration');
            }
        }
    }
</script>

<style>
    .form-wrapper {
        height: 100vh;
        width: 100%;
    }

    .form-wrapper__form {
        border: 1px solid #DCDFE6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 4px;
        padding: 40px 40px;
    }

    .form-wrapper_pos_center {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .form-wrapper__title {
        font-size: 18px;
    }

</style>