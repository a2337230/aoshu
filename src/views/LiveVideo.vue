<template>
  <div class="live-video">
    <header-box></header-box>
    <!-- 视频播放 -->
    <div class="video">
      <video-box :VideoId="VideoId" v-if="VideoId"></video-box>
    </div>
    <tabs @cuttentTabs="cuttentTabs"></tabs>
    <!-- 详情区域 -->
    <div class="details">
      <div class="detail" v-show="type === 0">
        <h1>{{liveInfo.Name}}</h1>
        <p>播放量：<span>{{liveInfo.BrowseNum}}</span></p>
        <div class="content" v-html="liveInfo.Introduce"></div>
      </div>
      <div class="info" v-show="type == 1">
        <!-- <h2>{{liveInfo.Name}}</h2>
        <p>浏览量： {{liveInfo.BrowseNum}}</p> -->
        <!-- <ul class="info-menu">
          <li v-for="(item, index) in chapterList" :key="index">
            <h3>{{item.chapter.Name}}</h3>
            <ul class="chapter-list">
              <li v-for="(citem, cindex) in item.courseware" :key="cindex">
                <div class="chapter-item-title">
                  <img src="../common/play.png" alt="">
                  <p>{{citem.Name}}</p>
                </div>
                <time>{{citem.TimeLength | timeFormat}}</time>
              </li>
            </ul>
          </li>
        </ul> -->
        <div class="chapter">
          <div class="chapter-menu">
            <div class="chapter-item" v-for="(item, index) in chapterList" :key="index">
              <h3 class="chapter-title">
                {{item.chapter.Name}}
              </h3>
              <ul class="chapter-list">
                <li v-for="(citem, cindex) in item.courseware" :key="cindex" class="chapter-item">
                  <div class="chapter-item-title">
                    <img src="./../common/play.png" alt="">
                    <div class="chapter-name">
                      <p>{{citem.Name}}</p>
                    </div>
                  </div>
                  <!-- <time>{{citem.TimeLength | timeFormat}}</time> -->
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <scroll class="review"  v-if="type == 2" :data="reviewList" :pullup="pullup" @scrollToEnd="scrollToEnd">
        <div class="review-container">
          <p class="star">评价该课程： <el-rate v-model="Star" :void-icon-class="'iconfont icon-yduixingxingkongxin'" :icon-classes="['iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin','iconfont icon-yduixingxingshixin']"></el-rate></p>
          <el-input
            :maxlength="100"
            type="textarea"
            :rows="4"
            placeholder="我来说两句..."
            v-model="textarea">
          </el-input>
          <div class="btn-container">
            <mt-button type="primary" size="large" @click="addReivew">发表评论</mt-button>
          </div>
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
        </div>
      </scroll>
    </div>
    <verify-box v-if="isVerify" @closeDialog="closeDialog" @isOK="isOK"></verify-box>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import Tabs from '@/components/Tabs'
