<template>
  <div class="orders-page container">
    <h2>Доступные заказы:</h2>
    <select-orders-list :orders="orders" />
  </div>
</template>

<script>
import SelectOrdersList from '../components/SelectOrdersList'
import axios from "axios";

export default {
  components: { SelectOrdersList },
  data() {
    return {
      orders: []
    }
  },
  created() {
    if (localStorage.getItem('is_photographer')=='true')//для фотографа
    {
      this.$load(async() => {
        const info = await   axios
            .get('api/ph/orders', {headers:{ 'Authorization':localStorage.getItem('user')}})
        this.orders = info.data.order_data
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