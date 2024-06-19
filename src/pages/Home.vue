<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold">Каталог товарів</h2>

      <div class="flex gap-4">
        <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none">
          <option value="name">По назві</option>
          <option value="price">По ціні (дешеві)</option>
          <option value="-price">По ціні (дорогі)</option>
        </select>

        <div class="relative">
          <img class="absolute left-4 top-3" src="/search.svg" />
          <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Пошук..."
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="btn-center">
        <button @click="filterCategory('notebooks')" class="btn">Ноутбуки</button>
        <button @click="filterCategory('PC')" class="btn">Комп'ютери</button>
        <button @click="filterCategory('TV')" class="btn">Телевізори</button>
        <button @click="filterCategory('phones')" class="btn">Телефони</button>
        <button @click="filterCategory('accessories')" class="btn">Аксесуари</button>
        <button @click="filterCategory('powerbanks')" class="btn">Повербанки</button>
        <button @click="filterCategory('headphones')" class="btn">Навушники</button>
      </div>
    </div>

    <div v-if="filteredProducts.length" class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card border rounded-md p-4 mb-4">
        <img v-if="product.image" :src="product.image" alt="Product Image" class="w-full h-auto mb-4" />
        <h3 v-if="product.name" class="text-xl font-bold mb-2">{{ product.name }}</h3>
        <p v-if="product.description" class="mb-2">{{ product.description }}</p>
        <p v-if="product.price" class="text-lg font-semibold mb-4">Ціна: {{ product.price }} грн</p>
        <button @click="addToCart(product)" class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Додати у кошик</button>
      </div>
    </div>
  </div>
  <footer class="bg-gray-8 text-black py-4 mt-10">
    <div class="pidval">
      <div class="pid-val">
        <p>&copy; 2024 Інтернет магазин електроніки. Всі права захищені.</p>
        <p>Контакти: elonmaks60@gmail.com | +380 123 456 789</p>
        <p>Адреса: м. Полтава, вул. Дебела, 88</p>
      </div>
      <div class="pidva.l">
        <p>З нами можна зв'язатися:</p>
        <div class="flex justify-center mt-4">
          <div class="footer-photo">
            <a href="https://www.instagram.com/_qutovale?igsh=MXA4bTB4a2t4OGpqOQ==" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 24 24">
                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
              </svg>
              <IconInstagram/>
            </a>
          </div>
          <div class="footer-photo">
            <a href="https://t.me/Maks_neo8" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 50 50">
                <path d="M 25 2 C 12.309288 2 2 12.309297 2 25 C 2 37.690703 12.309288 48 25 48 C 37.690712 48 48 37.690703 48 25 C 48 12.309297 37.690712 2 25 2 z M 25 4 C 36.609833 4 46 13.390175 46 25 C 46 36.609825 36.609833 46 25 46 C 13.390167 46 4 36.609825 4 25 C 4 13.390175 13.390167 4 25 4 z M 34.087891 14.035156 C 33.403891 14.035156 32.635328 14.193578 31.736328 14.517578 C 30.340328 15.020578 13.920734 21.992156 12.052734 22.785156 C 10.984734 23.239156 8.9960938 24.083656 8.9960938 26.097656 C 8.9960938 27.432656 9.7783594 28.3875 11.318359 28.9375 C 12.146359 29.2325 14.112906 29.828578 15.253906 30.142578 C 15.737906 30.275578 16.25225 30.34375 16.78125 30.34375 C 17.81625 30.34375 18.857828 30.085859 19.673828 29.630859 C 19.666828 29.798859 19.671406 29.968672 19.691406 30.138672 C 19.814406 31.188672 20.461875 32.17625 21.421875 32.78125 C 22.049875 33.17725 27.179312 36.614156 27.945312 37.160156 C 29.021313 37.929156 30.210813 38.335938 31.382812 38.335938 C 33.622813 38.335938 34.374328 36.023109 34.736328 34.912109 C 35.261328 33.299109 37.227219 20.182141 37.449219 17.869141 C 37.600219 16.284141 36.939641 14.978953 35.681641 14.376953 C 35.210641 14.149953 34.672891 14.035156 34.087891 14.035156 z M 34.087891 16.035156 C 34.362891 16.035156 34.608406 16.080641 34.816406 16.181641 C 35.289406 16.408641 35.530031 16.914688 35.457031 17.679688 C 35.215031 20.202687 33.253938 33.008969 32.835938 34.292969 C 32.477938 35.390969 32.100813 36.335938 31.382812 36.335938 C 30.664813 36.335938 29.880422 36.08425 29.107422 35.53125 C 28.334422 34.97925 23.201281 31.536891 22.488281 31.087891 C 21.863281 30.693891 21.201813 29.711719 22.132812 28.761719 C 22.899812 27.979719 28.717844 22.332938 29.214844 21.835938 C 29.584844 21.464938 29.411828 21.017578 29.048828 21.017578 C 28.923828 21.017578 28.774141 21.070266 28.619141 21.197266 C 28.011141 21.694266 19.534781 27.366266 18.800781 27.822266 C 18.314781 28.124266 17.56225 28.341797 16.78125 28.341797 C 16.44825 28.341797 16.111109 28.301891 15.787109 28.212891 C 14.659109 27.901891 12.750187 27.322734 11.992188 27.052734 C 11.263188 26.792734 10.998047 26.543656 10.998047 26.097656 C 10.998047 25.463656 11.892938 25.026 12.835938 24.625 C 13.831938 24.202 31.066062 16.883437 32.414062 16.398438 C 33.038062 16.172438 33.608891 16.035156 34.087891 16.035156 z"></path>
              </svg>
              <IconTelegram />
            </a>
          </div>
          <div class="footer-photo">
            <a href="https://accounts.google.com/SignOutOptions?hl=uk&continue=https://mail.google.com/mail&service=mail&ec=GBRAFw" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 50 50">
                <path d="M 43.753906 6.4023438 C 42.53621 6.3489969 41.294792 6.712898 40.271484 7.46875 L 37.525391 9.4960938 L 25 18.755859 L 12.591797 9.5839844 A 1.0001 1.0001 0 0 0 11.949219 9.3007812 L 12.199219 9.3007812 L 9.734375 7.4765625 C 8.7104042 6.7188363 7.4671493 6.3528895 6.2480469 6.40625 C 5.0289444 6.4596105 3.8349462 6.9314667 2.9082031 7.8457031 C 1.7309454 9.0063798 1 10.629831 1 12.410156 L 1 15.84375 A 1.0001 1.0001 0 0 0 1 16.138672 L 1 39.5 C 1 41.421188 2.5788117 43 4.5 43 L 12 43 A 1.0001 1.0001 0 0 0 13 42 L 13 25.373047 L 24.40625 33.804688 A 1.0001 1.0001 0 0 0 25.59375 33.804688 L 37 25.373047 L 37 42 A 1.0001 1.0001 0 0 0 38 43 L 45.5 43 C 47.421188 43 49 41.421188 49 39.5 L 49 16.119141 A 1.0001 1.0001 0 0 0 49 15.859375 L 49 12.410156 C 49 10.6517 48.290455 9.0357821 47.128906 7.8730469 C 47.095336 7.8394769 47.084086 7.83018 47.097656 7.84375 A 1.0001 1.0001 0 0 0 47.091797 7.8378906 C 46.165242 6.9256756 44.971603 6.4556905 43.753906 6.4023438 z M 43.644531 8.4003906 C 44.400835 8.4300436 45.134049 8.7168876 45.689453 9.2636719 C 45.708363 9.2823439 45.722171 9.2964424 45.712891 9.2871094 C 46.50934 10.084374 47 11.188613 47 12.410156 L 47 15.496094 L 39 21.408203 L 39 11 A 1.0001 1.0001 0 0 0 38.996094 10.898438 L 41.458984 9.078125 A 1.0001 1.0001 0 0 0 41.460938 9.078125 C 42.109578 8.598977 42.888228 8.3707375 43.644531 8.4003906 z M 6.3574219 8.40625 C 7.1145694 8.37661 7.8958927 8.6037105 8.5449219 9.0839844 L 11.003906 10.902344 A 1.0001 1.0001 0 0 0 11 11 L 11 21.408203 L 3 15.496094 L 3 12.410156 C 3 11.174482 3.5017577 10.068855 4.3125 9.2695312 C 4.8677569 8.7217677 5.6002743 8.4358895 6.3574219 8.40625 z M 37 12.371094 L 37 22.886719 L 25 31.755859 L 13 22.886719 L 13 12.373047 L 24.40625 20.804688 A 1.0001 1.0001 0 0 0 25.59375 20.804688 L 37 12.371094 z M 3 17.982422 L 11 23.896484 L 11 41 L 4.5 41 C 3.6591883 41 3 40.340812 3 39.5 L 3 17.982422 z M 47 17.982422 L 47 39.5 C 47 40.340812 46.340812 41 45.5 41 L 39 41 L 39 23.896484 L 47 17.982422 z"></path>
              </svg>
              <IconGmail/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import Header from "@/components/Header.vue";
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import { useProductStore } from '../stores/productStore';

