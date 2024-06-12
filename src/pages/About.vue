<template>
  <div>
    <router-link to="/" class="back-link">На головну</router-link>
    <p class="toggle-button" @click="toggleAboutSection">&#8226;Про нас</p>
    <div v-if="showAboutSection" class="about-section">
      <h1>&#8226;Про нас</h1>
      <p>
        Інтернет-магазин електроніки "Imax" є новим продуктом, спрямованим на зручні покупки електронних товарів. Він надає стандартну функціональність, яка характерна для подібних систем. Користувачам доступна інформація про магазин, перегляд каталогу товарів з описом, характеристиками та цінами, можливість пошуку товарів за різними критеріями та онлайн-купівля. Також забезпечується зворотній зв'язок для користувачів, що дозволяє надсилати запитання та зауваження. Мета "Imax" - забезпечити зручні та надійні покупки електронної техніки, забезпечуючи комфорт та безпеку покупців.
      </p>
    </div>

    <div class="auth-links">
      <p class="link" @click="navigateTo('/register')">&#8226;Реєстрація</p>
      <p class="link" @click="navigateTo('/login')">&#8226;Вхід</p>
      <p class="link" @click="navigateTo('/adminLogin')">&#8226;Увійти як адміністратор</p>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
ref(localStorage.getItem('userRole') === 'admin');
const showAboutSection = ref(false);

const toggleAboutSection = () => {
  showAboutSection.value = !showAboutSection.value;
};

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.back-link {
  font-weight: bold;
  font-size: 16px;
  opacity: 0.5;
  color: black;
  display: block;
  margin-bottom: 20px;
}

.toggle-button {
  margin-top: 10px;
  cursor: pointer;
}

.toggle-button:hover {
  text-decoration: underline;
}

.about-section {
  margin-top: 20px;
}

.auth-links {
  margin-top: 20px;
}

.auth-links .link {
  margin-bottom: 10px;
  cursor: pointer;
}

.auth-links .link:hover {
  text-decoration: underline;
}
</style>
