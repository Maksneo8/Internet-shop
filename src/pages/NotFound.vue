<template>
  <div class="not-found">
    <h1>404 - Сторінку не знайдено</h1>
    <router-link to="/">На головну</router-link>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['msg']);
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 100px;
}

h1 {
  color: #333;
  font-size: 36px;
  margin-bottom: 20px;
}

a {
  color: #007bff;
  text-decoration: none;
  font-size: 18px;
}

a:hover {
  text-decoration: underline;
}
</style>
