<template>
  <modal
      name="download-orig-modal"
      classes="download-orig-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Загрузка оригиналов' }}</h3>
      <p>Ваши фото здесь:</p>
      <p>{{this.original_link}}</p>
      <button
          type="button"
          class="btn btn-outline-dark"
          @click="$emit('close')"
      >
        Отмена
      </button>
      <button
          type="button"
          class="btn btn-dark"
          @click="$emit('close')"
      >
        ОК
      </button>

    </form>
  </modal>
</template>

<script>
import axios from "axios";

export default {
  name: 'download-orig-modal',
  data(){
    return {
      original_link: null
    }
  },
  props: {
    id: Number
  },
  mounted () {
    this.$modal.show('download-orig-modal')
  },
  created() {
    this.$load(async() => {
      const link = await axios.get('api/client/get-original', {
        params: {
          id_order: this.id
        },
        headers: {  'Authorization' :localStorage.getItem('user') }
      })
      this.original_link=link.data.url_original
    })

  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
    }
  }
}

</script>

<style lang="scss">
.download-orig-modal {
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