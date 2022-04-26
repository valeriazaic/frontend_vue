<template>
  <div class="main-page">
    <h1>
      Добро пожаловать в НайдиФотографа!
    </h1>
    <button type="button" class="btn btn-outline-light" @click="$router.push({ name: 'films' })">Искать</button>
  </div>
</template>

<style lang="scss" scoped>
  .main-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    h1 {
      color: #ffffff;
      font-size: 40px;
      margin-bottom: 20px;
    }
  }
</style>