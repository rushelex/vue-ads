<template lang="pug">
    v-dialog(
        v-model="modal"
        width="500px"
    )
        template(
            v-slot:activator="{ on }"
        )
            v-btn(
                color="primary"
                v-on="on"
            ) Buy

        v-card
            v-card-title.pt-10.pb-10
                h1.text--primary Do you want to buy it?
            v-card-text
                v-form(
                    ref="form"
                )
                    v-text-field(
                        label="You name",
                        name="name",
                        type="text",
                        color="purple"
                        v-model="name",
                        :rules="nameRules",
                    )
                    v-text-field(
                        label="You phone",
                        name="phone",
                        type="text",
                        color="purple",
                        v-model="phone",
                        :rules="phoneRules",
                        v-mask="'+7 (###) ###-##-##'"
                    )
            v-card-actions
                v-spacer
                v-btn(
                    text
                    color="grey"
                    @click="onCancel"
                    :disabled="localLoading"
                ) Close
                v-btn(
                    color="primary"
                    @click="onBuy"
                    :disabled="localLoading"
                    :loading="localLoading"
                ) Buy it!
</template>

<script>
import { mask } from "vue-the-mask";

export default {
    props: ["ad"],
    directives: { mask },
    data() {
        return {
            modal: false,
            name: "",
            phone: "",
            localLoading: false,
            nameRules: [v => !!v || "Введите имя"],
            phoneRules: [v => !!v || "Введите телефон"]
        };
    },
    methods: {
        onCancel() {
            this.name = "";
            this.phone = "";
            this.modal = false;
        },
        onBuy() {
            if (this.name !== "" && this.phone !== "") {
                this.localLoading = true;
                this.$store
                    .dispatch("createOrder", {
                        name: this.name,
                        phone: this.phone,
                        adId: this.ad.id,
                        ownerId: this.ad.ownerId
                    })
                    .finally(() => {
                        this.name = "";
                        this.phone = "";
                        this.localLoading = false;
                        this.modal = false;
                    });
            }
        }
    }
};
</script>