<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="/pngwing.com.png" alt="Logo" class="w-10" />
        <div>
          <div class="name">
            <h1>Інтернет-магазин IMAX</h1>
          </div>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-10">
      <li @click="() => emit('openDrawer')" class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <div class="position-relative container-cart">
          <img src="/shopping-cart_icon-icons.com_72552.png" alt="Cart" />
          <span class="position-absolute top-0 counter" v-if="cart.length > 0">{{ cart.length }}</span>
        </div>
        <b>{{ totalPrice }} грн</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black" @click="openAboutPage">
        <img src="/multipleline_114207.png" alt="Menu" />
      </li>
    </ul>
  </header>
</template>

<script setup>
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { defineProps, defineEmits } from 'vue';

const { cart } = inject('cart');
// const { totalPrice } = inject('totalPrice');
const emit = defineEmits(['openDrawer']);
const router = useRouter();

const openAboutPage = () => {
  router.push('/about');
};
</script>

<style scoped>
.counter {
  background: red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  top: 0;
  left: 0;
}
.container-cart {
  width: 50px;
}
.name h1 {
  font-size: 24px;
  font-weight: bold;
}
</style>
