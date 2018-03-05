<template>
  <div :class="{'isFixed': searchBarFixed}" id="searchBar">
    <div class="search clearfix" >
      <ul class="hot">
        <li
          class="hotKey" 
          v-for="(key, index) in keyList" 
          :key="index" 
          :class="{'active': $route.path === key.link && !$route.query.key}"
          @click="toLink(key.link)">
          {{key.name}}
        </li>
        <li class="hotKey active" v-show="$route.query.key">
                         搜索结果
        </li>
      </ul>
      <div class="btnGroup">
        <div class="searchBtn" @click="showCover">
          <img src="../assets/images/search.png" alt="">
        </div>
        <div class="refreshBtn" @click="refresh" v-show="!$route.query.key">
          <img src="../assets/images/refresh.png" alt="">
        </div>
      </div>
    </div>
    <div id="navbar"></div>
    <div class="backCover" v-show="coverFlag" @click="hideCover">
      <div class="search-wrapper" @click.stop>
        <div class="search-header clearfix">
          <span class="title">搜索本站折扣</span>
          <div class="closeBtn" @click="hideCover">
            <img src="../assets/images/closeicon.png" alt="">
          </div>
        </div>
        <div class="search-form clearfix">
          <input type="text" class="search-text" v-model="search" @keyup.enter="doSearch">
          <img src="../assets/images/searchicon.png" alt="" @click="doSearch">
        </div>
      </div>
    </div>
    <div class="toTopBtn" 
          v-show="searchBarFixed" 
          v-scroll-to="'#header'">
      <img src="../assets/images/toTop.png" alt="">
    </div>
  </div>
</template>
<script>
  import {createUrl} from '../utils/utils'
  export default {
    name: 'topSearch',
    data() {
      return {
        keyList: [{link: '/', name: '国内折扣'}, {link: '/abroad', name: '海淘折扣'}],
  
        coverFlag: false, // 是否显示遮罩层
        search: '',
        activeIndex: 0,
        searchBarFixed: false, // 是否固定搜索框
        offsetTop: 0, // 初始位置
        flag: false // 延后获取初始位置的flag
          // linkList:[{link:"/",name:'Home'},{link:"/coupons",name:'Coupons'},{link:"/gifts",name:'Gifts'},{link:"/?category=Beauty",name:'Beauty'},{link:"/?category=Clothing,%20Jewelry%20%26%20Bags",name:'Clothing'},{link:"/?category=Kids",name:'Kids'},{link:"/?category=Electronics",name:'Electronics'}]
      }
    },
    props: {
      refresh: {
        type: Function
      },
      behaviorFun: {
        type: Function
      }
    },
    computed: {
      queryCategory() {
        return this.$route.query.category
      }
    },
    methods: {    // 绑定事件的关键代码
      showCover() { // 显示遮罩层
        this.coverFlag = true
      },
      hideCover() { // 隐藏遮罩层
        this.coverFlag = false
      },
      changePage: function (key) {
        var d = createUrl({page: 1, key: key})
        this.behaviorFun({type: 3, url: this.$route.fullPath, key: key})
        this.$router.push({path: '/?' + d})
      },
      doSearch: function () {
        var text = this.search.trim()
        if (text) {
          this.changePage(text)
          this.search = ''
          this.hideCover()
          this.toTop()
        }
      },
      toLink(link) {
        this.$router.push(link)
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (!this.flag) {
          this.flag = true
          this.offsetTop = document.querySelector('#searchBar').offsetTop
        }
        var height = document.querySelector('#header').clientHeight

        if (scrollTop > this.offsetTop + height) {
          this.searchBarFixed = true
        } else {
          this.searchBarFixed = false
        }
      },
      toTop() {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      }
    },
    watch: {
      '$route'(to, from) {
        this.search = to.query.key
      }
    },
    created() {
      this.search = this.$route.query.key
    },
    mounted() {
      this.handleScroll()
      window.addEventListener('scroll', this.handleScroll)
      this.offsetTop = document.querySelector('#searchBar').offsetTop
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll)
    }

  }
</script>
<style lang="scss" scoped>
  .search{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .hot{
      float: left;
      .hotKey{
        padding: 0 .1rem;
        height: .54rem;
        line-height: .54rem;
        margin: .18rem;
        margin-right: 0;
        font-size: .26rem;
        color: #fff;
        background-color: #999;
        float: left;

        &.active{
          background-color: #ff2069;
        }
      }
      
    }

    .btnGroup{
      float: right;
      div{
        float: left;
        img{
          width: .84rem;
          height: .84rem;
        }
      }
    }
  }

  .backCover{
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    background-color: rgba(0, 0, 0, .7);

    .search-wrapper{
      width: 5.2rem;
      margin: 3rem auto 0;
      background-color: #fff;

      .search-header{
        height: .82rem;
        border-bottom: 1px solid #ddd;
        .title{
          float: left;
          padding-top: .24rem;
          margin-left: .2rem;
          font-size: .32rem;
          color: #888;
        }

        .closeBtn{
          float: right;
          img{
            height: .6rem;
            margin: .1rem;
          }
        }
      }
    }

    .search-form{
      .search-text{
        float: left;
        margin: .4rem .2rem .4rem .4rem;
        width: 3.1rem;
        height: .7rem;
        border: 1px solid #a2a2a2;
        font-size: .28rem;
      }
      img{
        float: left;
        width: .7rem;
        height: .7rem;
        margin: .4rem .2rem .4rem .4rem;
      }
    }
  }

  .toTopBtn{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #000;
    position: fixed;
    bottom: .2rem;
    right: .7rem;
    transform: translateX(50%);
    img{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .isFixed{
    width: 100%;
    background-color: #f5f5f5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>
