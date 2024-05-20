<script setup>
import { inject, ref } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeFromCart } = inject('cart')

</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between " v-auto-animate>
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :id="item.id"
      :title="item.name"
      :price="item.price"
      :image-url="item.image" 
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
<style scoped>

</style>