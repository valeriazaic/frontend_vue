<template>
  <modal
      name="offer-modal"
      classes="offer-modal"
      height="500px"
      width="700px"
      @before-close="close">
    <form @submit.prevent="formSubmit">
      <h3>{{ 'Доступные фотографы:' }}</h3>

         <li v-for="ph in phs"
             :key="ph.id">
           {{ ph.first_name }} {{ph.second_name}} {{ph.raiting}} {{"ID:"}} {{ph.id}}
         </li>

      <label>
        Подтвердите выбор:
        <input
            class="form-control"
            placeholder="Введите номер фотографа"
            v-model="form.id_ph"
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
  name: 'offer-modal',
  data(){
    return {
      form: {
        id_ph: null
      },
      phs: []
    }
  },
  props: {
    id: Number,
    state: String
  },
  mounted () {
    this.$modal.show('offer-modal')

  },
  created() {
    this.$load(async() => {
      const info = await axios.get('../api/client/offer', {
        params: {
          id_order: this.id
        },
        headers: { 'Authorization':localStorage.getItem('user')}
      })
      this.phs=info.data.photographers
     // console.log("ID ph:", this.phs[0].id)
    })
  },
  methods: {
    close() {
      this.$emit('close')
    },
    formSubmit() {
      this.accept_ph();
    },
    accept_ph(){
      if (this.state == 'agreed_photographer')
      {
        this.$load(async() => {
          await axios.patch('api/client/accept?id_order='+
              Number(this.id)+'&id_photographer='+  Number(this.form.id_ph)+'&is_accept='+  true,
              {},
              {headers: { 'Authorization':localStorage.getItem('user')}}
          )
        })
        this.$emit('close')
      }
    }
  }
}

</script>

<style lang="scss">
.offer-modal {
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