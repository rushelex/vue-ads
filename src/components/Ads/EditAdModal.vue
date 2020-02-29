<template lang="pug">
    v-dialog( v-model="modal" width="400px" )
        template( v-slot:activator="{ on }" )
            v-btn( color="orange" text v-on="on" )
                v-icon( left ) mdi-pencil
                | Edit

        v-card
            v-card-title.pt-10.pb-10
                h1.headline Edit ad
            v-card-text
                v-form( ref="form" )
                    v-text-field(
                        label="Title"
                        name="title"
                        type="text"
                        color="primary"
                        v-model="editedTitle"
                    )
                    v-textarea(
                        label="Description"
                        name="description"
                        type="text"
                        color="primary"
                        v-model="editedDescription"
                        multi-line
                    )
            v-card-actions
                v-spacer
                v-btn( text color="grey" @click="onCancel" ) Cancel
                v-btn( text color="success" @click="onSubmit" ) Submit
</template>

<script>
export default {
    props: ["ad"],
    data() {
        return {
            modal: false,
            editedTitle: this.ad.title,
            editedDescription: this.ad.description
        };
    },
    methods: {
        onCancel() {
            this.editedTitle = this.ad.title;
            this.editedDescription = this.ad.description;
            this.modal = false;
        },
        onSubmit() {
            if (this.editedTitle !== "" && this.editedDescription !== "") {
                this.$store.dispatch("updateAd", {
                    title: this.editedTitle,
                    description: this.editedDescription,
                    id: this.ad.id
                });

                this.modal = false;
            }
        }
    }
};
</script>