<template>
  <modal
      name="cancel-modal"
      classes="cancel-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Оставить отзыв:' }}</h3>

      <label>
        <input
            class="form-control"
            placeholder="Напишите пару слов"
            v-model="form.comment"
        >
      </label>

      <label>
        <input
            class="form-control"
            placeholder="Поставьте оценку от 1 до 5"
            v-model="form.rating"
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
import axios from "axios";

export default {
  name: 'cancel-modal',
  data(){
    return {
      form: {
        comment: null,
        rating: null
      }
    }
  },
  props: {
    id: Number
  },
  mounted () {
    this.$modal.show('cancel-modal')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.cancel();
    },
    cancel(){
      this.$load(async() => {
        await axios.post('api/client/cancel?='+this.id, {
              comment: this.form.comment,
              rating: this.form.rating
            }, {
              headers: {  'Authorization' :localStorage.getItem('user') }}
        )})
      this.$emit('close')
    }
  }
}

</script>

<style lang="scss">
.cancel-modal {
  padding: 30px 40px;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    h3 {
      margin-bottom: 30px;
    }
    li {
      color: black
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