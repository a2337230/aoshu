<template>
  <div class="live-tv">
    <header-box></header-box>
    <!-- banner -->
    <div class="banner">
      <img :src="'https://img.xlxt.net/' + liveInfo.Img" alt="">
    </div>
    <!-- tab选项卡 -->
    <tabs @cuttentTabs="cuttentTabs"></tabs>
    <tab-item :data="liveInfo" :chapterList="chapterList" :type="type"></tab-item>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import Tabs from '@/components/Tabs'
import TabItem from '@/components/TabItem'
import { GetCourseByIDShow, GetChapterCoursewareShow } from '@/api/index'
export default {
  name: 'livetv',
  data () {
    return {
      liveInfo: '',
      chapterList: [],
      type: 0,
      id: 0
    }
  },
  created () {
    this.id = this.$route.query.id
    this._GetCourseByIDShow()
    this._GetChapterCoursewareShow()
  },
  methods: {
    // 获取直播详情
    async _GetCourseByIDShow () {
      let result = await GetCourseByIDShow({
        courseID: this.id
      })
      if (result.Code === 200) {
        this.liveInfo = result.Data.c
      }
    },
    // 获取课程目录
    async _GetChapterCoursewareShow () {
      let result = await GetChapterCoursewareShow({
        courseID: this.id
      })
      if (result.Code === 200) {
        this.chapterList = result.Data.List
      }
    },
    cuttentTabs (index) {
      this.type = index
    }
  },
  components: {
    HeaderBox,
    Tabs,
    TabItem
  }
}
</script>
<style lang="less" scoped>
.live-tv {
  width: 100vw;
  .banner {
    padding: .32rem .3rem;
    width: 6.9rem;
    height: 3.88rem;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      border-radius: .2rem;
    }
  }
}
</style>