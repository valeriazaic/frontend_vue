<template>
  <modal
      name="download-modal"
      classes="download-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Загрузить превью' }}</h3>
       <p>Превью фото:</p>
      <p>{{this.watermark_link}}</p>
      <button
          type="button"
          class="btn btn-dark"
          @click="FinishOrderClick"
      >
        Завершить заказ
      </button>
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
  name: 'download-modal',
  data(){
    return {
      form: {
        comment: null
      },
      watermark_link: null
    }
  },
  props: {
    id: Number,
    state: String
  },
  mounted () {
    this.$modal.show('download-modal')
  },
  created() {
    this.$load(async() => {
     const link = await axios.get('api/client/get-preview', {
        params: {
          id_order: this.id
        },
       headers: {  'Authorization' :localStorage.getItem('user') }
    })
      this.watermark_link=link.data.url_watermark
    })

  },
  methods: {
    FinishOrderClick(){
      if (this.state=='watermarks_sent')
      {
        this.$load(async() => {
          await axios.post('api/client/finish-order', {
            params: {
              id_order: this.id
            },
            headers: {  'Authorization' :localStorage.getItem('user') }
          })
        })
      }
    },
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.review();
    }
  }
}

</script>

<style lang="scss">
.download-modal {
  padding: 30px 40px;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    h3 {
      margin-bottom: 30px;
    }
    p {
      color: black
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