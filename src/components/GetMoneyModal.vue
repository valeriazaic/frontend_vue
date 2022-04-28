<template>
  <modal
      name="get-money-modal"
      classes="get-money-modal"
      height="500px"
      width="500px"
      @before-close="close">
    <form >
      <h3>{{ 'Ваш баланс:' }}</h3>

      {{this.money}}

      <button
          type="button"
          class="btn btn-outline-dark"
          @click="$emit('close')"
      >
        ОК
      </button>

    </form>
  </modal>
</template>

<script>
export default {
  name: 'get-money-modal',
  data(){
    return {
      money: null
    }

  },

  mounted () {
    this.$modal.show('get-money-modal')
    this.money = localStorage.getItem('money')
  },
  methods: {
    close() {
      this.$emit('close')
    },

  }
}

</script>

<style lang="scss">
.get-money-modal {
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