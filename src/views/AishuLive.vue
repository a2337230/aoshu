<template>
  <div class="aishu-live">
     <!-- 头部 -->
    <header-box></header-box>
    <ul class="aishu-list">
      <li @click="goLive(item)" v-for="item in liveMenu" :key="item.ADID">
        <img :src="'https://img.xlxt.net' + item.ImgUrl">
        <div class="live-status">
          <p>{{item.Sort| statusFormat}}</p>
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
import { Toast } from 'mint-ui';
import { GetLive } from '@/api/index'
export default {
  name: 'aishulive',
  data () {
    return {
      liveMenu: []
    }
  },
  created () {
    this.getLive()
  },
  methods: {
    goLive (val) {
      // 0 敬请期待 1 正在直播 2 观看录播
      let id = Number(val.ADUrl.split(',')[2].split(':')[1])
      let CoursewareID = Number(val.ADUrl.split(',')[3].split(':')[1])
      if (!val.Sort) {
        Toast('直播尚未开始')
      } else if (val.Sort == 1) {
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
      background-color: #000;
      color: #fff;
      text-align: center;
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
</style>