<template>
  <div class="no-list">
    <img src="../assets/images/no_items.jpg" alt="">
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss" scoped>
  .no-list{
    text-align: center;
    img{
      width: 80%;
      margin: .2rem 0;
    }
    p{
      font-size: .64rem;
      color: #999;
    }
  }
</style>
