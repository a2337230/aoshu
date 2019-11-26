<template>
  <div class="course-ware">
    <header-box></header-box>
    <div class="video-box">
      <div class="prism-player" id="J_prismPlayer" v-show="isAlready"></div>
      <div class="error" v-show="prepare">
        <p>{{errorText}}</p>
        <span>重试</span>
      </div>
      <!-- <img src="./../common/LiveError.png" alt="" > -->
    </div>
    <div class="tabs">
      <span v-for="(item, index) in tabs" :key="item" :class="{current: tab === index}" @click="tabClick(index)">{{item}}</span>
      <!-- <span>交流区</span> -->
    </div>
    <!-- 内容区域 -->
    <div class="course-content">
      <div class="details" v-show="!tab">
        <h2>标题</h2>
        <p>浏览量： 123132</p>
        <div class="content">213123213123123</div>
      </div>
      <div class="reivew" v-show="tab">
        <ul class="reivew-menu">
          <li class="reivew-item">
            <div class="user">
              <img src="./../common/1.jpg">
              <div class="pet">
                <p>12132</p>
                <time>2019-11-11</time>
              </div>
            </div>
            <div class="reivew-content">
            </div>
          </li>
        </ul>
        <div class="input-btn">
          <input type="text" placeholder="我有话要说~">
          <button>发表</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import { GetCoursewareByID } from '@/api/index'
import $ from 'jquery'
import moment from 'moment'
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
      errorText: '直播尚未开始'
    }
  },
  created () {
    this.coursewareID = this.$route.query.CoursewareID
    this._GetCoursewareByID()
  },
  methods: {
    // 切换选项卡
    tabClick (index) {
      this.tab = index
    },
    async _GetCoursewareByID () {
      let result = await GetCoursewareByID({
        coursewareID: this.coursewareID,
        type: 0
      })
      if (result.Code === 200) {
        this.LiveUrl = result.Data.LiveUrl
        let time = new Date().getTime()
        let start = Number(result.Data.cw.StartDate.substring(6, result.Data.cw.StartDate.length - 2))
        if (start > time) {
          console.log('直播未开始')
          this.prepare = true
          this.isAlready = false
        } else {
          this.errorText = '主播正在准备中...'
          console.log('直播开始')
          this.prepare = false
          this.isAlready = true
          this.initVideo()
        }
        // console.log(time, start)
      }
      
    },
    // 初始化播放器
    initVideo () {
      this.player = new Aliplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '100%',
        autoplay: false,
        isLive:true,//是不是直播
        source: this.LiveUrl,
        useH5Prism: true
      }, function (player) {
        //播放器创建好了
        
      });
      this.prepare = false
      this.isAlready = true
      this.player.on("canplay", () => {
          console.log('直播正在进行');
          this.prepare = false
          this.isAlready = true
      });
      this.player.on("playing", () => {
          console.log('直播正在进行');
          this.prepare = false
          this.isAlready = true
      });
      this.player.on("error", function () {
          console.log('直播失败');
          // if(!isLiveEnd){
          //     $('#J_prismPlayer').remove();
          //     $("#ww_videoPlay").empty();
          //     $("#ww_videoPlay").append("<img src='../../images/product/NotStarted.png'/>")
          // }
      });
      this.player.on("liveStreamStop", () => {   //直播流中断
          console.log('直播中断');
          this.isAlready = false
          this.prepare = true
          // isLiveEnd = true;
          // $('#J_prismPlayer').remove();
          // $("#ww_videoPlay").empty();
          // $("#ww_videoPlay").append("<img id='imgDom' src='../../images/product/LiveError.png'/>")
          // $("#ww_videoPlay").on('click',function () {
          //     location.reload(true);
          // });
      });
      this.player.on("onM3u8Retry", () => {   //直播流中断
          console.log('直播中断恢复');
          this.isAlready = false
          this.prepare = true
      });
      this.player.on("ended", function () {
          console.log('直播结束');
          // $("#ww_videoPlay").empty();
          // $('#J_prismPlayer').remove();
          // $("#ww_videoPlay").append("<img src='../../images/product/HasEnded.png'/>")
      });
    }

  },
  components: {
    HeaderBox
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
    background-color: #000;
    .error {
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1.2rem;
      font-size: .26rem;
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
      .reivew-menu {
        height: calc(~"100% - .8rem");
      }
      .reivew-item {
        padding-bottom: .3rem;
        border-bottom: 1px solid #979797;
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
          font-size: .3rem;
        }
      } 
    }
  }
}
  
</style>