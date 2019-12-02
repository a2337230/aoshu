<template>
  <div class="arcitle">
    <!-- 头部 -->
    <header-box></header-box>
    <scroll class="scroll-arcitle arcitle-content" ref="scroll" :data="arcitleInfo || review" v-if="arcitleInfo" :pullup="pullup" @scrollToEnd="scrollToEnd">
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
      <input type="url" class="isInput" placeholder="发表您的评论..." maxlength='500' v-model="reviewContent" @keyup.enter="submitReview" @focus="isLoginFocus" @blur="iosBlur">
      <div class="zhuan" @click="transmit" v-show="!upspring">
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
      <span class="btn" v-show="upspring" @click="submitReview">发送</span>
    </div>
    <share @closeShare="closeShare" v-if="isShare" :data="arcitleInfo"></share>
    <verify-box v-if="isVerify" @closeDialog="closeDialog"></verify-box>
  </div>
</template>
<script>
import HeaderBox from '@/components/HeaderBox'
// 企业认证
import VerifyBox from '@/components/VerifyBox'
import {ArticleInfo1,ArticleInfo2,GetReviewFront,AddReview,AddReviewLike,CheckAppUserJoinEnterprise} from '@/api/index'
import { Toast, MessageBox } from 'mint-ui'
import moment from 'moment'
import util from '@/util/util.js'
import $ from 'jquery'
import '@/common/js/mTween.js'
export default {
  name: 'arcitle',
  data () {
    return {
      // 文章banner
      banner: require('./../common/arcitle1.gif'),
      id: '',
      user: '',
      arcitleInfo: '',
      pagesize: 15,
      pageindex: 1,
      review: '',
      reviewContent: '',
      reviewContent1: '',
      isH5: false,
      // 复制链接地址
      isHref: '',
      // 点赞图标
      yesLike: require('./../common/yeszan.png'),
      noLike: require('./../common/nozan.png'),
      isShare: false,
      // 是否验证
      isVerify: false,
      // 键盘是否弹起
      upspring: false,
      // 验证是否显示绑定企业
      isRule: false,
      pullup: false
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
    // this.user = '1111'
    this.rule()
    if (this.user) {
      this._ArticleInfo1()
      this._GetReviewFront()
    } else {
      this._ArticleInfo2()
    }
  },
  mounted () {
    this.isHref = window.location.href
    // 键盘弹起处理
    let u = navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isIOS) {
      document.body.addEventListener('focusin', () => {  //软键盘弹起事件
      })
      document.body.addEventListener('focusout', () => { //软键盘关闭事件
        let input = document.querySelector('.isInput')
        input.blur()
      })
    }
  },
  methods: {
    scrollToEnd () {
      if (this.pullup) {
        this.pagesize+=15
        this._GetReviewFront()
      }
    },
    // 验证是否绑定企业
    async rule () {
      let result1 = await CheckAppUserJoinEnterprise({type: 0})
      if (result1.Code == 200) {
        if (!result1.Data) {
          // 是个人没有绑定过企业
          this.isRule = true
          return
        } 
      }
    },
    // 兼容ios
    iosBlur () {
      setTimeout (() => {
        this.upspring = false
      }, 200) 
      var u = navigator.userAgent, app = navigator.appVersion
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        document.body.scrollTop = 0;
        setTimeout(() => {
          window.scrollTo(0,0)
        }, 100);
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
        if (this.pagesize * this.pageindex <= result.Count) {
          this.pullup = true
        } else {
          this.pullup = false
        }
      }
    },
    // 发表评论前验证登录
    async isLoginFocus () {
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
            window.location.href = 'https://sso2.xlxt.net/applogin/login.html?ReturnUrl=' + this.isHref
          }
        }) 
        return 
      }
      // 查询是否绑定企业
      if (this.isRule) {
        this.isVerify = true
      }
      // 聚焦显示 发送
      this.upspring = true
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
      Toast({
        message: '评论成功',
        iconClass: 'iconfont icon-xiaolianchenggong'
      })
      this.reviewContent = this.reviewContent1 = ''
      this.bulr()
      this._GetReviewFront()
      this.arcitleInfo = JSON.parse(JSON.stringify(this.arcitleInfo))
      setTimeout(() => {
        let dom = document.querySelector('.review')
        console.log(this.$refs.scroll.scrollToElement(dom, 300))
      }, 200)
      
    },
    // 评论点赞
    async isLike (val) {
      // 判断绑定企业
      if (this.isRule) {
        this.isVerify = true
        return
      }
      // let result1 = await CheckAppUserJoinEnterprise({type: 0})
      // if (result1.Code == 200) {
      //   if (!result1.Data) {
      //     // 是个人没有绑定过企业
      //     this.isVerify = true
      //     return
      //   } 
      // }
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
    },
    closeDialog () {
      this.isVerify = false
    }
  },
  watch: {
    upspring (val) {
      if (!val) {
        this.reviewContent1 = this.reviewContent
        this.reviewContent = ''
        console.log(this.reviewContent, this.reviewContent1)
      } else {
        this.reviewContent = this.reviewContent1
        this.reviewContent1 = ''
      }
      console.log(val)
    },
    arcitleInfo () {
      this.$nextTick(() => {
        setTimeout(() => {
          let content = document.querySelectorAll('.content img')
          if (content) {
            content.forEach(item => {
              var timer = setInterval(() => {
                if (item.complete) {
                  this.$refs.scroll.refresh()
                  clearInterval(timer)
                }
              }, 50)
            })
          }
        }, 500)
      })
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
    VerifyBox,
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
  .arcitle-container {
    max-width: 100vw;
  }
  .content {
    // width: calc(~"100vw - .6rem");
    padding: 0 .3rem 0;
    h1 {
      color: #333;
      font-size: .4rem;
      line-height: .5rem;
      margin-bottom: .1rem;
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
      border-bottom: 1px solid #ccc;
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
            font-family: '微软雅黑';
            font-weight: bold;
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
    .btn {
      display: inline-block;
      width: 1rem;
      white-space: nowrap;
      text-align: center;
      height: .68rem;
      background-color: #006B45;
      border-radius: .4rem;
      line-height: .68rem;
      color: #fff;
    }
  }
}
</style>