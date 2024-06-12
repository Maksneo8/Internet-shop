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
      <li v-if="authStore.userRole === 'admin'" class="flex items-center cursor-pointer gap-3 text-gray-400 hover:text-black">
        <button @click="openAddItemPage" class="bg-black text-white px-2 py-1 rounded">+</button>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black" @click="openAboutPage">
        <img src="/multipleline_114207.png" alt="Menu" />
      </li>
    </ul>
  </header>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { defineEmits } from 'vue';
import {auth} from "@/stores/authStore";

const { cart } = inject('cart');
const emit = defineEmits(['openDrawer']);
const router = useRouter();
const authStore = auth()

const openAboutPage = () => {
  router.push('/about');
};

const openAddItemPage = () => {
  router.push('/add-item');
};

const isAdmin = ref(localStorage.getItem('userRole') );

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
