<template>
  <div class="order-page">
    <div class="container" v-if="order">
      <h1>{{ order.id }}</h1>
      <div class="line" />
      <div class="section">
        <p class="section__title">Комментарий к заказу:</p>
        <p class="section__description">{{order.comment}}</p>
      </div>
      <p class="order_cost">{{ order.order_cost}} </p>
      <p v-show="isPhotographer" class="client">{{ order.client.first_name}} {{order.client.first_name }} </p>
      <p v-show="isClient" class="photographer">{{ order.photographer.first_name}} {{order.photographer.second_name }} </p>

      <div class="line" />

      <div class="review">
        <h3>Оценить заказ</h3>
        <p>Оставьте отзыв:</p>
        <ul>
          <li
              v-for="reaction in reactions"
              :key="reaction.id"
          >
            <button type="button" class="btn btn-outline-light">
              {{ reaction.title }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'


export default {
  data() {
    return {
      order: null,
      isClient: null,
      isPhotographer: null
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

  }
}
</script>


<style lang="scss" >
.order-page {
  padding-bottom: 100px;
  .back {
    color: #ffffff;
    margin-left: 30px;
    margin-top: 30px;
  }
  h1 {
    color: #ffffff;
    padding-bottom: 15px;
    position: relative;
  }
  .line {
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, rgba(132, 216, 240, 1) 0%, rgba(0,0,0,0) 90%);
    margin-bottom: 45px;
  }
  img {
    object-fit: cover;
    border-radius: 10px;
    width: 80px;
    height: 80px;
    margin-bottom: 30px;
  }
  .section {
    &__title {
      color: #4271c2;
      font-weight: 700;
      font-size: 25px;
      margin-bottom: 10px;
    }
    &__description {
      color: #ffffff;
      font-size: 18px;
      line-height: 30px;
    }
  }
  .review {
    h3 {
      color: #ffffff;
      font-size: 25px;
    }
    p {
      font-weight: 600;
      font-size: 18px;
      color: #4271c2;
    }
    ul {
      padding-left: 0;
      list-style: none;
      display: flex;
      li {
        margin-right: 15px;
      }
    }
  }
}
</style>