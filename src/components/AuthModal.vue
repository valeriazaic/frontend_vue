<template>
  <modal
    name="auth-modal"
    classes="auth-modal"
    height="500px"
    width="500px"
    @before-close="close"
  >
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Войти' }}</h3>

        <label>
          Логин
          <input
              type="username"
              class="form-control"
              placeholder="Ваш логин"
              v-model="form.username"
          >
        </label>
        <label>
          Пароль
          <input
              type="password"
              class="form-control"
              placeholder="Ваш пароль"
              v-model="form.password"
          >
        </label>


      <div class="actions">
        <a
          href="#"
          @click.prevent="mode = 'signIn'"
        >

          {{'Вход'}}
        </a>
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="$emit('close')"
        >
          Отмена
        </button>
        <button
          type="submit"
          class="btn btn-dark"
        >
          Подтвердить
        </button>
      </div>
    </form>
  </modal>

</template>

<script>
export default {
  name: 'auth-modal',
  data() {
    return {
      mode: 'signIn',
      form: {
        password: '',
        username: '',
      },
      errors: []
    }
  },
  mounted () {
    this.$modal.show('auth-modal')
  },
  methods: {
    changeUserState() {
      if (this.auth) {
        localStorage.removeItem('auth')
        this.$router.push({ name: 'main'})
      } else {
        localStorage.setItem('auth', true)
        this.auth = true
      }
    },
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.signIn()
    },
    signIn() {
      this.$load(async() => {
        const data = (await this.$api.auth.signIn({
          username: this.form.username,
          password: this.form.password,
        })).data
        localStorage.setItem('user', JSON.stringify(data))
        this.$store.dispatch('user/setUser', data)
        this.$emit('close')

      })
    },
  }
}
</script>

<style lang="scss">
.auth-modal {
  padding: 30px 40px;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    h3 {
      margin-bottom: 30px;
    }
    label {
      width: 100%;
      margin-bottom: 20px;
    }
    .actions {
      margin-top: auto;
      display: flex;
      align-items: baseline;
      a {
        color: #EB5804;
      }
      button {
        width: 130px;
        margin-left: 10px;
        &:first-of-type {
          margin-left: auto;
        }
      }
    }
  }
}
.scroll {
  width: 440px;
  heigth: 500px;
  overflow: scroll;
}
</style>