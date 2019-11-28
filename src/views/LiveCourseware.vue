<template>
  <div class="course-ware">
    <header-box></header-box>
    <div class="video-box">
      <div class="error" v-show="prepare">
        <p>{{errorText}}</p>
        <span @click="videodispose" v-if="errorText !== '直播已结束'">重试</span>
      </div>
      <div class="prism-player" id="J_prismPlayer" v-show="isAlready"></div>
      <!-- <img src="./../common/LiveError.png" alt="" > -->
    </div>
    <div class="tabs">
      <span v-for="(item, index) in tabs" :key="item" :class="{current: tab === index}" @click="tabClick(index)">{{item}}</span>
      <!-- <span>交流区</span> -->
    </div>
    <!-- 内容区域 -->
    <div class="course-content">
      <div class="details" v-show="!tab">
        <h2>{{liveInfo.Name}}</h2>
        <p>浏览量： {{liveInfo.BrowseNum}}</p>
        <div class="content" v-html="liveInfo.Introduce"></div>
      </div>
      <div class="reivew" v-show="tab">
        <scroll :data="reivewList" class="scroll">
          <ul class="reivew-menu">
            <li class="reivew-item" v-for="item in reivewList" :key="item.AddDate">
              <div class="user">
                <img :src="'https://img.xlxt.net/' + item.FromImg">
                <div class="pet">
                  <p>{{item.FromName}}</p>
                  <time>{{item.AddDate | timeFormat}}</time>
                </div>
              </div>
              <div class="reivew-content">
                {{item.Content}}
              </div>
            </li>
          </ul>
        </scroll>
        <div class="input-btn">
          <input type="text" placeholder="我有话要说~" v-model="reivewContent" @blur="isBlur">
          <button @click="submitReivew">发表</button>
        </div>
      </div>
    </div>
    <verify-box v-if="isVerify" @closeDialog="closeDialog" @isOK="isOK"></verify-box>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
