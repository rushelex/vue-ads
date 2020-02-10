<template lang="pug">
    v-container
        v-row( v-if="loading" )
            v-col.pt-12.d-flex.justify-center.align-center
                v-progress-circular(
                    :size="100"
                    indeterminate
                    color="purple"
                )
        v-row( v-else-if="!loading && orders.length !== 0" )
            v-col.offset-sm-3(
                cols="12",
                xs="12",
                sm="6"
            )
                h1.text--secondary.text-disabled Orders
                v-list(
                    two-line
                )
                    v-list-item(
                        v-for="order in orders"
                        :key="order.id"
                    )
                        v-list-item-action
                            v-checkbox(
                                color="success"
                                :input-value="order.done"
                                @change="markDone(order)"
                            )
                        v-list-item-content
                            v-list-item-title(
                                :class="{'text--disabled': order.done}"
                            ) {{ order.name }}
                            v-list-item-subtitle(
                                :class="{'text--disabled': order.done}"
                            ) {{ order.phone }}
                        v-list-item-action
                            v-btn.primary(
                                :to="'/ad/' + order.Adid"
                            ) Open
        v-row( v-else )
            v-col.offset-sm-3(
                cols="12",
                xs="12",
                sm="6"
            )
                h1.text-center You have no orders
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        orders() {
            return this.$store.getters.orders;
        }
    },
    methods: {
        markDone(order) {
            this.$store
                .dispatch("markOrderDone", order.id)
                .then(() => {
                    order.done = true;
                })
                .catch(() => {});
        }
    },
    created() {
        this.$store.dispatch("fetchOrders");
    }
};
</script>

<style lang="scss" scoped>
</style>