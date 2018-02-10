<template>
  <div v-title="title">
    <my-header id="header"></my-header>
    <top-search
      :behaviorFun='getBehaviorAdd' 
      :refresh="loadTop"></top-search>
    <mt-loadmore  
        :top-method="loadTop"
        :topPullText="'下拉刷新'"
        :topDropText="'释放刷新'"
        :topLoadingText="'正在加载'"
        ref="loadmore"
        style="width:100%">
      <a class="feednotify" v-if="goodsNotify > criticalNotifyNum"  @click="getGoodsList($route.query)">
        <span>●</span>
        <span>有{{goodsNotify}}条新条目发布 点击查看 >></span>
      </a>
      <goods-list 
        :goodsList="goodsList" 
        :getThumbsAdd="getThumbsAdd"
        :behaviorFun='getBehaviorAdd'
        :isListLoading='isListLoading'
        :scrollDisabled="scrollDisabled"
        ></goods-list>
    </mt-loadmore>
  </div>
</template>
<script>
  import MyHeader from '../components/MyHeader.vue'
  import GoodsList from '../components/GoodsList.vue'
  import TopSearch from '../components/TopSearch.vue'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { autoFetchTime, criticalNotifyNum, baseTitle } from '../utils/Global'
  import { fetchGoodsList, fetchSearchList } from '../utils/fetch'

  export default {
    name: 'index',
    head() {
      return {
        title: this.title
      }
    },
    async fetch({store, query}) {
      this.isListLoading = true
      if (query.key) {
        await fetchSearchList({store, query})
        this.isListLoading = false
      } else {
        await fetchGoodsList({store, query})
        this.isListLoading = false
      }
    },
    components: {
      MyHeader,
      TopSearch,
      GoodsList
    },
    data() {
      return {
        criticalNotifyNum: criticalNotifyNum,
        title: baseTitle,
        loadFlag: false,
        addPage: 0,
        scrollDisabled: false, // 控制无限滚动列表能否滚动
        // bottomAllLoaded: false,  // bottomAllLoaded 为真时将不加载新数据 即所有数据加载完成后
        // autoFill: false, // 是否填充容器
        isListLoading: false  // 列表数据加载loading
      }
    },
    methods: {    // 绑定事件的关键代码
      loadTop() { // 下拉刷新
        var data = Object.assign({}, this.$route.query, {page: 1})

        if (data.key) {
          this.getSearchList(data).then(() => {
            this.$refs.loadmore.onTopLoaded()
          })
        } else {
          this.getGoodsList(data).then(() => {
            this.$refs.loadmore.onTopLoaded()
          })
        }

        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
      },
      ...mapActions([
        'getGoodsList',
        'getGoodsNotify',
        'getSearchList',
        'getBehaviorAdd',
        'getThumbsAdd'
      ])
    },
    computed: {
      ...mapGetters(['getPageCount']),
      ...mapState(['goodsList', 'goodsPageIndex', 'goodsNotify', 'maxId', 'maxSyncTime']),
      currentPage() {
        return this.goodsPageIndex - 1
      }
    },
    created() {
    // 定时请求任务  获取新增条目数;
      this.intervalid = setInterval(() => {
          // 原数据中没有 goodsList 或者 this.$route.query.key存在时 不求数据
        if (this.goodsList && !this.$route.query.key) {
          this.getGoodsNotify(Object.assign({}, this.$route.query, {id: this.maxId, sync: this.maxSyncTime}))
        }
      }, autoFetchTime)
    },
    watch: {
      '$route'(to, from) {
        this.scrollDisabled = true
        if (to.query.key) {
          this.addPage = 0
          this.getSearchList(to.query).then(() => {
            // this.listLoadEnd()
            this.scrollDisabled = this.goodsPageIndex + 1 === this.getPageCount
          })
        } else {
          this.addPage = 0
          this.getGoodsList(to.query).then(() => {
            // this.listLoadEnd()
            this.scrollDisabled = this.goodsPageIndex + 1 === this.getPageCount
          })
        }
      },
      'goodsNotify'(to, from) {
        if (to && to > criticalNotifyNum) {
          this.title = '(' + to + ' new entries) ' + baseTitle
        } else {
          this.title = baseTitle
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalid)
    }
  }
</script>

<style lang="scss" scoped>
  .toApp{
    img {
      width: 100%;
    }
  }
  .feednotify{
    background: #e7f6e7;
    display: block;
    text-align: center;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    span:nth-child(2){
      line-height: 350%;  
      color: #5db95b;  
      font-size: .26rem;
    }
    span:nth-child(1){ 
      line-height: 350%;  
      color: #ff998a;  
      font-size: .26rem;
    }
  }
</style>
