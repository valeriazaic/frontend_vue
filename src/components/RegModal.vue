<template>
  <modal
      name="reg-modal"
      classes="reg-modal"
      height="500px"
      width="500px"
      @before-close="close"
  >
    <form @submit.prevent="formSubmit">
      <h3>{{'Зарегистрироваться' }}</h3>
      <div class="scroll">
        <label>
          Фамилия
          <input
              type="second_name"
              class="form-control"
              placeholder="Ваша фамилия"
              v-model="form.second_name"
          >
        </label>
        <label>
          Имя
          <input
              type="first_name"
              class="form-control"
              placeholder="Ваше имя"
              v-model="form.first_name"
          >
        </label>
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
        <label>
          Email
          <input
              type="mail"
              class="form-control"
              placeholder="Ваша эл. почта"
              v-model="form.mail"
          >
        </label>
        <label>
          Номер телефона
          <input
              type="phone_number"
              class="form-control"
              placeholder="Ваш номер телефона"
              v-model="form.phone_number"
          >
        </label>
        <input type="checkbox" id="checkbox" v-model="form.is_photographer">
        <label for="checkbox">{{ form.is_photographer ? 'Я фотограф' : 'Я не фотограф' }}</label>
      </div>

      <div class="actions">
        <a
            href="#"
            @click.prevent="mode = 'signUp'"
        >

          {{ 'Регистрация' }}
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
  name: 'reg-modal',
  data() {
    return {
      mode: 'signUp',
      form: {
        mail: '',
        password: '',
        second_name: '',
        first_name: '',
        username: '',
        avatar_url: '',
        phone_number: '',
        is_photographer: false,
      },
      errors: []
    }
  },
  mounted () {
    this.$modal.show('reg-modal')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.signUp()
    },
    signUp() {
      //console.log(this.form.is_photographer);
      this.$load(async() => {
        const data = (await this.$api.reg.signUp( {
          first_name: this.form.first_name,
          second_name: this.form.second_name,
          is_photographer: this.form.is_photographer,
          avatar_url: this.form.avatar_url,
          phone_number: this.form.phone_number,
          mail: this.form.mail,
          username: this.form.username,
          password: this.form.password,
        })).data
        if ( data.success==true) console.log('Registration Success')
        this.$emit('close');
      })
    },
  }
}
</script>

<style lang="scss">
.reg-modal {
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