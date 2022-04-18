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


      <label v-if="code_seen">
        Код
        <input
            type="code"
            class="form-control"
            placeholder="Введите код"
            v-model="form.code"
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
        code:''
      },
      errors: [],
      code_seen: false
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
      if(!this.code_seen)this.signIn();
      if (this.code_seen) this.signIn2factor();
    },
    signIn() {
      this.$load(async() => {
        const data = (await this.$api.auth.signIn({
          username: this.form.username,
          password: this.form.password,
        })).data

        var jwt=JSON.stringify(data)
        jwt=jwt.split('"')[3]
        //console.log("Это токен: ",  jwt.split('"')[3])
        localStorage.setItem('user_first_jwt', jwt)//после первого фактора сохранили только первый токен

        //this.$store.dispatch('user/setUser', data)
        //this.$emit('close')
        this.code_seen = true

      })
    },
    signIn2factor(){
      this.$load(async() => {
        const data = (await this.$api.auth2fa.signIn2factor({
          code: this.form.code
        })).data
        // console.log("Code: ", this.form.code)
        var info=JSON.stringify(data)//надо еще пропарсить и достать токен и инфу
        info=info.split('"')[3]
        // console.log(info)
        localStorage.setItem('user', info)//после второго фактора сохраняем второй токен
        localStorage.setItem('info', data)//и полученные данные о пользователе
        this.$store.dispatch('user/setUser', data)
        this.$emit('close')
      })
    }
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