<template>
  <div class="register-page">
    <h1>Реєстрація</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Ім'я користувача:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-submit">Зареєструватися</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const router = useRouter();

const register = () => {
  const adminExists = localStorage.getItem('adminUser');

  if (adminExists && username.value === 'admin') {
    alert('Адміністратор вже зареєстрований. Більше одного адміністратора не допускається.');
    return;
  }

  const newUser = {
    username: username.value,
    password: password.value
  };

  if (username.value === 'admin') {
    localStorage.setItem('adminUser', JSON.stringify(newUser));
  } else {
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  alert('Реєстрація успішна');
  router.push('/login');
};
</script>

<style scoped>
.register-page {
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
  background-color: #007bff;
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
  background-color: #0056b3;
}
</style>
