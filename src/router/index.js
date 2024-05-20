import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../pages/Home.vue'
import Favorites from '../pages/Favorites.vue'
import PaymentPage from '../pages/PaymentPage.vue'
import OrderConfirmation from '../pages/OrderConfirmation.vue'
import About from '../pages/About.vue' 


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
  { path: '/payment', name: 'Payment', component: PaymentPage },
  { path: '/order-confirmation', name: 'OrderConfirmation', component: OrderConfirmation },
  { path: '/about', name: 'About', component: About }  
]

const router = createRouter({
  history: createMemoryHistory(),
  mode: "history",
  routes
})

export default router
