<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 300)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters)
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold ">Каталог товару</h2>

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
      <button @click="filterCategory('powerbanks')" class="btn">Павербанки</button>
      <button @click="filterCategory('headphones')" class="btn">Навушники</button>
    </div>
  </div>

    <div v-if="selectedCategory" class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card border rounded-md p-4 mb-4">
        <img :src="product.image" alt="Product Image" class="w-full h-auto mb-4" />
        <h3 class="text-xl font-bold mb-2">{{ product.name }}</h3>
        <p class="mb-2">{{ product.description }}</p>
        <p class="text-lg font-semibold mb-4">Ціна: {{ product.price }} грн</p>
        <button @click="addToCart(product)" class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Додати у кошик</button>
      </div>
    </div>
  </div>

  <div class="mt-10">
    <CardList :items="items"  @add-to-cart="onClickAddPlus" />
  </div>
  <footer class="bg-gray-8 text-black py-4 mt-10">
    <div class="pidval">
    <div class="pid-val">
    <p>&copy; 2024 Інтернет магазин електроніки. Всі права захищені.</p>
      <p>Контакти: elonmaks60@gmail.com | +380 123 456 789</p>
      <p>Адреса: м. Полтава, вул. Дебела, 88</p>
    </div>
      <div class="pidva.l">
      <p> З нами можна зв'язатися:</p>
    <div class="flex justify-center mt-4">
  <div class="footer-photo">
    <a href="https://www.instagram.com/_qutovale?igsh=MXA4bTB4a2t4OGpqOQ==" target="_blank">
      <img src="public/4202090instagramlogosocialsocialmedia-115598_115703.png" alt="Instagram" class="w-16 h-16 object-cover rounded-full">
    </a>
  </div>
  <div class="footer-photo">
    <a href="https://t.me/Maks_neo8" target="_blank">
      <img src="public/telegram_icon-icons.com_53603 – копія.png" alt="Telegram" class="w-16 h-16 object-cover rounded-full">
    </a>
  </div>
  <div class="footer-photo">
    <a href="https://accounts.google.com/SignOutOptions?hl=uk&continue=https://mail.google.com/mail&service=mail&ec=GBRAFw">
      <img src="public/icons8-gmail-480.png" alt="Gmail" class="w-16 h-16 object-cover rounded-full">
    </a>
      </div>


      </div>
      </div>
      </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: '',
      products: [
        // Ноутбуки
        { id: 1, category: 'notebooks', name: 'Ноутбук Acer', description: 'Опис ноутбука Acer', price: 15000, image: 'public/png-transparent-laptop-acer-aspire-intel-core-i5-laptop-electronics-netbook-computer.png' },
        { id: 2, category: 'notebooks', name: 'Ноутбук Dell', description: 'Опис ноутбука Dell', price: 20000, image: 'public/422625577.png' },
        { id: 3, category: 'notebooks', name: 'Ноутбук HP', description: 'Опис ноутбука HP', price: 18000, image: 'public/w_600.png' },
        { id: 4, category: 'notebooks', name: 'Ноутбук Lenovo', description: 'Опис ноутбука Lenovo', price: 17000, image: 'public/ww_600.png' },

        // Комп'ютери
        { id: 5, category: 'PC', name: 'Комп\'ютер Asus', description: 'Опис ПК Asus', price: 200000, image: 'public/завантаження.png' },
        { id: 6, category: 'PC', name: 'Комп\'ютер Dell', description: 'Опис ПК Dell', price: 250000, image: 'public/imagessfd.png' },
        { id: 7, category: 'PC', name: 'Комп\'ютер HP', description: 'Опис ПК HP', price: 220000, image: 'public/1607076835.png' },
        { id: 8, category: 'PC', name: 'Комп\'ютер Lenovo', description: 'Опис ПК Lenovo', price: 210000, image: 'public/462875.png' },

        // Телевізори
        { id: 9, category: 'TV', name: 'Телевізор LG', description: 'Опис телевізора LG', price: 40000, image: 'public/1088603_middle.png' },
        { id: 10, category: 'TV', name: 'Телевізор Samsung', description: 'Опис телевізора Samsung', price: 45000, image: 'public/3752235825.png' },
        { id: 11, category: 'TV', name: 'Телевізор Sony', description: 'Опис телевізора Sony', price: 42000, image: 'public/dwwwwimages.png' },
        { id: 12, category: 'TV', name: 'Телевізор Philips', description: 'Опис телевізора Philips', price: 43000, image: 'public/4604599062_w600_h600_4604599062.png' },

        // Телефони
        { id: 13, category: 'phones', name: 'Телефон Samsung', description: 'Опис телефону Samsung', price: 8000, image: 'public/pngtree-samsung-galaxy-s10-mockup-violet-theme-screen-png-image_996812.png' },
        { id: 14, category: 'phones', name: 'Телефон iPhone', description: 'Опис телефону iPhone', price: 25000, image: 'public/appleimages.png' },
        { id: 15, category: 'phones', name: 'Телефон Xiaomi', description: 'Опис телефону Xiaomi', price: 12000, image: 'public/4101012625_originalnyj-smartfon-xiaomi-800x800.png' },
        { id: 16, category: 'phones', name: 'Телефон Huawei', description: 'Опис телефону Huawei', price: 15000, image: 'public/2322233135.png' },

        // Аксесуари
        { id: 17, category: 'accessories', name: 'Аксесуар для телефону Go тримач', description: 'Опис аксесуара', price: 500, image: 'public/3157552114_w640_h640_go-derzhatel-dlya.png' },
        { id: 18, category: 'accessories', name: 'Чохол для телефону', description: 'Опис чохла для телефону', price: 700, image: 'public/fefeeimages.png' },
        { id: 19, category: 'accessories', name: 'Зарядний пристрій', description: 'Опис зарядного пристрою', price: 1000, image: 'public/new-kc8n9fx1tws54vq.png' },
        { id: 20, category: 'accessories', name: 'Захисне скло', description: 'Опис захисного скла', price: 300, image: 'public/zaschitnoe-steklo-6d-full-glue-dlya-iphone-12promax-black-1-1000x1000.png' },

        // Павербанки
        { id: 21, category: 'powerbanks', name: 'Павербанк Xiaomi', description: 'Опис павербанка Xiaomi', price: 1200, image: 'public/images.png' },
        { id: 22, category: 'powerbanks', name: 'Павербанк Anker', description: 'Опис павербанка Anker', price: 1500, image: 'public/397221133.png' },
        { id: 23, category: 'powerbanks', name: 'Павербанк Samsung', description: 'Опис павербанка Samsung', price: 1300, image: 'public/sssssssimages.png' },
        { id: 24, category: 'powerbanks', name: 'Павербанк Huawei', description: 'Опис павербанка Huawei', price: 1400, image: 'public/hhhhhimages.png' },

        // Навушники
        { id: 25, category: 'headphones', name: 'Навушники JBL', description: 'Опис навушників JBL', price: 3000, image: 'public/3810287095.jpg' },
        { id: 26, category: 'headphones', name: 'Навушники Sony', description: 'Опис навушників Sony', price: 3500, image: 'public/654a9815a67b4e7bad1b2822e4d8fd9a.png' },
        { id: 27, category: 'headphones', name: 'Навушники Bose', description: 'Опис навушників Bose', price: 4000, image: 'public/bbb1410795320000_1075804.800x600.png' },
        { id: 28, category: 'headphones', name: 'Навушники Xiaomi', description: 'Опис навушників Xiaomi', price: 3800, image: 'public/xxxxxxx1b7e082413504de495fe4de98612491c.png' }
      ],
      cart: [] 
    };
  },
  
  computed: {
    filteredProducts() {
      return this.products.filter(product => product.category === this.selectedCategory);
    }
  },
  methods: {
    filterCategory(category) {
      this.selectedCategory = category;
    },
    onChangeSelect(event) {
      const sortBy = event.target.value;
      if (sortBy === 'price') {
        this.products.sort((a, b) => a.price - b.price);
      } else if (sortBy === '-price') {
        this.products.sort((a, b) => b.price - a.price);
      } else {
        this.products.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    onChangeSearchInput(event) {
  const searchQuery = event.target.value.toLowerCase();
  this.products = this.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );
  },
    addToCart(product) {
      const itemToAdd = {
        id: product.id,
        title: product.name,
        price: product.price,
        imageUrl: product.image,
        description: product.description
      };
      this.cart.push(itemToAdd);
      console.log('Додано в кошик:', itemToAdd);
    }
  }
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
    margin-top: 10px;
  }

  .pid-val p, .pidva.l p {
    margin: 5px 0;
    font-size: 1rem; 
  }

</style>