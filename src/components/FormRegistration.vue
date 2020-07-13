<template>
    <el-container class="form-wrapper form-wrapper_pos_center" v-loading="isLoading">
        <el-form
                class="form-wrapper__form"
                :model="regForm" status-icon
                :rules="rules"
                ref="regForm" label-width="120px">
            <el-page-header class="back" @back="goBack" content="Регистрация" title="Назад"></el-page-header>
            <el-divider></el-divider>
            <el-form-item
                    prop="name"
                    label="Логин">
                <el-input v-model="regForm.name"></el-input>
            </el-form-item>
            <el-form-item
                    prop="email"
                    label="Email">
                <el-input v-model="regForm.email"></el-input>
            </el-form-item>
            <el-form-item
                    prop="phone"
                    label="Телефон">
                <el-input type="text" v-model="regForm.phone"></el-input>
            </el-form-item>
            <el-form-item
                    prop="password"
                    label="Пароль">
                <el-input type="password" v-model="regForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
                    prop="checkPass"
                    label="Подтверждение">
                <el-input type="password" v-model="regForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('regForm')">Зарегистрироваться</el-button>
                <el-button @click="resetForm('regForm')">Сбросить</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    export default {
        name: "FormRegistration",
        data() {
            let validatePass = (rule, value, callback) => {
                if (value === '')
                    callback(new Error('Пожалуйста, введите пароль!'));
                else if (this.regForm.checkPass !== '')
                    this.$refs.regForm.validateField('checkPass');

                callback();

            };
            let validatePass2 = (rule, value, callback) => {
                if (value === '')
                    callback(new Error('Пожалуйста, снова введите пароль!'));
                else if (value !== this.regForm.password)
                    callback(new Error('Пароли не совпадают!'));
                else
                    callback();

            };
            let validatePhoneNumber = (rule, value, callback) => {
                let regexp = /\d{10}/g;

                if (value === '')
                    callback(new Error('Введите номер телефона!'));
                else if (!regexp.test(value) || value.length > 10)
                    callback(new Error('Неверный номер!'));
                else
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
            let validateLogin = (rule, value, callback) => {
                if (value === '')
                    callback(new Error('Введите имя пользователя!'));
                else
                    callback();
            }
            return {
                regForm: {
                    name: '',
                    email: '',
                    phone: '',
                    password: '',
                    checkPass: '',
                },
                isLoading: false,
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur', required: true}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur', required: true}
                    ],
                    phone: [
                        {validator: validatePhoneNumber, trigger: 'blur', required: true}
                    ],
                    email: [
                        {validator: validateEmail, trigger: 'blur', required: true}
                    ],
                    name: [
                        {validator: validateLogin, trigger: 'blur', required: true}
                    ]
                }
            };
        },
        methods: {
            submitForm: function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;

                        const regJson = JSON.stringify(this.regForm);

                        const options = {
                            method: 'PUT',
                            headers: {'Content-Type': 'application/json'},
                            data: regJson,
                            url: '/user'
                        };

                        this.$http(options).then(() => {
                            this.$alert('Войдите в систему!', 'Регистрация прошла успешно', {
                                confirmButtonText: 'OK',
                                callback: () => {
                                    this.$router.push('/');
                                }
                            });
                        }).catch(error => {
                            if (error.response.status === 409) {
                                this.$notify.error({
                                    title: 'Ошибка',
                                    message: 'Email уже занят!'
                                })
                            } else {
                                this.$notify.error({
                                    title: 'Ошибка',
                                    message: 'Что-то пошло не так!'
                                })
                            }
                        }).finally(() => this.isLoading = false)

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm: function(formName) {
                this.$refs[formName].resetFields();
            },
            goBack: function () {
                this.$router.push('/login');
            }
        }
    }
</script>

<style>
    .el-page-header__content {
        margin-left: 20%;
    }
</style>