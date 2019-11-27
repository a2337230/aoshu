<template>
  <div class="aishu-live">
     <!-- 头部 -->
    <header-box></header-box>
    <ul class="aishu-list">
      <li @click="goLive(item)" v-for="item in liveMenu" :key="item.ADID">
        <img :src="'https://img.xlxt.net' + item.ImgUrl">
        <div class="live-status">
          <p :class="item | classFormat">{{item.Sort| statusFormat}}</p>
        </div>
        <div class="title-box">
          <h3>{{item.Name}}</h3>
          <p>{{item.ADUrl | startFormat}} - {{item.ADUrl | endFormat}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import moment from 'moment'
import { Toast, MessageBox } from 'mint-ui';
import { GetLive, GetMemberInfo } from '@/api/index'
export default {
  name: 'aishulive',
  data () {
    return {
      liveMenu: [],
      isLogin: ''
    }
  },
  created () {
    this.getLive()
    this._GetMemberInfo()
  },
  methods: {
    // 判断是否登录
    async _GetMemberInfo () {
      let result = await GetMemberInfo()
      console.log(result)
      if (result.Code === 401) {
        this.isLogin = false
      } else {
        this.isLogin = result.Data
      }
    },
    goLive (val) {
      // 0 敬请期待 1 正在直播 2 观看录播
      if (!val.Sort || val.Sort == 4) {
        Toast('直播尚未开始')
        return
      } 
      // 如果没有登录
      if (!this.isLogin) {
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
        return 
      }
      let id = Number(val.ADUrl.split(',')[2].split(':')[1])
      let CoursewareID = Number(val.ADUrl.split(',')[3].split(':')[1])
      let ua = navigator.userAgent.toLowerCase();
      let ios = ua.indexOf("native_app_ios") > -1
      let android = ua.indexOf("glaer-android") > -1
      let iosWk = ua.indexOf("native_app_ios_wk") > -1
      if (this.iosWk) {
        if (val.Sort == 1) {
          window.webkit.messageHandlers.goLiveViewPage.postMessage(String(id), String(CoursewareID))
        } else if (val.Sort == 2) {
          window.webkit.messageHandlers.goCourseDetailsPage.postMessage(String(id))
        }
      } else if (ios) {
        if (val.Sort == 1) {
          window.goLiveViewPage(String(id), String(CoursewareID)) 
        } else if (val.Sort == 2) {
          window.goCourseDetailsPage(String(id)) 
        }
      } else if (android) {
        if (val.Sort == 1) {
          window.android.goLiveViewPage(String(id), String(CoursewareID))
        } else if (val.Sort == 2) {
          window.android.goCourseDetailsPage(String(id))
        }
      } else {
        if (val.Sort == 1) {
          this.$router.push({
            name: '直播页',
            query: {
              id: id,
              CoursewareID: CoursewareID
            }
          })
        } else if (val.Sort == 2) {
          this.$router.push({
            name: '课程播放页',
            query: {
              id: id,
              CoursewareID: CoursewareID
            }
          })
        }
      } 
      
    },
    // 获取直播列表
    async getLive () {
      let result = await GetLive({
        positionCode: 'AI_SHU_LIVE'
      })
      this.liveMenu = result.Data.sort((n1,n2) => {
        return n2.ADID - n1.ADID
      })
      console.log(result)
    },
    // 判断直播状态
    statusLive (val1, val2) {
      console.log(val)
    }
  },
  filters: {
    startFormat (val) {
      // let date = val
      let time = val.split(',')[0].split(':')[1]
      return moment(Number(time)).format('YYYY.MM.DD HH:mm')
    },
    endFormat (val) {
      let time = val.split(',')[1].split(':')[1]
      return moment(Number(time)).format('YYYY.MM.DD HH:mm')
    },
    statusFormat (val) {
      // 0 敬请期待 1 正在直播 2 观看录播
      let title = ''
      if (!val) {
        title = '敬请期待'
      } else if (val == 1) {
        title = '正在直播'
      } else if (val == 2) {
        title = '观看录播'
      }
      return title
    },
    classFormat (val) {
      let color = ''
      if (!val.Sort) {
        color = 'yellow'
      } else if (val.Sort == 1) {
        let start = Number(val.ADUrl.split(',')[0].split(':')[1])
        let time = new Date().getTime()
        if (time < start) {
          color = 'noColor'
          val.Sort = 4
        } else {
          color = 'red'
        }
      } else {
        color = 'green'
      }
      return color
    }
  },
  components: {
    HeaderBox
  }
}
</script>
<style lang="less" scoped>
.aishu-list {
  padding: .3rem;
  li {
    width: 6.9rem;
    height: 3.87rem;
    border-radius: .2rem;
    position: relative;
    overflow: hidden;
    margin-bottom: .3rem;
    &:last-child {
      margin-bottom: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .live-status {
      position: absolute;
      right: 0;
      top: 0;
      width: 1.67rem;
      height: .51rem;
      border-radius:0 0 0 .2rem;
      // background-color: #000;
      color: #fff;
      text-align: center;
      overflow: hidden;
      p {
        font-size: .3rem;
        line-height: .51rem;
        font-weight: lighter;
      }
    }
    .title-box {
      position: absolute;
      bottom: 0;
      width: 6.9rem;
      height: 1.25rem;
      background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%);
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0 .23rem;
      h3 {
        font-size: .3rem;
        line-height: .42rem;
      }
      p {
        font-size: .24rem;
        line-height: .32rem;
        padding-bottom: .1rem;
        font-weight: lighter;
      }
    }
  }
}
.yellow {
  background-color: #FA8C15;
}
.red {
  background-color: #FF0000;
}
.green {
  background-color: #01442C;
}
.noColor {
  display: none;
}
</style>