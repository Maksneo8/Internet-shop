<template>
  <div class="order-confirmation">
    <h1 class="confirmation-title">Замовлення підтверджено</h1>
    <p class="order-id">Ваш унікальний номер замовлення: {{ orderId }}</p>
    <p class="thank-you">Дякуємо за покупку! Наш менеджер зв'яжеться з вами найближчим часом!</p>
    <router-link to="/" class="continue-shopping-btn">Продовжити покупки</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: ''
    }
  },
  mounted() {
    this.orderId = this.generateOrderId();
  },
  methods: {
    generateOrderId() {
      return 'ORD-' + Math.random().toString(36).substr(2, 9);
    }
  }
}
</script>

<style scoped>
.order-confirmation {
  text-align: center;
  margin-top: 50px;
}

.confirmation-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.order-id {
  font-size: 18px;
  margin-bottom: 10px;
}

.thank-you {
  font-size: 16px;
  margin-bottom: 30px;
}

.continue-shopping-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continue-shopping-btn:hover {
  background-color: #f0680e;
}
</style>
