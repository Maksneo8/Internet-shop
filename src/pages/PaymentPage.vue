<template>
  <div class="payment-page">
    <h1 class="title">Підтвердження замовлення</h1>

    <div v-if="cart.length === 0" class="empty-cart">
      <p>Ваш кошик порожній!</p>
    </div>

    <div v-else>
      <div class="cart-items">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-details">
            <h2 class="item-title">{{ item.name }}</h2>
            <p class="item-price">{{ item.price }} грн</p>
          </div>
        </div>
      </div>

      <div class="customer-info">
        <input type="text" placeholder="Номер телефону" class="input-field" />
        <input type="text" placeholder="Прізвище" class="input-field" />
        <input type="text" placeholder="Ім'я" class="input-field" />
      </div>

      <div class="shipping-methods-container">
        <div class="shipping-methods">
          <div class="shipping-text">Виберіть спосіб доставки:</div>
          <div class="shipping-buttons">
            <button class="shipping-button" @click="selectShipping('Нова Пошта')">Нова Пошта</button>
            <button class="shipping-button" @click="selectShipping('Самовивіз')">Самовивіз</button>
          </div>
        </div>
        <p>Вибраний спосіб доставки: {{ selectedShipping }}</p>
      </div>

      <div class="payment-methods-container">
        <div class="payment-methods">
          <div class="payment-text">Виберіть спосіб оплати:</div>
          <div class="payment-buttons">
            <button class="payment-button" @click="selectPayment('Наложений платіж')">Наложений платіж</button>
          <div id="container"></div>
          </div>
        </div>
        <p>Вибраний спосіб оплати: {{ selectedPayment }}</p>
      </div>

      <div class="total-splata">
        <p class="total-text">Всього до сплати:<span class="total-price">{{ calculateTotalPrice(cart) }} грн</span></p>
      <div class="confirm-button-container">
        <router-link :to="{ name: 'OrderConfirmation' }">
         <button class="confirm-button" @click="confirmOrder">Підтвердити замовлення</button>
        </router-link>
     </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { inject, ref } from 'vue'


const openGooglePay = () => {
  window.location.href = 'https://pay.google.com/';
}

const { cart } = inject('cart')
const selectedShipping = ref(null)
const selectedPayment = ref(null)

const calculateTotalPrice = (cart) => {
  return cart.reduce((sum, item) => sum + item.price, 0);
}

const confirmOrder = () => {
  console.log('Замовлення підтверджено')
}

const selectShipping = (shippingMethod) => {
  selectedShipping.value = shippingMethod
}

const selectPayment = (paymentMethod) => {
  selectedPayment.value = paymentMethod
}

</script>

<style scoped>
.payment-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.empty-cart {
  text-align: center;
  font-size: 18px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.item-details {
  flex: 1;
  margin-left: 20px;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
}

.item-price {
  font-size: 16px;
  color: #555;
  margin-top: 5px;
}

.customer-info {
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.shipping-methods-container {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.shipping-methods {
  margin-bottom: 20px;
}

.shipping-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.shipping-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.shipping-button {
  flex: 1; 
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;;
}

.payment-methods-container {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.payment-methods {
  margin-bottom: 20px;
}

.payment-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.payment-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.payment-button {
    flex: 1;
  padding: 10px 20px;
  margin: 0 5px; 
  font-size: 16px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.total-splata {
text-align: center;
  padding: 10px;
  font-weight: bold;
}

.confirm-button {
  display: inline-block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.confirm-button-container {
  display: flex;
  justify-content: center;
}

.confirm-button:active {
  background-color: #3e8e41;
}

.shipping-button:active {
  background-color: #3e8e41;
}

.payment-button:active {
  background-color: #3e8e41;
}
</style>