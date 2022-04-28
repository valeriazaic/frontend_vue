<template>
  <div class="select-orders-list">
    <order-card
        class="order-card"
        v-for="order in orders"
        :key="order.id"
        :order="order"
    />
  </div>
</template>

<script>

import OrderCard from "@/components/OrderCard";

export default {
  props: {
    orders: {
      type: Array,
      default: () => []
    }
  },
  components: { OrderCard },
}
</script>

<style lang="scss" scoped>
.order-card {
  margin-bottom: 40px;
  color: white;
}
.select-orders-list {
  p {
    color: white;
    font-size: 20px;
    padding-bottom: 15px;
    font-weight: 700;
  }
}
</style>