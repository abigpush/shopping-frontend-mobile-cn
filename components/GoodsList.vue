<template>
  <div class="goodsList">
    <ul v-if="!isListLoading && goodsList && goodsList.length > 0"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="scrollDisabled"
        infinite-scroll-distance="10">
      <li
          class="goods" 
          v-for="(goods, index) in goodsList" 
          :key="goods.goodId"
          @click="seeDetail(index)">
        <h3 class="goods-title">
          <span class="price">{{goods.price}}</span>
          {{goods.title}}
        </h3>
        <div class="loading-wrapper" v-show="isLoadingIndex === index">
          <mt-spinner type="snake" class="loading" ></mt-spinner>
        </div>
        <div class="goods-content" v-if="!detailList[index] && !(isLoadingIndex === index)">
          <div class="content-wrapper clearfix">
            <div class="left-img">
              <a :href="goods.url">
                <img v-lazy="goods.smallImageUrl" alt="">
              </a>
            </div>
            <div class="right-content">
              <p class="article">
                {{goods.shortContent}}
              </p>
            </div>
          </div>
          <p class="source clearfix">
            <span class="sourceName">同步自 {{dealDomain(goods.goodSourceName)}}</span>
            <span class="time">
              {{changeTime(goods.syncTime)}}
              <span class="mallName">
                {{goods.mallName}}
              </span>
            </span>
          </p>
        </div>
        <div class="goods-detail" ref="goodsDetail" v-if="detailList[index] && !(isLoadingIndex === index)">
          <p class="source clearfix">
            <span class="mallName" v-if="goods.mallName">
              {{goods.mallName}}
            </span>
            <span class="time">
              {{changeTime(goods.syncTime)}}
            </span>
          </p>
          <div class="detail-content">
            <figure>
              <figcaption class="title" v-if="detailList[index]">
                <span v-if="detailList[index].discounts">
                  {{detailList[index].discounts}}
                </span>
                <span v-if="!detailList[index].discounts && detailList[index].originalPrice">
                  {{detailList[index].price}}(
                  <i>{{detailList[index].originalPrice}}</i>
                  ,{{getOff(detailList[index].price, detailList[index].originalPrice)}} off)
                </span>
                <span class="price" v-if="!detailList[index].discounts && !detailList[index].originalPrice">
                  {{detailList[index].price}}
                </span>
              </figcaption>
              <p class="content">
                <span v-html="detailList[index].contentHtml && ignoreLink(detailList[index].contentHtml)">
                  {{detailList[index].contentHtml && ignoreLink(detailList[index].contentHtml)}}
                </span>
              </p>
              <img v-lazy="goods.smallImageUrl"/>
            </figure>
          </div>
        </div>
        <div class="goods-footer" :class="{seeMoreStyle: detailList[index]}" @click.stop>
          <div class='upvote'>
            <upvote class="upvote-icon" :getThumbsAdd="getThumbsAdd" :id="goods.id"></upvote>
            <span class="upvoteNum">{{goods.thumbs}}</span>
          </div>
          <div v-if="!detailList[index]" class="seeMore btn" @click="seeDetail(index)">详情</div>
          <a :href="goods.url" v-if="!detailList[index]">
            <div class="buyLink btn">直达链接</div>
          </a>
          <a :href="goods.url" v-if="detailList[index]">
            <div class="buyNowLink btn">前往购买</div>
          </a>
          <div class="goods-shrink" v-if="detailList[index]" @click="shrink(index)">
            <img src="../assets/images/shrink.png" alt="">
          </div>
        </div>
      </li >
      <li class="list-loading li-loading" v-show="scrollLoading">
        <mt-spinner type="snake" class="loading"></mt-spinner>
      </li> 
    </ul>
    <div class="list-loading" v-if="isListLoading">
      <mt-spinner type="snake" class="loading"></mt-spinner>
      <p>数据加载中</p>
    </div> 
    <no-list v-if="goodsList === null">
      没有找到相应商品
    </no-list>
  </div>
</template>

