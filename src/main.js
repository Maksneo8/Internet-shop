import './assets/main.css';
import router from './router';
import { createApp } from 'vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { createPinia } from 'pinia';
import { useCartStore } from './stores/cartStore';
import { useProductStore } from './stores/productStore'; 


const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

const pinia = createPinia();

// eslint-disable-next-line no-unused-vars
pinia.useStore = function (useCartStore) {
  
};
pinia.useStore(useCartStore);
pinia.useStore(useProductStore);

app.use(router);
app.use(autoAnimatePlugin);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
