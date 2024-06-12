import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
    state: () => ({
        cart: []
    }),
    actions: {
        addToCart(product) {
            this.cart.push(product);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    },
    getters: {
        getCart: (state) => state.cart
    }
});
