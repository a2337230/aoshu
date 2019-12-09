<template>
  <div class="aishu-live">
     <!-- 头部 -->
    <header-box></header-box>
    <ul class="aishu-list" v-if="liveMenu.length">
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
    <!-- 暂无直播 -->
    <div v-else class="noMore">
      <p>{{noMoreText}}</p>
    </div>
    <!-- <verify-box v-if="isVerify" @closeDialog="closeDialog"></verify-box> -->
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
// import VerifyBox from '@/components/VerifyBox'
import moment from 'moment'
import { Toast, MessageBox } from 'mint-ui';
import { GetLive, GetMemberInfo, CheckAppUserJoinEnterprise } from '@/api/index'
export default {
  name: 'aishulive',
  data () {
    return {
      liveMenu: [],
      isLogin: '',
      isVerify: false,
      noMoreText: '暂无直播，敬请期待'
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
      if (result.Code === 401) {
        this.isLogin = false
      } else {
        this.isLogin = result.Data
      }
    },
    async goLive (val) {
      // 0 敬请期待 1 正在直播 2 观看录播
      if (!val.Sort) {
        Toast('敬请期待')
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
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + window.location.href
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
        if (val.Sort == 1 || val.Sort == 4) {
          window.webkit.messageHandlers.goLiveViewPage.postMessage(String(id), String(CoursewareID))
        } else if (val.Sort == 2) {
          this.$router.push({
            name: '课程播放页',
            query: {
              id: id,
              CoursewareID: CoursewareID
            }
          })
        }
      } else if (ios) {
        if (val.Sort == 1) {
          window.goLiveViewPage(String(id), String(CoursewareID)) 
        } else if (val.Sort == 2) {
          this.$router.push({
            name: '课程播放页',
            query: {
              id: id,
              CoursewareID: CoursewareID
            }
          })
        }
      } else if (android) {
        if (val.Sort == 1) {
          window.android.goLiveViewPage(String(id), String(CoursewareID))
        } else if (val.Sort == 2) {
          this.$router.push({
            name: '课程播放页',
            query: {
              id: id,
              CoursewareID: CoursewareID
            }
          })
        }
      } else {
        if (val.Sort == 1 || val.Sort == 4) {
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
      if (!result.Data.length) {
        this.noMoreText = '暂无直播，敬请期待'
        return
      }
      let data = []
      let formatData = []
      data = result.Data.sort((n1,n2) => {
        return Number(n2.ADUrl.split(',')[0].split(':')[1]) - Number(n1.ADUrl.split(',')[1].split(':')[1]) 
      })
      data.forEach(item => {
        if (item.Sort == 1) {
          let start = Number(item.ADUrl.split(',')[0].split(':')[1])
          let time = new Date().getTime()
          if (start > time) {
            item.Sort = 4
          }
        }
      })
      // 正在直播
      let sort1 = data.filter(item => item.Sort == 1)
      // 准备直播
      let sort4 = data.filter(item => item.Sort == 4)
      // 观看录播
      let sort2 = data.filter(item => item.Sort == 2)
      // 敬请期待
      let sort0 = data.filter(item => item.Sort == 0)
      formatData = formatData.concat(sort1).concat(sort4).concat(sort2).concat(sort0)
      this.liveMenu = formatData
    },
    closeDialog () {
      this.isVerify = false
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
      } else if (val == 4) {
        title = '准备直播'
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
      } else if (val.Sort == 4) {
        color = 'start'
      } else {
        color = 'green'
      }
      return color
    }
  },
  components: {
    HeaderBox,
    // VerifyBox
  }
}
</script>
<style lang="less" scoped>
.aishu-list {
  padding: .3rem;
  box-sizing: border-box;
  height: calc(~"100vh - .88rem");
  overflow-y: scroll;
  &::-webkit-scrollbar {display:none}
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
      box-sizing: border-box;
      h3 {
        width: 100%;
        font-size: .3rem;
        line-height: .42rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
.start {
  display: none;
  background-color: #1e90ff;
}
.noMore {
  display: flex;
  justify-content: center;
  color: #999;
  font-size: .3rem;
  padding-top: 2rem;
}
</style>