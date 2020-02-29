<template lang="pug">
    v-container.fill-height( fluid )
        v-row.ma-auto( align="center" justify="center" )
            v-col( cols="12" sm="8" md="4" )
                v-card.elevation-12
                    v-toolbar( color="primary" dark flat )
                        v-toolbar-title Login form
                    v-card-text
                        v-form(
                            ref="form"
                            v-model="valid"
                            validation
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
                    v-card-actions
                        v-spacer
                        v-btn.pl-6.pr-6(
                            color="primary"
                            style="color: #ffffff;"
                            @click="onSubmit"
                            :loading="loading"
                            :disabled="!valid || loading"
                        ) Login
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            valid: false,
            emailRules: [
                v => !!v || "E-mail обязателен",
                v =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "Введите корректный e-mail"
            ],
            passwordRules: [
                v => !!v || "Пароль обязателен",
                v =>
                    (v && v.length >= 6) ||
                    "Пароль должен содержать не меньше 6 символов"
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
                    .dispatch("loginUser", user)
                    .then(() => {
                        this.$router.push("/");
                    })
                    .catch(() => {});
            }
        }
    },
    created() {
        if (this.$route.query["loginError"]) {
            this.$store.dispatch(
                "setError",
                "Please log in to access this page"
            );
        }
    }
};
</script>

<style>
</style>