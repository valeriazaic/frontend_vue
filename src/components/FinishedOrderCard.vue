<template>
  <div class="finished-order-card">
    <p class="id">{{ order.id}} </p>
    <div class="section">
      <p v-show="isPhotographer" class="section__title">Клиент:</p>
      <p v-show="isPhotographer" class="client">{{client_f_name()}} {{client_s_name()}}</p>
      <p class="section__title">Комментарий к заказу:</p>
      <p class="section__description">{{order.comment}}</p>
      <p class="section__title">Цена:</p>
      <p class="order_cost">{{ order.order_cost}} </p>

    </div>

    <div class="line" />

    <div class="review">
      <h3>Хотите оценить заказ?</h3>
      <p>Оставьте отзыв:</p>
      <ul>
        <li
            v-for="reaction in reactions"
            :key="reaction.id"
        >
          <button type="button"
                  class="btn btn-outline-light"
                  @click="ReviewButtonClick(reaction.id)">
            {{ reaction.title }}
          </button>
        </li>
      </ul>
      <review-modal
          v-bind:id="order.id" :rating="react_id"
          v-if="isReviewModalOpen"
          @close="isReviewModalOpen = false"
      />

      <download-orig-modal
          v-bind:id="order.id"
          v-if="DownloadModalOpen"
          @close="DownloadModalOpen = false"
      />
    </div>
    <button
        v-show="isClient"
        type="button"
        class="btn btn-dark"
        @click="DownloadButtonClick">
      Получить фотографии
    </button>
  </div>

</template>

<script>
import {mapGetters} from "vuex";
import reviewModal from "@/components/reviewModal";
import downloadOrigModal from "@/components/downloadOrigModal";



export default {
  components: {reviewModal, downloadOrigModal},
  data() {
    return {
      isClient: null,
      isPhotographer: null,
      isReviewModalOpen: false,
      DownloadModalOpen: false,
      react_id: null
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
    ReviewButtonClick(id){
      this.isReviewModalOpen = true
      this.react_id=id
    },
    DownloadButtonClick(){
      this.DownloadModalOpen = true
    },
    client_f_name() {
      if (this.isPhotographer) return this.order.client.first_name
    },
    client_s_name() {
      if (this.isPhotographer) return this.order.client.second_name
    },
  }
}
</script>

<style lang="scss" scoped>
.finished-order-card {
  position: relative;
  .button{
  //  margin-bottom: 30px;
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