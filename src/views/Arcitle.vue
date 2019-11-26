<template>
  <div class="arcitle">
    <!-- 头部 -->
    <header-box></header-box>
    <scroll class="scroll-arcitle arcitle-content" :data="arcitleInfo"  v-if="arcitleInfo">
      <div v-if="!arcitleInfo">
      </div>
      <div class="arcitle-container" @click="isInputBlur">
        <div class="banner">
          <img :src="'https://img.xlxt.net/' + arcitleInfo.PreviewUrl" alt="">
          <!-- <div class="go-back">
            <img src="./../common/back.png" alt="">
          </div> -->
        </div>
        <div class="content">
          <!-- 文章标题 -->
          <h1>{{arcitleInfo.Title}}</h1>
          <p class="content-nav">
            <span>{{arcitleInfo.Source ? arcitleInfo.Source: '杏林学堂'}}</span>
            <span>浏览量： {{arcitleInfo.Hits}}</span>
            <span>时间：{{arcitleInfo.AddTime | timeFormat}}</span>
          </p>
          <!-- 文章内容 -->
          <p v-html="arcitleInfo.Content"></p>
          <!-- 评论区 -->
          <ul class="review" v-if="review">
            <li v-for="item in review" :key="item.ArticleCommentID">
              <!-- 评论头部区域 -->
              <div class="review-header">
                <!-- 头部 -->
                <div class="avatar">
                  <img :src="'https://img.xlxt.net/' + item.HeadImg" alt="">
                </div>
                <!-- 名字时间 -->
                <div class="name">
                  <p>{{item.Name}}</p>
                  <time>{{item.AddTime | reivewFormat}}</time>
                </div>
                <!-- 点赞 -->
                <div class="like" @click="isLike(item)">
                  <p>{{item.LikeNum}}</p>
                  <div class="zan">
                    <img :src="item.IsLike ? yesLike : noLike" alt="">
                  </div>
                </div>
              </div>
              <div class="review-des">
                {{item.Content}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <!-- 底部评论 -->
    <div class="footer-reivew">
      <input type="text" class="isInput" placeholder="发表您的评论..." v-model="reviewContent" @keyup.enter="submitReview" @focus="isLoginFocus" @blur="iosBlur">
      <div class="zhuan" @click="transmit">
        <div class="share-icon"
            v-clipboard:copy="isHref" 
            v-clipboard:success="copy" 
            v-clipboard:error="onError"
            v-if="isH5"
          >
          <img src="./../common/zf.png">
        </div>
        <img src="./../common/zf.png" v-else>
      </div>
    </div>
    <share @closeShare="closeShare" v-if="isShare"></share>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
import {ArticleInfo1,ArticleInfo2,GetReviewFront,AddReview,AddReviewLike} from '@/api/index'
import { Toast, MessageBox } from 'mint-ui'
import moment from 'moment'
import util from '@/util/util.js'
import '@/common/js/mTween.js'
export default {
  name: 'arcitle',
  data () {
    return {
      // 文章banner
      banner: require('./../common/arcitle1.gif'),
      content: `我家的后面有一个很大的园，相传叫作百草园。现在是早已并屋子一起卖给朱文公的子孙了，连那最末次的相见也已经隔了七八年，其中似乎确凿只有一些野草；但那时却是我的乐园。 不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑椹；也不必说鸣蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子（云雀）忽然从草间直窜向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱，蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它的脊梁，便会拍的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有莲房一般的果实，何首乌有拥肿的根。有人说，何首乌根是有象人形的，吃了便可以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来没有见过有一块根象人样。如果不怕刺，还可以摘到覆盆子，象小珊瑚珠攒成的小球，又酸又甜，色味都比桑椹要好得远。 长的草里是不去的，因为相传这园里有一条很大的赤练蛇。 长妈妈曾经讲给我一个故事听：先前，有一个读书人住在古庙里用功，晚间，在院子里纳凉的时候，突然听到有人在叫他。答应着，四面看时，却见一个美女的脸露在墙头上，向他一笑，隐去了。他很高兴；但竟给那走来夜谈的老和尚识破了机关。说他脸上有些妖气，一定遇见“美女蛇”了；这是人首蛇身的怪物，能唤人名，倘一答应，夜间便要来吃这人的肉的。他自然吓得要死，而那老和尚却道无妨，给他一个小盒子，说只要放在枕边，便可高枕而卧。他虽然照样办，却总是睡不着，——当然睡不着的。到半夜，果然来了，沙沙沙！门外象是风雨声。他正抖作一团时，却听得豁的一声，一道金光从枕边飞出，外面便什么声音也没有了，那金光也就飞回来，敛在盒子里。后来呢？后来，老和尚说，这是飞蜈蚣，它能吸蛇的脑髓，美女蛇就被它治死了。 结末的教训是：所以倘有陌生的声音叫你的名字，你万不可答应他。 这故事很使我觉得做人之险，夏夜乘凉，往往有些担心，不敢去看墙上，而且极想得到一盒老和尚那样的飞蜈蚣。走到百草园的草丛旁边时，也常常这样想。但直到现在，总还没有得到，但也没有遇见过赤练蛇和美女蛇。叫我名字的陌生声音自然是常有的，然而都不是美女蛇。 冬天的百草园比较的无味；雪一下，可就两样了。拍雪人（将自己的全形印在雪上）和塑雪罗汉需要人们鉴赏，这是荒园，人迹罕至，所以不相宜，只好来捕鸟。薄薄的雪，是不行的；总须积雪盖了地面一两天，鸟雀们久已无处觅食的时候才好。扫开一块雪，露出地面，用一支短棒支起一面大的竹筛来，下面撒些秕谷，棒上系一条长绳，人远远地牵着，看鸟雀下来啄食，走到竹筛底下的时候，将绳子一拉，便罩住了。但所得的是麻雀居多，也有白颊的“张飞鸟”，性子很躁，养不过夜的。 `,
      id: '',
      user: '',
      arcitleInfo: '',
      pagesize: 15,
      pageindex: 1,
      review: '',
      reviewContent: '',
      isH5: false,
      // 复制链接地址
      isHref: '',
      // 点赞图标
      yesLike: require('./../common/yeszan.png'),
      noLike: require('./../common/nozan.png'),
      isShare: false
    }
  },
  created () {
    // 判断环境显示转发按钮
    var ua = navigator.userAgent.toLowerCase();
    let ios = ua.indexOf("native_app_ios") > -1
    let android = ua.indexOf("glaer-android") > -1
    let iosWk = ua.indexOf("native_app_ios_wk") > -1
    if (ios || android|| iosWk) {
      this.isH5 = false
    } else {
      this.isH5 = true
    }
    this.id = this.$route.query.id
    this.user = util.getCookie('UserID') ? util.getCookie('UserID'): util.getCookie('u')
    if (this.user) {
      this._ArticleInfo1()
      this._GetReviewFront()
    } else {
      this._ArticleInfo2()
    }
  },
  mounted () {
    this.isHref = window.location.href
  },
  methods: {
    // 兼容ios
    iosBlur () {
      var u = navigator.userAgent, app = navigator.appVersion
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        window.scrollTo(0,0)
      }
    },
    // 点击其他区域失去焦点
    isInputBlur () {
      document.querySelector('.isInput').blur()
    },
    // 不需要登录接口
    async _ArticleInfo2 () {
      let result = await ArticleInfo2({
        articleid: this.id
      })
      if (result.Code === 200) {
        this.arcitleInfo = result.Data
      }
    },
    // 需要登录的接口
    async _ArticleInfo1 () {
      let result = await ArticleInfo1({
        articleid: this.id
      })
      if (result.Code === 200) {
        this.arcitleInfo = result.Data
      }
    },
    // 获取评论
    async _GetReviewFront () {
      let result = await GetReviewFront({
        articleID: this.id,
        pagesize: this.pagesize,
        pageindex: this.pageindex
      })
      if (result.Code === 200) {
        this.review = result.Data
      }
    },
    // 发表评论前验证登录
    isLoginFocus () {
      if (!this.user) {
        this.reviewContent = ''
        this.bulr()
        MessageBox({
          title: '提示',
          message: '登录后可以评论',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: '登录'
        }).then(action => {
          if (action === 'confirm') {
            window.location.href = 'https://sso.xlxt.net/applogin/login.html?ReturnUrl=' + this.isHref
          }
        }) 
        return 
      }
      var u = navigator.userAgent, app = navigator.appVersion
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      // alert(isiOS)
      if (isiOS) {
        window.scrollTo(0,0)
      }
    },
    // 发表评论
    async submitReview () {
      // 如果没有输入
      if (!this.reviewContent) {
        Toast('请输入评价内容')
        this.bulr()
        return
      }
      let result = await AddReview({
         content: this.reviewContent,
        articleID: this.id
      })
      this.reviewContent = ''
      this.bulr()
      this._GetReviewFront()
    },
    // 评论点赞
    async isLike (val) {
      console.log(val)
      let like = val.IsLike ? 0: 1
      let result = await AddReviewLike({
        like: like,
        articleID: this.id,
        ArticleCommentID: val.ArticleCommentID
      })
      if (result.Code === 200) {
        this._GetReviewFront()
      }
    },
    bulr () {
      let input = document.querySelector('.isInput')
      input.blur()
    },
    // 转发
    transmit () {
      if (!this.isH5) {
        this.isShare = true
      }
    },
    copy (e) {
      Toast('链接复制成功,快去粘贴吧')
    },
    onError (e) {
      Toast('复制失败')
    },
    closeShare () {
      this.isShare = false
    }
  },
  watch: {
    arcitleInfo () {
      // 兼容ios
      var u = navigator.userAgent, app = navigator.appVersion
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        this.$nextTick(() => {
          let header = document.querySelector('.header')
          let content = document.querySelector('.arcitle-content')
          let footer = document.querySelector('.footer-reivew')
          // 可是区高度
          let domHeight = window.innerHeight
          // 头部高度
          let headerHeight = header.clientHeight
          // 底部高度
          let footerHeight = footer.clientHeight
          document.documentElement.style.height = domHeight + 'px'
          content.style.height = domHeight - headerHeight - footerHeight + 'px'
          console.log(content)
          // alert(window.innerHeight,document.d)
        })
      }
    }
  },
  filters: {
    timeFormat (val) {
      let time = val.substring(6, val.length - 2)
      return moment(val).format('YYYY.MM.DD')
    },
    reivewFormat (val) {
      return moment(val).format('YYYY-MM-DD')
    }
  },
  components: {
    HeaderBox,
    Scroll: () => import('@/components/Scroll'),
    Share: () => import('@/components/Share')
  }
}
</script>
<style lang="less" scoped>
.arcitle {
  background-color: #fff;
  height: 100vh;
  .scroll-arcitle {
    height: calc(~"100vh - 1.86rem");
    overflow: hidden;
  }
  .banner {
    width: 100vw;
    height: 5.3rem;
    overflow: hidden;
    position: relative;
    margin-bottom: .36rem;
    img {
      width: 100%;
      height: 100%;
    }
    .go-back {
      position: absolute;
      left: 0;
      top: 0;
      width: .88rem;
      height: .88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: .21rem;
        height: .4rem;
      }
    }
  }
  .content {
    padding: 0 .3rem 1rem;
    h1 {
      color: #333;
      font-size: .5rem;
      line-height: .7rem;
    }
    .content-nav {
      font-size: .26rem;
      line-height: .36rem;
      color: #848484;
      margin-bottom: .2rem;
      span {
        margin-right: .4rem;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .review {
    padding-top: .68rem;
    li {
      padding: .3rem .27rem;
      border-bottom: 1px solid #979797;
      &:last-child {
        border: 0;
      }
      .review-header {
        display: flex;
        position: relative;
        // align-items: flex-start;
        .avatar {
          width: .8rem;
          height: .8rem;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin-left: .24rem;
          p {
            font-size: .3rem;
            line-height: .42rem;
            color: #363636;
            position: relative;
            top: .1rem;
          }
          time {
            font-size: .24rem;
            line-height: .32rem;
            color: #999;
          }
        }
        .like {
          position: absolute;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          p {
            font-size: .26rem;
            // line-height: .36rem;
            color: #006B45;
            margin-right: .11rem;
            vertical-align: bottom;
            position: relative;
            top: .1rem;
          }
          img {
            width: .29rem;
            height: .38rem;
          }
        }
      }
      .review-des {
        padding: .3rem 0 0;
      }
    }
  }
  .footer-reivew {
    height: .98rem;
    width: 100vw;
    background-color: #F9F9F9;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .3rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    input {
      width: 5.72rem;
      height: .68rem;
      outline: none;
      padding: 0;
      border: 0;
      background-color: #fff;
      border-radius: .34rem;
      box-sizing: border-box;
      padding-left: .4rem;
      font-size: .3rem;
    }
    input::-webkit-input-placeholder {
      font-size: .3rem;
      color: #848484;
    }
    .zhuan {
      width: .98rem;
      height: .98rem;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: .48rem;
        height: .46rem;
      }
    }
  }
}
</style>