const productStore = useProductStore();
const { cart, addToCart } = inject('cart');

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
});

const selectedCategory = ref('');

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value.trim().toLowerCase();
}, 300);

onMounted(() => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];
});

const filteredProducts = computed(() => {
  let filtered = productStore.products.filter((product) =>
      (product.name.toLowerCase().includes(filters.searchQuery) ||
          product.description?.toLowerCase().includes(filters.searchQuery)) &&
      (!selectedCategory.value || product.category === selectedCategory.value)
  );

  if (selectedCategory.value && filtered.length === 0) {
    return [];
  }

  if (filters.sortBy === 'price') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (filters.sortBy === '-price') {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  return filtered;
});

const filterCategory = (category) => {
  selectedCategory.value = category;
};
</script>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.product-card img {
  object-fit: cover;
  max-height: 200px;
  width: 25%;
}

.btn-center {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding: 0;
  width: 100%;
}

.btn {
  width: auto;
  min-width: 115.4px;
  padding: 10px 16px;
  background-color: #4CAF50;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
}

.product-card p {
  font-size: 1rem;
}

.product-card button {
  margin-top: auto;
}

footer {
  background-color: #ffffff;
  padding: 1rem 0;
  text-align: center;
  margin-top: 2rem;
}

footer p {
  margin: 0.5rem 0;
}

.footer-separator {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 10px;
  margin-bottom: 10px;
}

.footer-photo {
  margin: 0 10px;
}

.pidval {
  border: 1px solid #000000;
  padding: 5px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pid-val {
  padding: 10px;
  text-align: left;
}

.pidva.l {
  padding: 5px;
  text-align: left;
  border-left: 1px solid #000000;
}
</style>