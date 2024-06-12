import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Favorites from '../pages/Favorites.vue';
import PaymentPage from '../pages/PaymentPage.vue';
import OrderConfirmation from '../pages/OrderConfirmation.vue';
import About from '../pages/About.vue';
import AddItem from '../pages/AddItem.vue';
import Login from '../pages/Login.vue';
import AdminLogin from '../pages/AdminLogin.vue';
import Register from '../pages/Register.vue';
import NotFound from '../pages/NotFound.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/payment', name: 'Payment', component: PaymentPage },
  { path: '/order-confirmation', name: 'OrderConfirmation', component: OrderConfirmation },
  { path: '/about', name: 'About', component: About },
  { path: '/add-item', name: 'AddItem', component: AddItem },
  { path: '/login', name: 'Login', component: Login },
  { path: '/adminLogin', name: 'AdminLogin', component: AdminLogin },
  { path: '/register', name: 'Register', component: Register },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
