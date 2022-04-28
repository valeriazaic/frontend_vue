<template>
  <modal
      name="review-modal"
      classes="review-modal"
      height="500px"
      width="700px"
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
  name: 'review-modal',
  data(){
    return {
      form: {
        comment: null
      }
    }
  },
  props: {
    id: Number,
    rating: Number
  },
  mounted () {
    this.$modal.show('review-modal')

  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.review();
    },
    review(){
      if (localStorage.getItem('is_photographer')=='true')
      {
        this.$load(async() => {
          (await axios.post('api/ph/review?id_order=' + this.id, {
                    comment: this.form.comment,
                    rating: this.rating
                },
              {
                headers: { 'Authorization':localStorage.getItem('user')}}
          ))
        })
      }
      else {
        this.$load(async() => {
          (await axios.post('api/client/review?id_order=' + this.id, {
                    comment: this.form.comment,
                    rating: this.rating
                },
              {
                headers: { 'Authorization':localStorage.getItem('user')}}
          ))
        })
      }
      this.$emit('close')
    }
  }
}

</script>

<style lang="scss">
.review-modal {
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