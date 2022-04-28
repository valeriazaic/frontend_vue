<template>
  <div class="active-order-card">
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
        v-show="isClient"
        type="button"
        class="btn btn-dark"
        @click="DownloadButtonClick">
      Получить фотографии
    </button>

    <button
        v-show="isClient"
        class="btn btn-dark"
        @click="CancelOrderClick"
    >
      Отменить заказ
    </button>

    <button
        v-show="isPhotographer"
        class="btn btn-dark"
        @click="UploadClick"
    >
      Отправить фото
    </button>

    <upload-modal
        v-bind:id="order.id"
        v-if="isUploadModalOpen"
        @close="isUploadModalOpen = false"
    />

    <download-modal
        v-bind:id="order.id" state="order.state"
        v-if="DownloadModalOpen"
        @close="DownloadModalOpen = false"
    />

    <cancel-modal
        v-bind:id="order.id"
        v-if="CancelForm"
        @close="CancelForm = false"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import uploadModal from "@/components/UploadModal";
import downloadModal from "@/components/downloadModal";

export default {
  components: {uploadModal, downloadModal},
  data() {
    return {
      isClient: null,
      isPhotographer: null,
      isUploadModalOpen: false,
      DownloadModalOpen: false,
      CancelForm: false
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
    UploadClick(){
      if (this.order.state=='watermarks_sent'||this.order.state=='meeting')
      {
        this.isUploadModalOpen=true
      }
      else {
        console.log("Upload status error")
      }
    },
    DownloadButtonClick(){
     if (this.order.state=='watermarks_sent'||this.order.state=='meeting')
      {
        this.DownloadModalOpen = true
      }
    },
    CancelOrderClick(){
      this.CancelForm = true
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
.active-order-card {
  position: relative;

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