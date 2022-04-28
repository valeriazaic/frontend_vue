<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    localStorage.clear()
  },
  destroyed() {
    localStorage.clear()
  },
  beforeDestroy() {
    localStorage.clear()
  }
}
</script>
