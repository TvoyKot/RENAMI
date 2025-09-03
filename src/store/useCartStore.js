import { defineStore } from 'pinia'
import { ref, computed, watch, onMounted } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const isDrawerOpen = ref(false)
  const isSuccessPageOpen = ref(false)

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const setProductToCart = (product) => {
    cart.value.push(product)
  }

  const totalCarts = computed(() => {
    return cart.value.length
  })

  const productInCart = (id) => {
    return cart.value.find((product) => product.id === id)
  }

  const removeProductInCart = (productId) => {
    cart.value = cart.value.filter((product) => product.id !== productId)
  }

  const decrementQuantity = (productId) => {
    const product = productInCart(productId)
    product.quantity--
  }

  const incrementQuantity = (productId) => {
    const product = productInCart(productId)
    product.quantity++
  }

  const totalAmount = computed(() => {
    return cart.value.reduce((acc, product) => acc + product.price * product.quantity, 0)
  })

  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  onMounted(() => {
    loadFromLocalStorage()
  })

  watch(
    () => cart.value,
    () => {
      saveToLocalStorage()
    },
    { deep: true }
  )
  return {
    cart,
    isDrawerOpen,
    totalCarts,
    totalAmount,
    productInCart,
    removeProductInCart,
    toggleDrawer,
    decrementQuantity,
    incrementQuantity,
    setProductToCart,
    isSuccessPageOpen,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
