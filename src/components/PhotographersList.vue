<template>
  <div class="photographers-list">
    <photographer-card
        class="photographer-card"
        v-for="photographer in photographers"
        :key="photographer.id"
        :photographer="photographer"
    />
  </div>
</template>

<script>
import PhotographerCard from './PhotographerCard'

export default {
  props: {
    photographers: {
      type: Array,
      default: () => []
    }
  },
  components: { PhotographerCard }
}
</script>

<style lang="scss" scoped>
.photographer-card {
  margin-bottom: 40px;
  color: white;
}
</style>