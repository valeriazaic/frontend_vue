<template>
  <div class="orders-list">
    <p>Активные: </p>
    <active-order-card
        class="order-card"
        v-for="order in active_orders"
        :key="order.id"
        :order="order"
    />
    <p> Неподтвержденные: </p>
    <backlog-order-card
        class="order-card"
        v-for="order in backlog_orders"
        :key="order.id"
        :order="order"
    />
    <p> Завершенные:</p>
    <finished-order-card
        class="order-card"
        v-for="order in finished_orders"
        :key="order.id"
        :order="order"
    />

  </div>
</template>

<script>

import BacklogOrderCard from "@/components/BacklogOrderCard";
import ActiveOrderCard from "@/components/ActiveOrderCard";
import FinishedOrderCard from "@/components/FinishedOrderCard";


export default {

  props: {
    active_orders: {
      type: Array,
      default: () => []
    },
    backlog_orders: {
      type: Array,
      default: () => []
    },
    finished_orders: {
      type: Array,
      default: () => []
    }

  },
  components: { BacklogOrderCard, ActiveOrderCard, FinishedOrderCard },

}
</script>

<style lang="scss" scoped>
.order-card {
  margin-bottom: 40px;
  color: white;
}
.orders-list {
  p {
    color: white;
    font-size: 20px;
    padding-bottom: 15px;
    font-weight: 700;
  }

}
</style>