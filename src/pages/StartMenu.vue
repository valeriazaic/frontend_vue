<template>
  <div >
    <button
        v-show="isPhotographer=='false'"
        type="button"
        class="btn btn-dark"
        @click="$router.push({ name: 'photographers' })"
    >
      {{'Загрузить список фотографов'}}
    </button>

    <button
        v-show="isPhotographer=='false'"
        type="button"
        class="btn btn-dark"
        @click="OnCreateOrderButtonClick"
    >
      {{'Создать заказ'}}
    </button>

    <button
        v-show="isUser"
        type="button"
        class="btn btn-dark"
        @click="$router.push({ name: 'orders' })"
    >
      {{'Мои заказы'}}
    </button>

    <button
        v-show="isPhotographer=='true'"
        type="button"
        class="btn btn-dark"
        @click="$router.push({ name: 'select_orders' })"
    >
      {{'Выбрать заказ'}}
    </button>

    <button
        v-show="isPhotographer=='false'"
        type="button"
        class="btn btn-dark"
        @click="AddMoneyButtonClick"
    >
      {{'Пополнить счет'}}
    </button>
    <button
        v-show="isUser"
        type="button"
        class="btn btn-dark"
        @click="GetMoneyClick"

    >
      {{  'Узнать баланс' }}
    </button>


    <create-order-modal
        v-if="isCreateOrderOpen"
        @close="isCreateOrderOpen = false"
    />

    <get-money-modal
        v-if="getMoney"
        @close="getMoney = false"
    />

    <add-money-modal
        v-if="addMoney"
        @close="addMoney = false"
    />
  </div>

</template>

<script>
import CreateOrderModal from "@/components/CreateOrderModal";
import GetMoneyModal from "@/components/GetMoneyModal";
import AddMoneyModal from "@/components/AddMoneyModal";
import {mapActions, mapGetters} from "vuex";
export default {
  components: {CreateOrderModal, GetMoneyModal, AddMoneyModal},
  data(){
    return {
      isCreateOrderOpen: false,
      isUser: null,
      isPhotographer: null,
      addMoney: false,
      getMoney: false
    }
  },
  name: "StartMenu",
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  created() {
    this.setUser(JSON.parse(localStorage.getItem('user')))

  },
  beforeMount() {
    this.isPhotographer = localStorage.getItem('is_photographer')
   // console.log("flag1",this.isPhotographer)
    //console.log("money", localStorage.getItem('money'))
    this.isUser = localStorage.getItem('user')
    //console.log(this.isUser)
  },

  mounted() {
    this.isPhotographer = localStorage.getItem('is_photographer')
   // console.log("flag2",this.isPhotographer)
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser'
    }),
    OnCreateOrderButtonClick(){
      this.isCreateOrderOpen = true
    },
    OnOrdersListButtonClick(){
   /*   this.$load(async() => {
        const data = (await this.$api.all_orders.get_orders()).data
      })*/
    },
    AddMoneyButtonClick(){
    this.addMoney = true
    },
    GetMoneyClick(){
      this.$load(async() => {
        const data = (await this.$api.get_money.get_user_money({})).data
        localStorage.setItem('money', data.money)
        this.getMoney = true
        console.log(this.getMoney, typeof this.getMoney)
      })
    }
  }
}
</script>

<style lang="scss">
span {
  color: white;
}
</style>