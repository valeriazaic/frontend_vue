<template>
  <div class="photographer-card">
    <img
        :src="photographer.avatar_url"
        :alt="photographer.first_name"
    >
    <p class="name">{{ photographer.first_name}} {{photographer.second_name}}</p>
    <p class="rating">{{'Рейтинг:'}}  {{photographer.rating }}</p>
    <router-link
        :to="{ name: 'photographerPage', params: { id: photographer.id } }"
        class="more-info"
    >
      Подробнее о фотографе
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    photographer: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
.photographer-card {
  position: relative;
  img {
    position: relative;
    object-fit: cover;
    border-radius: 0px;
    width: 80px;
    height: 80px;
  }
  .name {
    position: absolute;
    margin-bottom: 0;
    bottom: 0;
    left: 80px;
    width: 100%;
    color: white;
    height: 80px;
   // background: linear-gradient(90deg, rgba(132, 216, 240, 1) 0%, rgba(0,0,0,0) 90%);
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