import VideoBox from '@/components/Video'
// 企业认证
import VerifyBox from '@/components/VerifyBox'
import { GetCourseByIDShow, GetChapterCoursewareShow, GetReview, AddCourseReview, GetCoursewareByIDShow, GetMemberInfo, CheckAppUserJoinEnterprise } from '@/api/index'
import moment from 'moment'
import { Toast, MessageBox } from 'mint-ui'
import util from '@/util/util.js'
export default {
  name: 'live-video',
  data() {
    return {
      liveInfo: '',
      chapterList: [],
      reviewList: [],
      type: 1,
      id: 0,
      CoursewareID: 0,
      Star: 5,
      textarea: '',
      pagesize: 15,
      pageindex: 1,
      pullup: true,
      VideoId: '',
      isLogin: '',
      isVerify: false,
      timer: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    this._GetMemberInfo()

  },
  watch: {
    Star (val) {
      console.log(val)
    }
  },
  methods: {
    isOK () {
      this._GetCourseByIDShow()
      this._GetChapterCoursewareShow()
      this._GetReview()
    },
    // 验证
    async _CheckAppUserJoinEnterprise () {
      // 查询是否绑定企业
      let result = await CheckAppUserJoinEnterprise({type: 0})
      if (result.Code == 200) {
        if (!result.Data) {
          // 是个人没有绑定过企业
          this.isVerify = true
          return
        } 
      }
      this._GetCourseByIDShow()
      this._GetChapterCoursewareShow()
      this._GetReview()
    },
    // 判断是否登录
    async _GetMemberInfo () {
      let result = await GetMemberInfo()
      if (result.Code === 401) {
        MessageBox({
          title: '提示',
          message: '登录后可以观看',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '登录'
        }).then(action => {
          if (action === 'confirm') {
            window.location.href = 'https://sso2.xlxt.net/applogin/login.html?ReturnUrl=' + window.location.href
          }
        }) 
      } else {
        this.isLogin = result.Data
        this._CheckAppUserJoinEnterprise ()
      }
    },
    cuttentTabs (val) {
      this.type = val
      clearInterval(this.timer)
      if (val == 1) {
        // 超过宽度自动滚动
        this.$nextTick(() => {
          let dom = document.querySelector('.chapter-name')
          let child = dom.querySelector('p')
          child.innerText = child.innerText + '\xa0\xa0\xa0\xa0\xa0\xa0'
          if (dom.clientWidth < child.clientWidth) {
            this.timer = setInterval(() => {
              let title = child.innerText.split('')
              let one = title.shift()
              if (one === '\xa0') {
                title.push(one)
                one = title.shift()
              }
              title.push(one)
              child.innerText = title.join('')
            }, 300)
          }
        })
      }
    },
    // 获取直播视频
    async _GetCoursewareByIDShow () {
      let result = await GetCoursewareByIDShow({
        courseID: this.id,
        coursewareID: this.CoursewareID,
        type: 0
      })
      if (result.Code === 200) {
        this.VideoId = result.Data.cw.BaofengFileName
      }
    },
    // 获取直播详情
    async _GetCourseByIDShow () {
      let result = await GetCourseByIDShow({
        courseID: this.id
      })
      if (result.Code === 200) {
        this.liveInfo = result.Data.c
      }
      // console.log(this.liveInfo)
    },
    // 获取课程目录
    async _GetChapterCoursewareShow () {
      let result = await GetChapterCoursewareShow({
        courseID: this.id
      })
      if (result.Code === 200) {
        this.chapterList = result.Data.List
        this.CoursewareID = result.Data.List[0].courseware[0].CoursewareID
        this._GetCoursewareByIDShow()
      }
    },
    // 获取课程评论
    async _GetReview () {
      let result = await GetReview({
        pagesize: this.pagesize,
        pageindex: this.pageindex,
        courseID: this.id
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
    // 发表评论
    async addReivew () {
      let result = await AddCourseReview({
        content: this.textarea,
        courseID: this.id,
        verify: true,
        star: this.Star
      })
      if (result.Code === 200) {
        Toast({
          message: '评论成功',
          iconClass: 'iconfont icon-xiaolianchenggong'
        })
        this.textarea = ''
        this._GetReview()
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
    closeDialog () {
      this.isVerify = false
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
    HeaderBox,
    Tabs,
    VideoBox,
    VerifyBox,
    Scroll: () => import('@/components/Scroll')
  }
}
</script>
<style lang="less" scoped>
.live-video {
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  .video {
    padding: .32rem .3rem 0;
    // background-color: #fff;
    width: 6.9rem;
    height: 3.88rem;
    margin-bottom: .32rem;
  }
  .details {
    width: calc(~"100vw - .6rem");
    height: calc(~"100vh - .88rem - 4.52rem - .51rem - .23rem");
    background-color: #fff;
    margin: .23rem auto 0;
    border-radius: .2rem .2rem 0 0;
    box-sizing: border-box;
    padding: .46rem .4rem 0;
    overflow: hidden;

    .detail {
      color: #333;
      height: calc(~"100% - .3rem");
      overflow-y: scroll;
      &::-webkit-scrollbar {display:none}
      h1 {
        font-size: .3rem;
      }
      p {
        font-size: .26rem;
        font-weight: lighter;
        line-height: .6rem;
        margin-bottom: .4rem;
        span {
          font-weight: normal;
        }
      }
      .content {
        font-size: .3rem;
        line-height: .42rem;
      }
    }
    .info {
      h2 {
        font-size: .3rem;
        margin-bottom: .1rem;
      }
      p {
        font-size: .3rem;
        line-height: .42rem;
        color: #333;
        margin-bottom: .33rem;
        // white-space: nowrap;
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
        .chapter-item {
          display: flex;
          justify-content: space-between;
          .chapter-item-title {
            display: flex;
            height: .3rem;
            align-items: center;
            img {
              width: .2rem;
              height: .3rem;
              margin-right: .3rem;
            }
            .chapter-name {
              width: 5rem;
              height: .4rem;
              overflow: hidden;
              position: relative;
              p {
                position: absolute;
                top: 0;
                left: 0;
              // line-height: .3rem;
                margin-bottom: 0;
                color: #006B45;
                white-space: nowrap;
              }
            }
            
            
          }
          time {
            position: relative;
            top: -0.03rem;
          }
        }
      }
    }
    .review {
      height: calc(~"100vh - .88rem - 4.52rem - .51rem - .23rem - .46rem");
      overflow: hidden;
      // display: flex;
      // align-items: center;
      /deep/ .el-rate__icon, /deep/ .hover, /deep/ .el-rate__decimal {
        font-size: .4rem;
        transform: scale(1);
        color: #006B45 !important;
      }
      .star {
        display: flex;
        line-height: .4rem;
        font-size: .3rem;
        padding-bottom: .3rem;
      }
      .btn-container {
        padding: .2rem 0;
        .mint-button {
          background-color: #006B45;
        }
      }
      .review-item {
        padding: .34rem 0 .4rem;
        border-top: 1px solid #eee;
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
              width: 2.5rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
            margin-top: .15rem;
          }
        }
        .review-content {
          font-size: .28rem;
          line-height: .4rem;
          color: #363636;
          word-wrap:break-word;
        }
      }
    }
  }
}
</style>