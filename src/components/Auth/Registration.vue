<template lang="pug">
    v-container.fill-height( fluid )
        v-row( align="center" justify="center" )
            v-col( cols="12" sm="8" md="4" )
                v-card.elevation-12
                    v-toolbar( color="primary" dark flat )
                        v-toolbar-title Registration form
                    v-card-text
                        v-form(
                            ref="form"
                            v-model="valid"
                            lazy-validation
                        )
                            v-text-field(
                                label="E-mail"
                                name="email"
                                type="email"
                                prepend-icon="mdi-account"
                                color="primary"
                                v-model="email"
                                :rules="emailRules"
                            )
                            v-text-field(
                                label="Password"
                                name="password"
                                type="password"
                                prepend-icon="mdi-lock"
                                color="primary"
                                v-model="password"
                                :rules="passwordRules"
                                :counter="6"
                                required
                            )
                            v-text-field(
                                label="Confirm password"
                                name="password"
                                type="password"
                                prepend-icon="mdi-lock"
                                color="primary"
                                v-model="confirmPassword"
                                :rules="confirmPasswordRules"
                                required
                            )
                    v-card-actions
                        v-spacer
                        v-btn.pl-6.pr-6(
                            color="primary"
                            style="color: #ffffff;"
                            @click="onSubmit"
                            :loading="loading"
                            :disabled="!valid || loading"
                        ) Create account
</template>

<script>
const loginRules = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default {
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
            valid: false,
            emailRules: [
                v => !!v || "E-mail обязателен",
                v => loginRules.test(v) || "Введите корректный e-mail"
            ],
            passwordRules: [
                v => !!v || "Пароль обязателен",
                v =>
                    (v && v.length >= 6) ||
                    "Пароль должен содержать не меньше 6 символов"
            ],
            confirmPasswordRules: [
                v => !!v || "Подтвердите пароль",
                v => v === this.password || "Пароль должен совпадать"
            ]
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        onSubmit() {
            if (this.$refs.form.validate()) {
                const user = {
                    email: this.email,
                    password: this.password
                };

                this.$store
                    .dispatch("registerUser", user)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch(() => {});
            }
        }
    }
};
</script>

<style>
</style>