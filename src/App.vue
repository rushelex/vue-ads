<template lang="pug">
    v-app#inspire
        v-navigation-drawer(
            app,
            temporary,
            v-model="drawer"
        )
            v-list( shaped )
                v-list-item-group( color="purple" )
                    v-list-item(
                        v-for="link in links",
                        :key="link.title",
                        :to="link.url"
                    )
                        v-list-item-icon
                            v-icon {{ link.icon }}
                        v-list-item-content
                            v-list-item-title(v-text="link.title" )
                    v-list-item(
                        @click="onLogout",
                        v-if="isUserLoggedIn"
                    )
                        v-list-item-icon
                            v-icon mdi-logout-variant
                        v-list-item-content
                            v-list-item-title(
                                v-text="'Logout'"
                            )

        v-app-bar(
            app,
            flat,
            color="white"
        )
            v-app-bar-nav-icon.hidden-md-and-up(
                @click="drawer = !drawer"
            )
            v-toolbar-title
                router-link.pointer(
                    to="/",
                    tag="span"
                ) Ad application
            v-spacer
            v-btn.hidden-sm-and-down.ma-2(
                color="purple",
                text,
                v-for="link in links",
                :key="link.title",
                :to="link.url"
            )
                v-icon( left ) {{ link.icon }}
                | {{ link.title }}
            v-btn.hidden-sm-and-down.ma-2(
                color="purple",
                text,
                @click="onLogout",
                v-if="isUserLoggedIn"
            )
                v-icon( left ) mdi-logout-variant
                | Logout


        v-content
            router-view

        transition(
            name="fade"
        )
            v-snackbar(
                v-if="error"
                color="error"
                :timeout="5000"
                @input="closeError"
                :value="true"
            ) {{ error }}
                v-btn(
                    dark
                    text
                    @click.native="closeError"
                ) Close
</template>

<script>
export default {
    data() {
        return {
            drawer: false
        };
    },
    computed: {
        error() {
            return this.$store.getters.error;
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn;
        },
        links() {
            if (this.isUserLoggedIn) {
                return [
                    {
                        title: "Orders",
                        icon: "mdi-bookmark-outline",
                        url: "/orders"
                    },
                    { title: "New ad", icon: "mdi-file-plus", url: "/new" },
                    {
                        title: "My ads",
                        icon: "mdi-format-list-bulleted",
                        url: "/list"
                    }
                ];
            }

            return [
                { title: "Login", icon: "mdi-lock", url: "/login" },
                {
                    title: "Registration",
                    icon: "mdi-face",
                    url: "/registration"
                }
            ];
        }
    },
    methods: {
        closeError() {
            this.$store.dispatch("clearError");
        },
        onLogout() {
            this.$store.dispatch("logoutUser");
            this.$router.push("/");
        }
    }
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.pointer {
    cursor: pointer;
}
</style>