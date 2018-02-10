<template>
  <header class="header clearfix">
    <div class="logo">
      <img src="../assets/logo-cn.png" alt="">
    </div>
    <!-- <router-link to="/" class="toPc">
      电脑版>
    </router-link> -->
  </header>
</template>

<script>
export default {

}
</script>


<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 1rem;
    background-color: #ddd;
    .logo{
      float: left;
      margin-left: .2rem;
      img{
        height: 1rem;
      }
    }
    .toPc{
      float: right;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      margin-right: .2rem;
      color: #999;
      text-decoration: underline;
    }
  }
</style>
