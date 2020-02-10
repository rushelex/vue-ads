<template lang="pug">
    v-container
        v-row
            v-col(
                cols="12"
            )
                v-card(
                    v-if="!loading"
                )
                    v-img(
                        :src="ad.imageSrc"
                        :aspect-ratio="16/9"
                    )
                    v-card-title.headline.mb-1 {{ ad.title }}
                    v-card-subtitle {{ ad.description }}
                    v-card-actions
                        v-spacer
                        addEditAdModal(
                            :ad="ad"
                            v-if="isOwner"
                        )
                        BuyModal(
                            :ad="ad"
                        )
                v-card( v-else )
                    v-skeleton-loader(
                        type="image, article, actions"
                    )
</template>

<script>
import EditAdModal from "./EditAdModal";

export default {
    props: ["id"],
    computed: {
        ad() {
            const id = this.id;
            return this.$store.getters.adById(id);
        },
        loading() {
            return this.$store.getters.loading;
        },
        isOwner() {
            return this.ad.ownerId === this.$store.getters.user.id;
        }
    },
    components: {
        addEditAdModal: EditAdModal
    }
};
</script>

<style>
</style>