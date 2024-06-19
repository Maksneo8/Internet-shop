<template>
  <div>
    <span class="btn-back" @click="goBack">На головну</span>
    <div class="add-item-page">
      <transition name="fade">
        <h1>{{ editing ? 'Редагувати товар' : 'Додати товар' }}</h1>
      </transition>

      <form @submit.prevent="editing ? saveItem() : addItem()" class="item-form">
        <div class="form-group">
          <label for="name">Назва товару:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="price">Ціна:</label>
          <input type="number" id="price" v-model="price" required />
        </div>
        <div class="form-group">
          <label for="image">Зображення товару:</label>
          <input type="file" id="image" @change="onImageChange" required />
        </div>
        <button type="submit" class="btn-submit">{{ editing ? 'Зберегти' : 'Додати' }}</button>
      </form>

      <transition-group name="list" tag="div" class="product-list">
        <h2 key="products-title">Існуючі товари</h2>
        <div v-for="product in productStore.products" :key="product.id" class="product-item">
          <h3>{{ product.name }}</h3>
          <p>Ціна: {{ product.price }}</p>
          <img :src="product.image" alt="Product Image" class="product-image">
          <div class="btn-group">
            <button @click="editItem(product)" class="btn-edit">Редагувати</button>
            <button @click="deleteItem(product.id)" class="btn-delete">Видалити</button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useProductStore } from '@/stores/productStore';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const router = useRouter();

const name = ref('');
const price = ref(0);
const image = ref(null);
const productId = ref(null);
const editing = ref(false);

const onImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const addItem = () => {
  const newProduct = {
    id: Date.now(),
    name: name.value,
    price: price.value,
    image: image.value
  };
  productStore.addProduct(newProduct);
  resetForm();
};

const editItem = (product) => {
  name.value = product.name;
  price.value = product.price;
  image.value = product.image;
  productId.value = product.id;
  editing.value = true;
};

const saveItem = () => {
  const editedProduct = {
    id: productId.value,
    name: name.value,
    price: price.value,
    image: image.value
  };
  productStore.updateProduct(editedProduct);
  resetForm();
  editing.value = false;
};

const deleteItem = (productId) => {
  productStore.deleteProduct(productId);
};

const resetForm = () => {
  name.value = '';
  price.value = 0;
  image.value = null;
  productId.value = null;
};

const goBack = () => {
  router.go(-1);
};
</script>

<style scoped>
.add-item-page {
  padding: 20px;
  max-width: 600px;
  margin: 20px auto 0;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.btn-back {
  color: grey;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 20px;
}

.btn-back:hover {
  background-color: #f0f0f0;
  color: grey;
}

.item-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group input[type="file"] {
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

.product-list {
  margin-top: 30px;
}

.product-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.product-item h3 {
  margin-top: 0;
}

.product-item p {
  margin: 5px 0;
}

.product-image {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 10px;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn-edit,
.btn-delete {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-edit {
  background-color: green;
  color: white;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: transform 0.5s;
}

.list-enter,
.list-leave-to {
  transform: translateY(20px);
}
</style>
