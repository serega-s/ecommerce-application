import { createStore } from "vuex"

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    user: {
      id: 0,
      username: "",
      email: "",
    },
    token: "",
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("cart")) {
        state.cart = JSON.parse(localStorage.getItem("cart"))
      } else {
        localStorage.setItem("cart", JSON.stringify(state.cart))
      }

      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token")
        state.isAuthenticated = true
        state.user.username = localStorage.getItem("username")
        state.user.email = localStorage.getItem("useremail")
        state.user.id = localStorage.getItem("userid")
      } else {
        state.token = ""
        state.user.id = 0
        state.user.username = ""
        state.user.username = ""
        state.isAuthenticated = false
      }
    },
    addToCart(state, item) {
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      )
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ""
      state.isAuthenticated = false
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    clearCart(state) {
      state.cart = { items: [] }

      localStorage.setItem("cart", JSON.stringify(state.cart))
    },
    setUser(state, user) {
      state.user = user
    },
  },
  actions: {},
  modules: {},
})
