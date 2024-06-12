<template>
  <div class="login-page">
    <h1>Вхід для адміністратора</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">Ім'я користувача:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-submit">Увійти</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {auth} from "@/stores/authStore";

const username = ref('');
const password = ref('');
const router = useRouter();
const authStore = auth()
const login = () => {
  // Перевірка логіну та паролю для адміністратора
  const storedAdminUser = localStorage.getItem('adminUser');

  if (!storedAdminUser) {
    const adminUser = {
      username: username.value,
      password: password.value,
    };
    localStorage.setItem('adminUser', JSON.stringify(adminUser));
    localStorage.setItem('userRole', 'admin');
    router.push('/');
  } else {
    const adminUser = JSON.parse(storedAdminUser);
    if (username.value === adminUser.username && password.value === adminUser.password) {
      localStorage.setItem('userRole', 'admin');
     authStore.userRole = "admin"
      router.push('/');
    } else {
      alert('Невірний пароль для адміністратора');
    }
  }
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #218838;
}
</style>
