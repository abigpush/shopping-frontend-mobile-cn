<template>
  <div class="coupons-items">
    <header class="hd">
      TODAY'S TOP COUPONS
    </header>
    <div class="coupons-list">
      <ul>
        <li class="coupons" 
          v-for="coupon in coupons" 
          :key="coupon.id">
          <div class="coupon-detail clearfix">
            <div class="left-image">
              <img v-lazy="coupon.imgUrl" alt="">
            </div>
            <div class="right-detail">
              <p class="detail-item clearfix">
                <span class="detail-title">Coupon Code：</span>
                <span class="code">{{coupon.code}}</span>
              </p>
              <p class="detail-item clearfix">
                <span class="detail-title">Summary：</span>
                <span class="summary">{{coupon.summary}}</span>
              </p>
              <p class="detail-item clearfix">
                <span class="detail-title">Expires：</span>
                <span class="time">{{changeTime2(coupon.expire,'yyyy-MM-dd hh:mm')}}</span>
              </p>
            </div>
          </div>
          <div class="get-deal">
              <a rel="nofollow" class="cou_btn" target="_blank" :href="coupon.url" >Get Deal</a>
          </div>
        </li>
      </ul>
    </div>
 </div>
</template>


<script>
import {changeTime2} from '@/utils/utils'
export default{
  data: () => ({
  }),
  props: {
    coupons: {
      default: []
    }
  },
  methods: {
    changeTime2
  }
}
</script>

<style lang="scss" scoped>
  .coupons-items{
    .hd{
      width: 100%;
      background-color: #f5f5f5;
      border-bottom: 1px solid #eaeaea;
      color: #777;
      padding: 0.18rem;
    }
    .coupons-list{
      .coupons{
        padding: 0.06rem 0;
        border-bottom: 1px solid #eaeaea;

        .coupon-detail{
          margin: 0.12rem 0.18rem;

          .left-image{
            float: left;
            width: 1.3rem;
            height: 1.3rem;
            position: relative;
            img{
              position: absolute;
              width: 100%;
              top: 50%;
              transform: translateY(-50%);
            }
          }

          .right-detail{
            float: right;
            width: 4.5rem;
            margin-left: .1rem;
            .detail-item{
              color: #666;
              margin-bottom: .1rem;

              span{
                float: left;
                width: 2.67rem;
                word-break: break-all;

                &:first-child{
                  width: 1.83rem;
                }

                &.code{
                  color: #333;
                  font-weight: bold;
                }
                &.summary{
                  color: #003399;
                  font-weight: bold;
                }
              }
            }
          }
        }
        .get-deal{
          position: relative;
          width: 100%;
          height: .6rem;
          margin-bottom: .1rem;
          .cou_btn{
            position: absolute;
            top: 0;
            right: .3rem;
            width: 1.29rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            background-color: #ff2069;
            border-radius: .1rem;
            color: #fff;
          }
        }
      }
    }
  }
</style>