// 企业认证
import VerifyBox from '@/components/VerifyBox'
import { GetCoursewareByID, GetCourseByIDShow, GetCourseMessage, SendCourseMessage, GetMemberInfo,CheckAppUserJoinEnterprise } from '@/api/index'
import $ from 'jquery'
import moment from 'moment'
import { Toast } from 'mint-ui'
export default {
  name: 'live',
  data () {
    return {
      LiveUrl: '',
      player: '',
      coursewareID: 0,
      tab: 0,
      tabs: ['详情', '交流区'],
      // 正在直播中
      isAlready: false,
      // 准备中
      prepare: true,
      // 错误提示
      errorText: '直播尚未开始',
      liveInfo: [],
      // 评论
      reivewContent: '',
      // 评论列表
      reivewList: [],
      isLogin: '',
      timer: '',
      startTime: '',
      isVerify: false
    }
  },
  created () {
    this.coursewareID = this.$route.query.CoursewareID
    this._GetMemberInfo()
    // this._GetCourseByIDShow()
    // this._GetCoursewareByID()
  },
  methods: {
    // 验证通过
    isOK () {
      this._GetCourseByIDShow()
      this._GetCoursewareByID()
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
      this._GetCoursewareByID()
    },
    // 判断是否登录
    async _GetMemberInfo () {
      let result = await GetMemberInfo()
      console.log(result)
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
    // 失去焦点
    isBlur () {
      var u = navigator.userAgent, app = navigator.appVersion
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        document.body.scrollTop = 0;
        setTimeout(() => {
          window.scrollTo(0,0)
        }, 100);
      }
    },
    // 发表评论
    async submitReivew () {
      if (!this.reivewContent) {
        Toast({
          message: '评论内容不能为空',
          duration: 2000
        })
        return
      }
      let result = await SendCourseMessage({
        cid: this.$route.query.id,
        cont: this.reivewContent,
        toUserID: ''
      })
      if (result.Code === 200) {
        this.reivewContent = ''
        let result1 = await GetCourseMessage({
          cid: this.$route.query.id,
          state: -1,
          pageindex: 1,
          fromTime: moment(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss.000')
        })
        this.reivewList = result1.Data.reverse()
      }
    },
    // 切换选项卡
    tabClick (index) {
      this.tab = index
      if (index) {
        this._GetCourseMessage()
      } else {
        clearTimeout(this.timer)
      }
    },
    // 获取直播评论
    async _GetCourseMessage (val) {
      clearTimeout(this.timer)
      if (this.tab) {
        let result = await GetCourseMessage({
          cid: this.$route.query.id,
          state: -1,
          pageindex: 1,
          fromTime: moment(new Date().getTime()).format('YYYY/MM/DD HH:mm:ss.000')
        })
        this.reivewList = result.Data.reverse()
        this.timer = setTimeout(() => {
          this._GetCourseMessage()
        }, 3000);
        console.log(result)
      }
    },
    // 获取直播详情
    async _GetCourseByIDShow () {
      let result = await GetCourseByIDShow({
        courseID: this.$route.query.id
      })
      this.liveInfo = result.Data.c
      console.log(result)
    },
    async _GetCoursewareByID () {
      let result = await GetCoursewareByID({
        coursewareID: this.coursewareID,
        type: 0
      })
      if (result.Code === 200) {
        if (!result.Data.LiveUrl) {
          this.errorText = '主播正在准备中...'
          this.prepare = true
          this.isAlready = false
        }
        this.LiveUrl = result.Data.LiveUrl
        this.startTime = Number(result.Data.cw.StartDate.substring(6, result.Data.cw.StartDate.length - 2))
        let time = new Date().getTime()
        let start = Number(result.Data.cw.StartDate.substring(6, result.Data.cw.StartDate.length - 2))
        if (start > time) {
          // console.log('直播未开始')
          this.prepare = true
          this.isAlready = false
        } else {
          this.errorText = '主播正在准备中...'
          // console.log('直播开始')
          this.prepare = false
          this.isAlready = true
          this.initVideo()
        }
      } else if (result.Code === 11126) {
        // this.prepare = false
        // this.isAlready = true
        // this.initVideo()
        let start1 = Number(result.Data.sDate.substring(6, result.Data.sDate.length - 2))
        let time1 = new Date().getTime()
        if (start1 > time1) {
          console.log('直播未开始')
          this.prepare = true
          this.isAlready = false
        } else {
          this.errorText = '直播已结束'
          this.prepare = true
          this.isAlready = false
        }
        
      }
    },
    // 初始化播放器
    initVideo () {
      this.player = new Aliplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive: true,//是不是直播
        source: this.LiveUrl,
        useH5Prism: true,
        liveRetry: 9999,
        // liveStartTime: moment(this.startTime).format('YYYY/MM/DD HH:mm:ss')
      }, function (player) {
        //播放器创建好了
        $('.prism-setting-btn').hide()
        $('.prism-cc-btn').hide()
      });
      this.player.on("canplay", () => {
        $('.prism-live-display')[0].innerText = '正在直播中...'
        // console.log('直播正在进行');
        this.prepare = false
        this.isAlready = true
      });
      this.player.on("playing", () => {
          // console.log('直播正在进行');
          this.prepare = false
          this.isAlready = true
      });
      this.player.on("error", function () {
        this.errorText = '主播正在准备中'
          console.log('直播失败');
      });
      this.player.on("liveStreamStop", () => {   //直播流中断
        $('.prism-live-display')[0].innerText = '主播正在准备中...'
        this.errorText = '主播正在准备中'
        console.log('直播中断');
        this.isAlready = false
        this.prepare = true
      });
      this.player.on("onM3u8Retry", () => {   //直播流中断
        $('.prism-live-display')[0].innerText = '主播正在准备中...'
        // console.log('直播中断恢复');
        this.errorText = '主播正在准备中'
        this.isAlready = false
        this.prepare = true
      });
      this.player.on("ended", function () {
        this.errorText = '直播已结束'
        this.isAlready = false
        this.prepare = true
        $('.prism-live-display')[0].innerText = '直播已结束'
          console.log('直播结束');
      });
    },
    closeDialog () {
      this.isVerify = false
    },
    videodispose () {
      location.reload()
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.tab = 0
    this.player.dispose()
  },
  filters: {
    timeFormat (val) {
      let time = Number(val.substring(6, val.length -2))
      return moment(time).format('YYYY.MM.DD HH:mm:ss')
    }
  },
  components: {
    HeaderBox,
    VerifyBox,
    Scroll: () => import('@/components/Scroll')
  }
}
</script>
<style lang="less" scoped>
.course-ware {
  width: 100vw;
  height: 100vh;
  // overflow: hidden;
  .video-box {
    padding: .32rem .3rem;
    width: 6.9rem;
    height: 3.88rem;
    overflow: hidden;
    position: relative;
    // background-color: #000;
    // #J_prismPlayer {
    //   width: 0 !important;
    //   height: 0 !important;
    //   overflow: hidden;
    // }
    // /deep/ video {
    //   width: 0;
    //   height: 0;
    //   display: none;
    // }
    /deep/ .prism-player .prism-marker-text {
      display: none;
    }
    .error {
      width: 100%;
      height: 100%;
      background-color: #000;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      // padding-top: 1.2rem;
      justify-content: center;
      font-size: .26rem;
      border-radius: .2rem;
      overflow: hidden;
      span {
        margin-top: .2rem;
        width: .6rem;
        height: .5rem;
        padding: 0 .3rem;
        border: 1px solid #fff;
        border-radius: .4rem;
        line-height: .5rem;
      }
    }
  }
  .tabs {
    padding: 0 .3rem;
    width: calc(~"100vw - 0.6rem");
    display: flex;
    justify-content: space-around;
    margin-bottom: .51rem;
    height: .4rem;
    line-height: .4rem;
    span {
      position: relative;
      color: #333;
      &::after {
        content: '';
        position: absolute;
        bottom: -.15rem;
        width: 100%;
        height: .06rem;
        border-radius: .2rem;
        left: 0;
        background-color: transparent;
      }
    }
    .current {
      color: #006B45;
      &::after {
        background-color: #006B45;
      }
    }
  }
  .course-content {
    width: calc(~"100vw - 0.6rem");
    height: calc(~"100vh - .88rem - 4.52rem - .4rem - .51rem");
    margin: 0 auto;
    background-color: #fff;
    border-radius: .2rem .2rem 0 0; 
    padding: .46rem .4rem 0;
    box-sizing: border-box;
    .details {
      color: #333;
      h2 {
        font-size: .3rem;
      }
      p {
        margin-top: .2rem;
        font-size: .26rem;
        font-weight: lighter;
        margin-bottom: .4rem;
      }
      .content {
        font-weight: lighter;
        font-size: .3rem;
        line-height: .42rem;
      }
    }
    .reivew {
      height: 100%;
      .scroll {
        height: calc(~"100% - .8rem");
        overflow: hidden;
      }
      // .reivew-menu {
      //   // height: calc(~"100% - .8rem");
      //   // overflow: hidden;
      // }
      .reivew-item {
        padding: .3rem 0;
        border-bottom: 1px solid #979797;
        &:first-child {
          padding-top: 0;
        }
        &:last-child {
          border: 0;
        }
        .user {
          height: .8rem;
          display: flex;
          margin-bottom: .4rem;
          img {
            width: .8rem;
            height: .8rem;
            border-radius: 50%;
            margin-right: .11rem;
          }
          .pet {
            width: 100%;
            p {
              font-size: .28rem;
              line-height: .4rem;
              color: #363636;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            time {
              color: #999;
              font-size: .24rem;
            }
          }
        }
        .reivew-content {
          color: #363636;
          font-size: .28rem;
          line-height: .4rem;
          word-wrap:break-word;
        }
      }
      .input-btn {
        width: 100%;
        position: fixed;
        bottom: 0;
        width: calc(~"100vw - .6rem");
        height: .8rem;
        margin-left: -0.4rem;
        background-color: #006B45;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        input {
          outline: none;
          border: 0;
          width: 5.32rem;
          height: .6rem;
          border-radius: .3rem;
          background-color: #fff;
          box-sizing: border-box;
          padding-left: .3rem;
          font-size: .28rem;
        }
        button {
          width: 1rem;
          height: .6rem;
          outline: none;
          border: 0;
          border-radius: .3rem;
          background-color: #fff;
          color: #006B45;
          font-size: .26rem;
          white-space: nowrap;
        }
      } 
    }
  }
}
  
</style>