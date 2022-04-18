<template>
  <header>
    <div class="container">
      <router-link
        :to="{ name: 'main' }"
        class="logo"
      >
        НайдиФотографа
      </router-link>
      <div class="links">
        <router-link
          :to="{ name: 'films' }"
        >
          Карта
        </router-link>
        <button
          type="button"
          class="btn btn-outline-light btn-lg"
          @click="onAuthBtnClick"
        >
          {{ getUser ? 'Выйти' : 'Войти' }}
        </button>

        <button
            type="button"
            class="btn btn-outline-light btn-lg"
            @click="onRegBtnClick"
        >
          {{  'Зарегистрироваться' }}
        </button>
      </div>
    </div>
    <auth-modal
      v-if="isAuthModalOpen"
      @close="isAuthModalOpen = false"
    />
    <reg-modal
        v-if="isRegModalOpen"
        @close="isRegModalOpen = false"
    />
  </header>
</template>

<script>
import AuthModal from './AuthModal'
import RegModal from './RegModal'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {RegModal, AuthModal },
  data() {
    return {
      isAuthorized: false,
      isAuthModalOpen: false,
      isRegModalOpen: false,
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  created() {
    this.setUser(JSON.parse(localStorage.getItem('user')))
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser'
    }),
    onAuthBtnClick() {
      if (this.getUser) {
        this.$api.auth.logout()
        localStorage.removeItem('user')
        this.deleteUser()
        this.$router.push({ name: 'main' })
      } else {
        this.isAuthModalOpen = true
      }
    },
    onRegBtnClick() {
        this.isRegModalOpen = true
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  background-color: #0c0c0c;
  .container {
    margin-top: 0;
    display: flex;
    align-items: baseline;
  }
  padding: 20px 0;
  a {
    text-decoration: none;
    font-weight: 700;
    color: #ffffff;
    font-size: 25px;
  }
  .logo {
    color: #EB5804;
    font-size: 30px;
  }
  .links {
    margin-left: 75px;
    display: flex;
    flex-grow: 1;
  }
  button {
    margin-left: auto;
  }
}
</style>
