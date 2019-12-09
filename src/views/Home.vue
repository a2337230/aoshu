<template>
  <div class="home">
    <!-- 头部 -->
    <header-box></header-box>
    <!-- 内容区域 -->
    <scroll class="home-container">
      <div class="home-box">
        <!-- 轮播图 -->
        <div class="banner">
          <swiper :imgs="banner"></swiper>
        </div>
        <h2 class="home-title">直播专区</h2>
        <!-- 四大专区 -->
        <ul class="home-card">
          <li v-for="item in card" :key="item.name" @click="goCard(item)">
            <img :src="item.img">
          </li>
        </ul>
        <!-- 直播图片入口 -->
        <div class="go-live" @click="goRing">
          <img :src="ring">
        </div>
        <h2 class="home-title">资讯专区</h2>
        <div class="arcitle-container">
          <arcitle-menu :arcitle="arcitle" :isLogin="isLogin"></arcitle-menu>
        </div>
      </div>
    </scroll>
    <verify-box v-if="isVerify" @closeDialog="closeDialog"></verify-box>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import Swiper from '@/components/Swiper'
import { GetArticleShow, GetLive, GetMemberInfo, CheckAppUserJoinEnterprise } from '@/api/index'
import { MessageBox, Toast } from 'mint-ui'
// 企业认证
import VerifyBox from '@/components/VerifyBox'
import util from '@/util/util.js'
export default {
  name: 'home',
  data() {
    return {
      // 卡片跳转配置
      card: [
        {
          name: '杨森艾舒专区',
          img: require('./../common/banner1.png'),
          path: '/aishulive'
        },
        {
          name: '达克宁家族',
          img: require('./../common/banner2.png'),
          path: ''
        },
        {
          name: '抗过敏家族',
          img: require('./../common/banner3.png'),
          path: ''
        },
        {
          name: '儿童退热家族',
          img: require('./../common/banner4.png'),
          path: ''
        }
      ],
      // 轮播图
      banner: [
        {
          img: require('./../common/1.jpg')
        },
        {
          img: require('./../common/2.jpg')
        }
      ],
      // 跳转擂台图片
      ring: '',
      ringID: '',
      ringUrl: '',
      // 文章
      arcitle: [],
      isLogin: '',
      // 是否验证
      isVerify: false,
      isRule: false
    }
  },
  created () {
    this.rule()
    this._GetMemberInfo()
    this.getRing()
    this.getArcitle()
    // this._CheckAppUserJoinEnterprise()
  },
  methods: {
    // 判断是否登录
    async _GetMemberInfo () {
      let user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
      if (user) {
        this.isLogin = true
      } else {
        let result = await GetMemberInfo()
        if (result.Code === 401) {
          this.isLogin = false
        } else {
          this.isLogin = result.Data
        }
      }
    },
    // 验证是否验证过企业
    async rule () {
      let result = await CheckAppUserJoinEnterprise({type: 0})
      if (result.Code == 200) {
        if (!result.Data) {
          // 是个人没有绑定过企业
          this.isRule = true
          return
        } 
      }
    },
    // 获取擂台
    async getRing () {
      let result = await GetLive({
        positionCode: 'AI_SHU_RING'
      })
      if (result.Code === 200) {
        this.ring = 'https://img.xlxt.net' + result.Data[0].ImgUrl
        this.ringID = result.Data[0].Sort
        this.ringUrl =  result.Data[0].ADUrl
      }
    },
    // 跳转知识擂台
    async goRing () {
      console.log(this.ringUrl)
      if (this.ringUrl == 0) {
        Toast({
          message: '敬请期待',
        })
        return
      }
      // 如果没有登录
      if (!this.isLogin) {
        MessageBox({
          title: '提示',
          message: '登录后可以进入擂台',
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
      // 查询是否绑定企业
      if (this.isRule) {
        this.isVerify = true
        return
      }
      // let result = await CheckAppUserJoinEnterprise({type: 0})
      // if (result.Code == 200) {
      //   if (!result.Data) {
      //     // 是个人没有绑定过企业
      //     this.isVerify = true
      //     return
      //   } 
      // }
      let ua = navigator.userAgent.toLowerCase();
      let android = ua.indexOf("glaer-android") > -1
      if (android) {
        window.android.goPlacementMatchesPage(this.ringID)
      } else {
        window.location.href = `https://m.xlxt.net/examIndex.html#/arena/${this.ringID}/base=aishu`
      }
    },
    // 点击四大专区卡片跳转
    async goCard (val) {
      if (val.name !== "杨森艾舒专区") {
        return
      }
      // 如果没有登录
      if (!this.isLogin) {
        MessageBox({
          title: '提示',
          message: '登录后可以进入直播',
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
      // 查询是否绑定企业
      if (this.isRule) {
        this.isVerify = true
        return
      }
      // let result = await CheckAppUserJoinEnterprise({type: 0})
      // if (result.Code == 200) {
      //   if (!result.Data) {
      //     // 是个人没有绑定过企业
      //     this.isVerify = true
      //     return
      //   } 
      // }
      if (val.path) {
        this.$router.push(val.path)
      }
    },
    // 文章列表
    async getArcitle () {
      let result = await GetArticleShow()
      if (result.Code === 200) {
        this.arcitle = result.Data
      }
    },
    closeDialog () {
      this.isVerify = false
    }
  },
  components: {
    HeaderBox,
    Swiper,
    VerifyBox,
    ArcitleMenu: () => import('@/components/ArcitleMenu'),
    Scroll: () => import('@/components/Scroll')
  }
}
</script>
<style lang="less" scoped>
.home-container {
  padding: 0 .3rem;
  height: calc(~"100vh - .88rem");
  overflow: hidden;
  box-sizing: border-box;
  .home-box {
    padding: .3rem 0;
  }
  .banner {
    width: 6.9rem;
    height: 2.6rem;
    border-radius: .2rem;
    overflow: hidden;
    margin-bottom: .45rem;
    img {
      width: 100%;
    }
  }
  .home-card {
    width: 100%;
    padding: .24rem 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 3.3rem;
      height: 1.6rem;
      margin-bottom: .3rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .go-live {
    height: 1.1rem;
    padding: .19rem 0;
    margin-bottom: .3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .arcitle-container {
    padding-top: .28rem;
  }
}
// 标题
.home-title {
  font-size: .36rem;
  line-height: .5rem;
  font-weight: bold;
}
</style>