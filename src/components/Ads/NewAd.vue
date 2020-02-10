<template lang="pug">
    v-container
        v-row
            v-col.offset-sm-3(
                cols="12",
                xs="12",
                sm="6"
            )
                h1.text--secondary.mb-3 Create new ad
                v-form.mb-3(
                    ref="form",
                    v-model="valid",
                    validation
                )
                    v-text-field(
                        label="Ad title",
                        name="title",
                        type="text",
                        color="purple",
                        v-model="title",
                        :rules="[v => !!v || 'Введите название']",
                        required
                    )
                    v-textarea(
                        label="Ad description",
                        name="description",
                        type="text",
                        color="purple",
                        v-model="description",
                        :rules="[v => !!v || 'Введите описание']",
                        multi-line
                    )
                v-row
                    v-col(
                        xs="12"
                    )
                        v-btn.white--text(
                            color="orange"
                            @click="triggerUpload"
                        ) Upload
                            v-icon(
                                right
                                dark
                            ) mdi-cloud-upload
                        input(
                            ref="fileInput"
                            type="file"
                            style="display: none;"
                            accept="image/*"
                            @change="onFileChange"
                        )
                v-row
                    v-col(
                        xs="12"
                    )
                        img(
                            v-if="imageSrc"
                            :src="imageSrc"
                            height="150"
                        )
                v-row
                    v-col(
                        xs="12"
                    )
                        v-switch(
                            label="Add to promo?"
                            v-model="promo"
                        )
                v-row
                    v-col(
                        xs="12"
                    )
                        v-btn.success(
                            :loading="loading"
                            :disabled="!valid || !image || loading"
                            @click="createAd"
                        ) Create ad
</template>

<script>
export default {
    data() {
        return {
            title: "",
            description: "",
            promo: false,
            valid: false,
            image: null,
            imageSrc: ""
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        createAd() {
            if (this.$refs.form.validate() && this.image) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    promo: this.promo,
                    image: this.image
                };

                this.$store
                    .dispatch("createAd", ad)
                    .then(() => {
                        this.$router.push("/list");
                    })
                    .catch(() => {});
            }
        },
        triggerUpload() {
            this.$refs.fileInput.click();
        },
        onFileChange(event) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = () => {
                this.imageSrc = reader.result;
            };
            reader.readAsDataURL(file);
            this.image = file;
        }
    }
};
</script>

<style>
</style>