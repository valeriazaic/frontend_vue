<template>
  <div class="photographer-page">
    <div class="container" v-if="photographer">
      <h1>{{ photographer.first_name }}</h1>
      <div class="line" />
      <img
          :src="photographer.avatar_url"
          :alt="photographer.first_name"
      >
<!--      <div class="section">
        <p class="section__title">Немного о фотографе:</p>
        <p class="section__description">{{""}}</p>
      </div>-->
      <div class="section">
        <p class="section__title">Рейтинг:</p>
        <p class="section__description">{{ photographer.rating }}</p>
      </div>

      <div class="line" />

<!--      <div class="review">
        <h3>Работали с этим фотографом?</h3>
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
      </div>-->
    </div>
  </div>

</template>

<script>

import { mapGetters } from 'vuex'
import axios from "axios";

export default {
  data() {
    return {
      photographer: null
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
    this.$load(async() => {
      this.photographer = (await axios.get('../api/profile', {
        params: {
          id_user: this.$route.params.id
        },
        headers: { 'Authorization':localStorage.getItem('user')}
      })).data
    })
    //console.log()
  }
}
</script>

const info = await   axios
.get('api/photographers?page=1')
//  console.log( info.data.photographers[0].first_name)
this.photographers = info.data.photographers

<style lang="scss" >
.photographer-page {
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