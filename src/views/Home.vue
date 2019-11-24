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
        <div class="go-live">
          <img :src="ring">
        </div>
        <h2 class="home-title">资讯专区</h2>
        <div class="arcitle-container">
          <arcitle-menu :arcitle="arcitle"></arcitle-menu>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import Swiper from '@/components/Swiper'
import { GetArticleShow } from '@/api/index'
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
        },
        {
          img: require('./../common/3.jpg')
        }
      ],
      // 跳转擂台图片
      ring: require('./../common/ad1.png'),
      // 文章
      arcitle: []
    }
  },
  created () {
    this.getArcitle()
  },
  methods: {
    // 点击四大专区卡片跳转
    goCard (val) {
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
      console.log(result)
    }
  },
  components: {
    HeaderBox,
    Swiper,
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
    background-color: red;
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