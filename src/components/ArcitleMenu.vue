<template>
  <ul class="arcitle">
    <li v-for="item in arcitle" :key="item.id" @click="goArcitle(item)">
      <div class="left">
        <img :src="'https://img.xlxt.net/' + item.PreviewUrl" alt="">
      </div>
      <div class="right">
        <h3>{{item.Title}}</h3>
        <p>{{item.Intro}}</p>
      </div>
    </li>
    <verify-box v-if="isVerify" @closeDialog="closeDialog"></verify-box>
  </ul>
</template>
<script>
// 企业认证
import VerifyBox from '@/components/VerifyBox'
import { MessageBox } from 'mint-ui'
import { CheckAppUserJoinEnterprise } from '@/api/index'
export default {
  name: 'Arcitle',
  props: {
    arcitle: {
      type: Array,
      default: () => { return [] }
    },
    isLogin: {
      type: [String, Object, Boolean],
      default: ''
    }
  },
  data() {
    return {
      // 是否验证
      isVerify: false
    }
  },
  methods: {
    async goArcitle (val) {
      // 如果没有登录
      if (!this.isLogin) {
        MessageBox({
          title: '提示',
          message: '登录后可以浏览文章',
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
      // 查询是否绑定企业
      let result = await CheckAppUserJoinEnterprise({type: 0})
      if (result.Code == 200) {
        if (!result.Data) {
          // 是个人没有绑定过企业
          this.isVerify = true
          return
        } 
      }
      this.$router.push({
        path: '/arcitle',
        query: {
          id: val.ArticleID
        }
      })
    },
    closeDialog () {
      this.isVerify = false
    }
  },
  components: {
    VerifyBox
  }
}
</script>
<style lang="less" scoped>
.arcitle {
  li {
    height: 1.68rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: .35rem;
    &:last-child {
      margin-bottom: 0;
    }
    .left {
      width: 3rem;
      height: 1.68rem;
      border-radius: .2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 3.54rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h3 {
        font-size: .3rem;
        line-height: .36rem;
        color: #031D14;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        // text-align: center;
      }
      p {
        font-size: .24rem;
        line-height: .36rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>