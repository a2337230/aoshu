<template>
  <div class="tab-item">
    <!-- 详情 -->
    <div class="details" v-show="!type">
      <div class="title">
        <h2>{{data.Name}}</h2>
        <!-- <el-rate v-model="rate" :allow-half="true" :void-icon-class="'iconfont icon-yduixingxingkongxin'" :icon-classes="['iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin']"></el-rate> -->
      </div>
      <p class="hits">浏览量:{{data.BrowseNum}}</p>
      <div class="content" v-html="data.Introduce">
      </div>
      <button class="isButton" @click="goLive">立即学习</button>
    </div>
    <!-- 章节 -->
    <div class="chapter" v-show="type == 1">
      <div class="chapter-menu">
        <div class="chapter-item" v-for="(item, index) in chapterList" :key="index">
          <h3 class="chapter-title">
            {{item.chapter.Name}}
          </h3>
          <ul class="chapter-list">
            <li v-for="(citem, cindex) in item.courseware" :key="cindex">
              <div class="chapter-item-title">
                <img src="./../common/play.png" alt="">
                <p>{{citem.Name}}</p>
              </div>
              <time>{{citem.TimeLength | timeFormat}}</time>
            </li>
          </ul>
        </div>
      </div>
      <button @click="goLive">立即学习</button>
    </div>
    <!-- 评论 -->
    <div class="review" v-if="type == 2">
      <scroll class="review-menu" :data="reviewList" :pullup="pullup" @scrollToEnd="scrollToEnd">
        <ul>
          <li class="review-item" v-for="item in reviewList" :key="item.ReviewID">
            <div class="user">
              <div class="avatar">
                <img :src="item.HeadImg ? 'https://img.xlxt.net/' + item.HeadImg : 'https://img.xlxt.net/photoManage/2019/11/25/157466529000091475.jpg'" alt="">
              </div>
              <div class="name">
                <p>{{item.Name}}</p>
                <time>{{item.AddTime | reviewFormat}}</time>
              </div>
              <div class="star">
                <el-rate v-model="item.Star" :allow-half="true" :void-icon-class="'iconfont icon-yduixingxingkongxin'" :icon-classes="['iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin']"></el-rate>
              </div>
            </div>
            <p class="review-content">{{item.Content}}</p>
          </li>
        </ul>
      </scroll>
      <button @click="goLive">立即学习</button>
    </div>
  </div>
</template>
<script>
import { GetReview } from '@/api/index'
import moment from 'moment'
export default {
  name: 'tab-item',
  props: {
    data: {
      type: [Array,Object,String],
      default: () => { return [] }
    },
    type: {
      type: Number,
      default: 0
    },
    chapterList: {
      type: Array,
      default: () => { return [] }
    }
  },
  data() {
    return {
      rate: 0,
      pagesize: 15,
      pageindex: 1,
      courseID: 354,
      reviewList: [],
      pullup: true
    }
  },
  created () {
    this._GetReview()
  },
  methods: {
    // 获取课程评论
    async _GetReview () {
      let result = await GetReview({
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        courseID: this.courseID
      })
      if (result.Code === 200) {
        this.reviewList = result.Data
        // 判断是否可上拉加载
        if (this.pagesize * this.pageindex <= result.Count) {
          this.pullup = true
        } else {
          this.pullup = false
        }
      }
    },
    // 评论滚动
    scrollToEnd () {
      if (!this.pullup) {
        return 
      }
      this.pagesize+=15
      this._GetReview()
    },
    goLive () {
      this.$router.push({
        path: '/livevideo',
        query: {
          id: this.$route.query.id
        }
      })
    }
  },
  filters: {
    timeFormat (val) {
      let hour = parseInt(val / 60)
      let minute = val - hour * 60
      return hour + ':' + minute
    },
    reviewFormat (val) {
      return moment(val).format('YYYY.MM.DD HH:mm')
    }
  },
  components: {
    Scroll: () => import('@/components/Scroll')
  }
}
</script>
<style lang="less" scoped>
.tab-item {
  margin: .23rem .3rem 0;
  background-color: #fff;
  width: calc(~"100vw - .6rem");
  height: calc(~"100vh - .88rem - 4.52rem - .51rem - .23rem");
  box-shadow:0px 2px 30px 20px rgba(0,0,0,0.03);
  border-radius: .1rem .1rem 0 0;
  box-sizing: border-box;
  padding: .46rem .3rem 0;
  .details, .chapter, .review {
    height: calc(~"100vh - .88rem - 4.52rem - .51rem - .23rem - .46rem");
    // overflow: hidden;
    position: relative;
    .title {
      display: flex;
      justify-content: space-between;
      // height: .56rem;
      align-items: center;
      h2 {
        font-size: .3rem;
        line-height: .56rem;
      }
      /deep/ .el-rate__icon, /deep/ .hover, /deep/ .el-rate__decimal {
        font-size: .4rem;
        transform: scale(1);
        color: #006B45 !important;
      }
    }
    .hits {
      font-weight: lighter;
      color: #333;
      font-size: .3rem;
      line-height: .42rem;
      margin-bottom: .44rem;
    }
    .content {
      width: 100%;
      min-height: calc(~"100% - .56rem - .42rem - .44rem - .8rem");
      font-size: .3rem;
      line-height: .42rem;
      color: #333;
    }
    .chapter-menu {
      height: calc(~"100% - .8rem");
    }
    .chapter-title {
      font-size: .3rem;
      line-height: .42rem;
      color: #333;
      padding-bottom: .11rem;
      border-bottom: 1px solid #D9D9D9;
      margin-bottom: .22rem;
    }
    .chapter-list {
      padding: 0 .24rem;
      color: #006B45;
      li {
        display: flex;
        justify-content: space-between;
        .chapter-item-title {
          display: flex;
          img {
            width: .2rem;
            height: .3rem;
            margin-right: .3rem;
          }
          p {
            line-height: .3rem;
          }
        }
        
      }
    }
    .review-menu {
      height: calc(~"100% - .8rem");
      overflow: hidden;
    }
    .review-item {
      padding: .34rem 0 .4rem;
      border-bottom: 1px solid #979797;
      &:last-child {
        border: 0;
      }
      /deep/ .el-rate__icon, /deep/ .hover, /deep/ .el-rate__decimal {
        font-size: .4rem;
        transform: scale(1);
        color: #006B45 !important;
      }
      .user {
        display: flex;
        position: relative;
        margin-bottom: .27rem;
        img {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          margin-right: .22rem;
        }
        .name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          p {
            color: #363636;
            font-size: .28rem;
            line-height: .4rem;
          }
          time {
            color: #999;
            font-size: .24rem;
            line-height: .32rem;
          }
        }
        .star {
          position: absolute;
          right: 0;
        }
      }
      .review-content {
        font-size: .28rem;
        line-height: .4rem;
        color: #363636;
      }
    }
    button {
      width: calc(~"100vw - .6rem");
      margin-left: -.3rem;
      height: .8rem;
      background-color: #006B45;
      outline: none;
      border: 0;
      border-radius: .2rem .2rem 0 0;
      font-size: .3rem;
      color: #fff;
    }
    .isButton {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>