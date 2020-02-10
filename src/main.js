import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import fb from 'firebase/app';
import 'firebase/auth';

import BuyModalComponent from '@/components/Shared/BuyModal';

Vue.use(vuetify);
Vue.component('BuyModal', BuyModalComponent);

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    created() {
        fb.initializeApp({
            apiKey: 'AIzaSyCsT2abJpmiggdHS-6sHCP0nSK5uzeqN6k',
            authDomain: 'vue-ads-534db.firebaseapp.com',
            databaseURL: 'https://vue-ads-534db.firebaseio.com',
            projectId: 'vue-ads-534db',
            storageBucket: 'vue-ads-534db.appspot.com',
            messagingSenderId: '688529968137',
            appId: '1:688529968137:web:38548dbc75290a0e7efcd8',
        });

        fb.auth().onAuthStateChanged(user => {
            if (user) {
                this.$store.dispatch('autoLoginUser', user);
            }
        });

        this.$store.dispatch('fetchAds');
    },
}).$mount('#app');
