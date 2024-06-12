<script setup>
import {inject} from 'vue'
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})

const { cart, closeDrawer } = inject('cart')

</script>

<template>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4" >
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />
    <div class="flex flex-col flex-1">
      <p>{{ title }} </p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} грн.</b>
        <span @click="emit('onClickRemove')"
           span class="material-symbols-outlined opacity-40 hover:opacity-100 cursor-pointer transition bg-red">delete</span>

      </div>
    </div>
  </div>
</template>
<style scoped>

</style>