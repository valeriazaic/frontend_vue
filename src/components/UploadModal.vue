<template>
  <modal
      name="upload-modal"
      classes="upload-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Загрузить фотографии' }}</h3>

      <label>
        Фото с водяным знаком
        <input
            class="form-control"
            placeholder="Введите ссылку"
            v-model="form.url_watermark"
        >
      </label>

      <label>
        Фото в высоком разрешении
        <input
            class="form-control"
            placeholder="Введите ссылку"
            v-model="form.url_origin"
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
  name: 'upload-modal',
  data(){
    return {
      form: {
        url_origin: null,
        url_watermark: null
      }
    }
  },
  props: {
    id: Number
  },

  mounted () {
    this.$modal.show('upload-modal')
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.upload();
    },
    upload(){
      this.$load(async() => {
         (await axios.post('api/ph/upload?id_order=' + this.id, {
              url_origin: this.form.url_origin.toString(),
              url_watermark: this.form.url_watermark.toString()
          },
             {
          headers: { 'Authorization':localStorage.getItem('user')}}
        ))
      })
      this.$emit('close')
      //return instance.post('api/put-money', payload,{headers:  { 'Authorization':load}})
    }

  }
}

</script>

<style lang="scss">
.upload-modal {
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