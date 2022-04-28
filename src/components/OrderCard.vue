<template>
  <div class="order-card">
    <p class="id">{{ order.id}} </p>
    <div class="section">
      <p v-show="isPhotographer" class="section__title">Клиент:</p>
      <p v-show="isPhotographer" class="client">{{client_f_name()}} {{client_s_name()}}</p>
      <p class="section__title">Комментарий к заказу:</p>
      <p class="section__description">{{order.comment}}</p>
      <p class="section__title">Цена:</p>
      <p class="order_cost">{{ order.order_cost}} </p>
    </div>
    <button
        v-show="isPhotographer"
        class="btn btn-dark"
        @click="SelectOrderClick"
    >
      Выбрать заказ
    </button>
    <div class="line" />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      isClient: null,
      isPhotographer: null
    }
  },
  props: {
    order: {
      type: Object
    }
  },
  computed: {
    ...mapGetters({
      getReactions: 'reactions/getReactions'
    }),
    reactions() {
      return this.getReactions
    }
  },
  created() {
    if (localStorage.getItem('is_photographer')=='true')
    {
      this.isClient = false
      this.isPhotographer = true
    }
    else {
      this.isClient = true
      this.isPhotographer = false
    }
  },
  methods: {
    client_f_name() {
      if (this.isPhotographer) return this.order.client.first_name
    },
    client_s_name() {
      if (this.isPhotographer) return this.order.client.second_name
    },
    SelectOrderClick(){
      this.$load(async() => {
        await axios.patch('api/ph/select?id_order='+
             Number(this.order.id), {},
            {headers: { 'Authorization':localStorage.getItem('user')}}
        )
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.order-card {
  position: relative;
  .line {
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(132, 216, 240, 1) 0%, rgba(0,0,0,0) 90%);
    margin-bottom: 45px;
  }
  .name {
    position: absolute;
    margin-bottom: 0;
    bottom: 0;
    left: 80px;
    width: 100%;
    color: white;
    height: 80px;
    font-weight: 700;
    padding: 20px;
    font-size: 25px;
    border-radius: 0 0 0px 0px;
  }
  .rating {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #4271c2;
    width: 100px;
    height: 50px;
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    font-weight: 700;
    font-size: 15px;
    border-radius: 0 10px 0 10px;
    opacity: 0.8;
  }
  .more-info {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
    text-decoration: none;
    opacity: 0;
    transition: all 0.2s ease;
    &:hover, &:focus {
      opacity: 1;
    }
  }
}
</style>