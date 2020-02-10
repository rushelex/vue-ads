<template lang="pug">
    v-container
        v-row( v-if="!loading && myAds.length !== 0")

            v-col(
                cols="12"
            )
                h1.text--secondary.mb-3 My ad's
            v-row
                v-col(
                    cols="12"
                    sm="6",
                    md="4",
                    lg="3",
                    v-for="ad in myAds",
                    :key="ad.id"
                )
                    v-card.elevation-10.mb-5
                        v-img(
                            :src="ad.imageSrc"
                            aspect-ratio="2"
                        )
                        v-card-title.headline(
                            v-text="ad.title"
                        )
                        v-card-subtitle(
                            v-text="ad.description"
                        )
                        v-card-actions
                            v-spacer
                            v-btn.info.ma-3(
                                :to="'/ad/' + ad.id"
                            ) Open

        v-row( v-else-if="!loading && myAds.length === 0")
            v-col.offset-sm-3(
                cols="12",
                xs="12",
                sm="6"
            )
                h1.text-center You have no ad's

        v-row( v-else )
            v-col(
                cols="12"
            )
                v-skeleton-loader.mb-3(
                    type="heading"
                )
            v-col(
                cols="12"
                sm="6",
                md="4",
                lg="3",
                v-for="i in 8"
            )
                v-card.elevation-10.mb-5
                    v-skeleton-loader(
                        type="image"
                    )
                    v-skeleton-loader(
                        type="article"
                    )
                    v-skeleton-loader(
                        type="actions"
                    )
</template>

<script>
export default {
    computed: {
        myAds() {
            return this.$store.getters.myAds;
        },
        loading() {
            return this.$store.getters.loading;
        }
    }
};
</script>

<style lang="scss" scoped>
.img {
    border-radius: 4px 0 0 4px;
}

@media screen and (max-width: 768px) {
    .container {
        padding-right: 0px;
        padding-left: 0px;
    }
    .row {
        margin-right: 0px;
        margin-left: 0px;
    }
}
</style>