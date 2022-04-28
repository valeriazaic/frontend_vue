<template>
  <div class="orders-page container">
    <h2>Ваши заказы:</h2>
    <orders-list :active_orders="active_orders" :backlog_orders="backlog_orders" :finished_orders="finished_orders"/>
  </div>
</template>

<script>
import OrdersList from '../components/OrdersList'
import axios from "axios";

export default {
  components: { OrdersList },
  data() {
    return {
      orders: [],
      active_orders: [],
      backlog_orders: [],
      finished_orders: []
    }
  },
  created() {
    if (localStorage.getItem('is_photographer')=='false')//для клиента
    {
      this.$load(async() => {
        const info = await   axios
            .get('api/client/all-orders', {headers:{ 'Authorization':localStorage.getItem('user')}})
        this.active_orders = info.data.active
        this.backlog_orders = info.data.backlog
        this.finished_orders = info.data.finished
        //console.log(this.active_orders[0])
      })
    }
    else {//для фотографа
      this.$load(async() => {
        const info = await   axios
            .get('api/ph/all-orders', {headers:{ 'Authorization':localStorage.getItem('user')}})
        this.active_orders = info.data.active
        this.backlog_orders = info.data.backlog
        this.finished_orders = info.data.finished
        //console.log(this.active_orders[0])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-size: 30px;
  color:#ffffff;
  margin-bottom: 30px;
}

</style>