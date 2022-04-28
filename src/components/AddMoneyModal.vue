<template>
  <modal
      name="add-money-modal"
      classes="add-money-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Пополнить счет' }}</h3>

      <label>
        Количество денег
        <input
            class="form-control"
            placeholder="Введите число"
            v-model="form.money"
        >
      </label>

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

    </form>
  </modal>
</template>

<script>
export default {
  name: 'add-money-modal',
  data(){
    return {
      form: {
        money: null
      }
    }
  },

  mounted () {
    this.$modal.show('add-money-modal')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.add_money();
    },
    add_money(){
      this.$load(async() => {
        const data = (await this.$api.put_money.add_money({
          money: Number(this.form.money)
        })).data
        console.log(data)
        this.$emit('close')
      })
    }

  }
}

</script>

<style lang="scss">
.add-money-modal {
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
    button {
      width: 130px;
      margin-left: 10px;
      &:first-of-type {
        margin-left: auto;
      }
    }
  }
}

</style>