<script>
import NoList from './NoList.vue'
import upvote from '../components/Upvote.vue'
import { changeTime, dealDomain, ignoreLink, getOff } from '../utils/utils'
import { mapActions, mapState, mapGetters } from 'vuex'
import qs from 'qs'
export default {
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    },
    getThumbsAdd: {
      type: Function
    },
    behaviorFun: {
      type: Function
    },
    isListLoading: {
      type: Boolean,
      default: false
    },
    scrollDisabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['getPageCount']),
    ...mapState([
      'goodsDetail',
      'goodsPageIndex'
    ])
  },
  data() {
    return {
      ignoreLink,
      getOff,
      detailList: [], // 详情列表
      indexList: [], // 用来存储已查看详情的商品的index  用于收缩详情时查询dom以便于滚回原来高度
      isLoadingIndex: null, // 是否显示loading动画
      scrollLoading: true // 滚动时的loading动画
    }
  },
  methods: {
    ...mapActions(['getGoodsDetail']),
    changeTime(time) {
      return changeTime(time)
    },
    dealDomain(domain) {
      return dealDomain(domain)
    },
    seeDetail(index) { // 查看详情
      let data = {
        type: '1',
        url: this.$route.fullPath,
        goodId: this.goodsList[index].id
      }
      this.isLoadingIndex = index
      this.behaviorFun(data).then(() => {
        this.getGoodsDetail({id: data.goodId})
      })
    },
    shrink(index) { // 收缩详情
      var detailIndex = this.indexList.indexOf(index)
      var detailH = this.$refs.goodsDetail[detailIndex].offsetHeight

      document.documentElement.scrollTop -= detailH

      this.isLoadingIndex = index
      this.detailList[index] = null
      this.isLoadingIndex = null
      this.indexList.splice(detailIndex, 1)
    },
    loadMore() {
      if (this.goodsPageIndex === this.getPageCount) {
        this.scrollLoading = false
        return
      }
      this.changePage(this.goodsPageIndex + 1)
    },
    changePage(i) {
      var obj = Object.assign({}, this.$route.query, {page: i})
      var d = qs.stringify(obj)
      this.$router.push({path: this.$router.currentRoute.path + '?' + d})
    }
  },
  watch: {
    'goodsDetail'(to, from) {
      this.detailList[this.isLoadingIndex] = to
      this.indexList.push(this.isLoadingIndex)
      this.isLoadingIndex = null
    }
  },
  components: {
    NoList,
    upvote
  }
}
</script>

<style lang="scss" scoped>
  @mixin textOverFlow ($line) { // 多行超出隐藏  适用于移动端  参数是显示的行数
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: $line; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
  .goodsList{
    .goods{
      width: 100%;
      padding: .126rem .192rem;
      border-bottom: 1px solid #eaeaea;

      .goods-title{
        color: #444;
        font-weight: 500;
        font-size: .34rem;
        max-height: .88rem;
        @include textOverFlow(2);

        .price{
          color: red;
          font-weight: bold;
        }
      }

      .loading-wrapper{
        position: relative;
        padding: 1rem 0;
        .loading{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .goods-content{
        margin-top: .3rem;
        .left-img{
          float: left;
          width: 1.3rem;
          text-align: center;
          margin:0 .14rem;
          img{
            height: 1.3rem;
            max-width: 1.3rem;
          }
        }
        .right-content{
          float: left;
          width: 4.3916rem;
          margin-left: .03rem;
          .article{
            height: 1.14rem;
            font-size: 14px;
            color: #aaa;
            @include textOverFlow(3);
          }
        }

        .source{
          height: .32rem;
          line-height: .32rem;
          margin-top: .13rem;
          color: #aaa;

          .sourceName{
            float: left;
          }
          .time{
            float: right;
            color: #48a753;
            .mallName{
              color: #323232;
              font-weight: bold;
            }
          }
        }
      }

      .goods-detail{
        .source{
          span{
            height: .32rem;
            line-height: .32rem;
            margin-top: .13rem;
            padding-right: .14rem;
            float: left;

            &.mallName{
              color: #aaa;
            }
            &.time{
              color: #48a753;
            }
          }
        }

        .detail-content{
          color: #48494d;
          .title{
            margin: .12rem 0;
            font-weight: 500;
            
            .price{
              color: red;
              font-weight: bold;
              font-size: .28rem;
            }
          }
          img{
            max-width: 100%;
            display: block;
            margin: .15rem auto .3rem;
          }
        }
      }

      .goods-footer{
        position: relative;
        height: .6rem;
        margin-bottom: .15rem;
        margin-top: .05rem;
        .upvote{
          position: absolute;
          width: 1rem;
          left: .14rem;
          top: 0;
          .upvoteNum{
            position: absolute;
            left: .74rem;
            top: .2rem;
            color: #aaa;
          }
        }

        .btn{
          position: absolute;
          top: .1rem;
          right: 0;
          width: 1.6468rem;
          height: .5956rem;
          text-align: center;
          padding: .088rem .26rem;
          background-color: #ff2069;
          font-size: .28rem;
          color: #fff;
          border-radius: .06rem;
          font-weight: 600;

          &.seeMore{
            width: 2rem;
            right: 1.8rem;
            background-color: #f5f5f5;
            color: #666;
          }
        }
      }

      .seeMoreStyle{
        height: 2.78rem;
        .upvote{
          left: 50%;
          top: .15rem;
          transform: translateX(-50%);
        }
        .buyNowLink {
          width: 2.7rem;
          height: .8rem;
          line-height: .8rem;
          font-size: .32rem;
          padding: 0;
          right: 50%;
          top: 1.15rem;
          transform: translateX(50%);
        }

        .goods-shrink{
          position: absolute;
          bottom: -.15rem;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    .list-loading{
      position: relative;
      padding: 1rem 0;
      text-align: center;
      line-height: 100%;
      .loading{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      p{
        position: absolute;
        left: 50%;
        top: 80%;
        transform: translateX(-50%);
      }

      &.li-loading{
        padding: .5rem 0;
      }
    }
  }
</style>
