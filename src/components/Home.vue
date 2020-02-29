<template lang="pug">
    div(v-if="!loading" )
        v-container( fluid )
            v-row
                v-col.pa-0( cols="12" xs="12" )
                    v-carousel
                        v-carousel-item(
                            v-for="ad in promoAds",
                            :key="ad.id"
                            :src="ad.imageSrc"
                        )
                            .car-link
                                v-btn.error(
                                    :to="'/ad/' + ad.id"
                                ) {{ ad.title }}
        v-container
            v-row
                v-col(
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="ad in ads"
                    :key="ad.id"
                )
                    v-card.mx-auto( max-width="400" )
                        v-img.white--text.align-end(
                            height="200px"
                            :src="ad.imageSrc"
                        )
                        v-card-title {{ ad.title }}
                        v-card-text.text--primary
                            div {{ ad.description }}
                        v-card-actions
                            v-spacer
                            v-btn(
                                text
                                :to="'/ad/' + ad.id"
                            ) Open
                            BuyModal( :ad="ad" )
    div( v-else )
        v-container( fluid )
            v-row
                v-col.pa-0( cols="12" xs="12" )
                    v-skeleton-loader(
                        type="image, actions"
                    )
        v-container
            v-row
                v-col(
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    v-for="card in 4" :key="card.key"
                )
                    v-card.mx-auto( max-width="400" )
                        v-skeleton-loader( type="image" )
                        v-skeleton-loader( type="article" )
                        v-skeleton-loader( type="actions" )

</template>

<script>
export default {
    computed: {
        promoAds() {
            return this.$store.getters.promoAds;
        },
        ads() {
            return this.$store.getters.ads;
        },
        loading() {
            return this.$store.getters.loading;
        }
    }
};
</script>

<style lang="scss" scoped>
.car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    padding: 10px 15px;
    background-color: rgba(0, 0, 0, 0.3);
    transform: translate(-50%, 0);
    border-radius: 5px 5px 0 0;
}
</style>