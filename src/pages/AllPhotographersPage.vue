<template>
  <div class="photographers-page container">
    <h2>Найди своего фотографа:</h2>
    <photographers-list :photographers="photographers" />
  </div>
</template>

<script>
import PhotographersList from '../components/PhotographersList'
import axios from "axios";

export default {
  components: { PhotographersList },
  data() {
    return {
      photographers: []
    }
  },
  created() {
      this.$load(async() => {
     const info = await  axios .get('api/photographers?page=1')
      //  console.log( info.data.photographers[0].first_name)
        this.photographers = info.data.photographers//присваивается корректно, можно обращаться по всем полям
      //  console.log("Inside", this.photographers[0].id)
      })
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