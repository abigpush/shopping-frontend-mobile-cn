<template>
  <div style="background:#f0f2f5;">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img404" alt="404">
        <img class="pic-404__child left" :src="img404Cloud" alt="404">
        <img class="pic-404__child mid" :src="img404Cloud" alt="404">
        <img class="pic-404__child right" :src="img404Cloud" alt="404">
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">Please check whether the URL you entered is correct. Please click on the button below to return to the homepage or send error report</div>
        <a href="/" class="bullshit__return-home">Home page</a>
      </div>
    </div>
  </div>
</template>

<script>
  import img404 from '@/assets/images/404.png'
  import img404Cloud from '@/assets/images/404_cloud.png'
  export default {
    layout: 'notFound',
    data() {
      return {
        img404,
        img404Cloud
      }
    },
    computed: {
      message() {
        return "Trump says you can't enter this page......"
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404 {
    position: relative;
    width: auto;
    height: 100vh;
    padding: 0 .5rem;
    overflow: hidden;
  .pic-404 {
    position: relative;
    width: 100%;
    padding: .9rem 0 .5rem;
    overflow: hidden;
  &__parent {
     width: 100%;
   }
  &__child {
     position: absolute;
  &.left {
     width: .4rem;
     top: .8rem;
     left: 1.1rem;
     opacity: 0;
     animation-name: cloudLeft;
     animation-duration: 2s;
     animation-timing-function: linear;
     animation-fill-mode: forwards;
     animation-delay: 1s;
   }
  &.mid {
     width: .23rem;
     top: .1rem;
     left: 2.1rem;
     opacity: 0;
     animation-name: cloudMid;
     animation-duration: 2s;
     animation-timing-function: linear;
     animation-fill-mode: forwards;
     animation-delay: 1.2s;
   }
  &.right {
     width: .31rem;
     top: .5rem;
     left: 2.5rem;
     opacity: 0;
     animation-name: cloudRight;
     animation-duration: 2s;
     animation-timing-function: linear;
     animation-fill-mode: forwards;
     animation-delay: 1s;
   }
  @keyframes cloudLeft {
    0% {
      top: .8rem;
      left: 1.1rem;
      opacity: 0;
    }
    20% {
      top: .16rem;
      left: .94rem;
      opacity: 1;
    }
    80% {
      top: .4rem;
      left: .46rem;
      opacity: 1;
    }
    100% {
      top: .48rem;
      left: .3rem;
      opacity: 0;
    }
  }
  @keyframes cloudMid {
    0% {
      top: .05rem;
      left: 2.1rem;
      opacity: 0;
    }
    20% {
      top: .2rem;
      left: 1.8rem;
      opacity: 1;
    }
    70% {
      top: .65rem;
      left: .9rem;
      opacity: 1;
    }
    100% {
      top: .8rem;
      left: .6rem;
      opacity: 0;
    }
  }
  @keyframes cloudRight {
    0% {
      top: .5rem;
      left: 2.5rem;
      opacity: 0;
    }
    20% {
      top: .6rem;
      left: 2.3rem;
      opacity: 1;
    }
    80% {
      top: .9rem;
      left: 1.7rem;
      opacity: 1;
    }
    100% {
      top: 1rem;
      left: 1.5rem;
      opacity: 0;
    }
  }
  }
  }
  .bullshit {
    position: relative;
    width: 100%;
    padding: 1rem 0;
    overflow: hidden;
  &__oops {
     font-size: 20px;
     font-weight: bold;
     line-height: .2rem;
     color: #1482f0;
     opacity: 0;
     margin-bottom: .2rem;
     animation-name: slideUp;
     animation-duration: 0.5s;
     animation-fill-mode: forwards;
   }
  &__headline {
     font-size: 16px;
     line-height: .48rem;
     color: #1482f0;
     opacity: 0;
     margin-bottom: .05rem;
     animation-name: slideUp;
     animation-duration: 0.5s;
     animation-delay: 0.1s;
     animation-fill-mode: forwards;
   }
  &__info {
     font-size: 13px;
     line-height: .4rem;
     color: grey;
     opacity: 0;
     margin-bottom: .15rem;
     animation-name: slideUp;
     animation-duration: 0.5s;
     animation-delay: 0.2s;
     animation-fill-mode: forwards;
   }
  &__return-home {
     display: block;
     float: left;
     width: 2.2rem;
     height: .72rem;
     background: #1482f0;
     border-radius: .5rem;
     text-align: center;
     color: #ffffff;
     opacity: 0;
     font-size: 14px;
     line-height: .72rem;
     cursor: pointer;
     animation-name: slideUp;
     animation-duration: 0.5s;
     animation-delay: 0.3s;
     animation-fill-mode: forwards;
   }
  @keyframes slideUp {
    0% {
      transform: translateY(.3rem);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  }
  }
</style>
