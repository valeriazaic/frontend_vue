<template>
<modal
    name="create-order-modal"
    classes="create-order-modal"
    height="500px"
    width="500px"
    @before-close="close">
  <form @submit.prevent="formSubmit">
    <h3>{{ 'Создать заказ' }}</h3>

    <label>
      Пожелания
      <input
          class="form-control"
          placeholder="Опишите локацию и другие пожелания"
          v-model="form.comment"
      >
    </label>
    <label>
      Стоимость
      <input
          class="form-control"
          placeholder="Впишите примерную стоимость заказа"
          v-model="form.order_cost"
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
  name: 'create-order-modal',
  data() {
    return {
      form: {
        comment: "",
        order_cost: null,
        latitude: 55,
        longitude: 35
      },
      errors: []
    }
  },
  mounted () {
    this.$modal.show('create-order-modal')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.create_order();
    },
    create_order() {

      this.$load(async() => {
        const data = (await this.$api.create_order.create_order({
          comment: this.form.comment,
          coordinates: {latitude: Number(55),
          longitude: Number(34)},
          order_cost: Number(this.form.order_cost),
        })).data
        console.log(data)
        this.$emit('close')
      })
    }
  }
}

</script>

<style lang="scss">
.create-order-modal {
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