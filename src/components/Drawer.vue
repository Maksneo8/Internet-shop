<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70 cart"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8 overflow-auto cart">
    <DrawerHead />

    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Кошик пустий"
        description="Додайте хоча б одну покупку."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title=""
      />
    </div>

    <div v-else>
      <CartItemList />

      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Сума до сплати:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} грн </b>
        </div>

        <button
          :disabled="buttonDisabled"
          @click="goToPaymentPage"
          class="mt-4 transition bg-green w-full rounded-xl py-3 text-white disabled:bg-slate-300 hover:bg-lime-600 active:bg-lime-700 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'

import DrawerHead from './DrawerHead.vue'
import CartItemList from './CartItemList.vue'
import InfoBlock from './InfoBlock.vue'

const { cart, closeDrawer } = inject('cart')
const router = useRouter()

const isCreating = ref(false)
const orderId = ref(null)

const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.price, 0)
})

const createOrder = async () => {
  try {
    isCreating.value = true

    

    cart.value = []

    orderId.value = data.id
  } catch (err) {
    console.log(err)
  } finally {
    isCreating.value = false
  }
}

const goToPaymentPage = async () => {
  await router.push('/payment')
  closeDrawer()
}

const cartIsEmpty = computed(() => cart.value.length === 0)
const buttonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
</script>
