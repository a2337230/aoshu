<template>
  <div class="verify">
    <div class="verify-box">
      <span class="close" @click="closeDialog">×</span>
      <div class="title">
        企业认证
      </div>
      <p class="hint">请填写真实信息，仅有一次机会</p>
      <div class="input">
        <input type="text" v-model="text" placeholder="请输入企业名称" @input="input" maxlength='50' @blur="isBlur">
        <div class="menu" v-show="selectShow">
          <ul>
            <li v-for="item in selectList" :key="item" v-html="item" @click="listClick(item)"></li>
          </ul>
        </div>
        <p class="rule" v-if="isRule">企业名称不能为空</p>
      </div>
      
      <div class="btn-container" @click="submit">
        确定
      </div>
    </div>
  </div>
</template>
<script>
import { AddAppUserJoinEnterprise } from '@/api/index'
import { Toast } from 'mint-ui'
export default {
  name: 'verify',
  data () {
    return {
      list: [
        '北京高远百康大药房有限公司',
        '北京国大药房连锁有限公司',
        '北京海王星辰药房有限公司（总部）',
        '北京恒创佳益医药有限公司',
        '北京嘉事堂连锁药店有限责任公司',
        '北京金象大药房医药连锁有限责任公司',
        '北京普安法玛西医药有限公司',
        '叮当智慧药房(北京)有限公司',
        '老百姓大药房（北京）有限公司',
        '国药河北乐仁堂医药连锁有限公司',
        '老百姓大药房连锁河北有限公司',
        '大庆市世一大药房连锁有限公司',
        '黑龙江省金天爱心医药经销有限公司',
        '国大益和大药房吉林有限公司',
        '吉林大药房药业股份有限公司',
        '国药控股国大药房内蒙古有限公司',
        '国药控股国大药房沈阳连锁有限公司',
        '辽宁成大方圆医药连锁有限公司',
        '沈阳海王星辰医药有限公司',
        '大连海王星辰医药有限公司',
        '大连阳光大药房有限公司',
        '国药控股国大药房山东有限公司',
        '老百姓大药房连锁（山东）有限公司',
        '青岛国风大药房连锁有限公司',
        '青岛利群药品经营有限公司',
        '青岛市海王星辰健康药房连锁有限公司',
        '青岛医保城药品连锁有限公司',
        '青岛众生大药房连锁有限公司',
        '青岛紫光药业有限公司',
        '山东好药师大药房连锁有限公司',
        '山东潍坊海王星辰民康连锁药店有限公司',
        '山东幸福人医药连锁有限公司',
        '漱玉平民大药房连锁股份有限公司',
        '章丘市健民医药有限公司',
        '山西鸿翔一心堂药业有限公司',
        '叮当智慧药房(天津)有限公司',
        '老百姓大药房连锁（天津）有限公司',
        '天津国大药房连锁有限公司',
        '天津瑞澄大药房连锁有限公司',
        '天津市海王星辰健康药房连锁有限公司',
        '天津市津永新大药房连锁有限公司',
        '天津医药集团津一堂连锁股份有限公司',
        '安徽百姓缘大药房连锁有限公司',
        '安徽丰原大药房连锁有限公司',
        '安徽国大药房连锁有限公司',
        '安徽国胜大药房连锁有限公司',
        '安徽省邻加医康复大药房有限公司',
        '安徽元初药房连锁有限公司',
        '合肥光大药房连锁有限公司',
        '南京医药合肥大药房连锁有限公司',
        '芜湖市新市民大药房连锁有限公司',
        '芜湖中山大药房连锁有限公司',
        '福建国大药房连锁有限公司',
        '福建海华医药连锁有限公司',
        '福建省康利达医药连锁有限公司',
        '福建省民心医药连锁有限公司',
        '福建新紫金医药有限公司',
        '福建易安堂大药房连锁有限公司',
        '福州大参林贸易有限公司',
        '福州海王星辰健康药房连锁有限公司',
        '福州市振旅医药有限公司',
        '泉州市东南医药连锁有限公司',
        '泉州市国大药房连锁有限公司',
        '厦门鹭燕大药房有限公司',
        '厦门祝强大药房有限公司',
        '国药控股国大药房河南连锁有限公司',
        '河南百家好一生医药连锁有限公司',
        '河南大参林连锁药店有限公司',
        '河南隆祥药业有限公司',
        '河南天伦医药连锁有限公司',
        '河南张仲景医药物流有限公司',
        '河南佐今明大药房健康管理股份有限公司',
        '洛阳开心人药业连锁有限公司',
        '南阳隆泰仁医药有限公司',
        '商丘市天博大药房连锁有限公司',
        '新乡市医药有限责任公司',
        '常熟市恒泰医药连锁有限公司',
        '常熟市建发医药零售连锁有限公司',
        '常州万仁大药房有限公司',
        '常州中诚大药房有限公司',
        '国药控股国大药房南京连锁有限公司',
        '国药控股国大药房扬州大德生连锁有限公司',
        '恒泰人民（江苏）大药房连锁有限公司',
        '华润苏州礼安医药连锁总店有限公司',
        '淮安广济医药连锁有限公司',
        '江苏百佳惠瑞丰大药房连锁有限公司',
        '江苏百佳惠苏禾大药房连锁有限公司',
        '江苏海王星辰健康药房连锁有限公司',
        '江苏普泽大药房连锁有限公司',
        '江苏奇冠药店有限公司',
        '江苏市民大药房连锁有限公司',
        '江苏益丰大药房连锁有限公司',
        '昆山双鹤同德堂连锁大药房有限责任公司',
        '老百姓大药房（江苏）有限公司',
        '溧阳国大人民药房有限公司',
        '南京上元堂医药股份有限公司',
        '南京筑康药房连锁有限公司',
        '南通济生堂大药房连锁有限公司',
        '上海华氏大药房南通连锁有限公司',
        '苏州健生源医药连锁有限公司',
        '苏州吴江国医药业零售连锁有限公司',
        '泰州市隆泰源医药连锁有限公司',
        '无锡九州医药连锁有限公司',
        '先声再康江苏药业有限公司',
        '扬州市百信缘医药连锁有限公司',
        '宜兴市天健医药连锁有限公司',
        '张家港市百禾医药连锁有限公司',
        '镇江华康大药房连锁有限公司',
        '江西大参林药业有限公司',
        '叮当智慧药房(上海)有限公司',
        '国药控股国大复美大药房上海连锁有限公司',
        '国药控股国大药房上海连锁有限公司',
        '老百姓大药房连锁（上海）有限公司',
        '上海得一大药房连锁有限公司',
        '上海海王星辰药房有限公司',
        '上海好药师大药房连锁有限公司',
        '上海恒德大药房有限公司',
        '上海华氏大药房有限公司',
        '上海汇丰大药房有限公司',
        '上海雷西大药房连锁有限公司',
        '上海雷允上北区药品零售有限公司',
        '上海雷允上药品连锁经营有限公司',
        '上海市第一医药商店连锁经营有限公司',
        '上海童涵春堂药业连锁经营有限公司',
        '上海万芸药房连锁有限公司',
        '上海养和堂药业连锁经营有限公司',
        '上海药房连锁有限公司',
        '上海一德大药房连锁经营有限公司',
        '上海医药嘉定大药房连锁有限公司',
        '上海益丰大药房连锁有限公司',
        '上海云湖医药连锁经营有限公司',
        '德清天润大药房有限公司',
        '德清县老百姓大药房有限公司',
        '东阳市方圆大药房连锁有限公司',
        '丰沃达医药物流（杭州）有限公司',
        '海宁市老百姓大药房有限责任公司',
        '杭州海王星辰健康药房有限公司',
        '杭州九洲大药房连锁有限公司',
        '杭州天天好医药有限公司',
        '杭州益万家药房连锁有限公司',
        '杭州正采元医药有限公司',
        '湖州开心人大药房连锁有限公司',
        '湖州平家大药房连锁有限公司',
        '金华市尖峰大药房连锁有限公司',
        '金华市九德堂医药连锁有限公司',
        '金华市老百姓医药连锁有限公司',
        '金华市太和堂医药连锁有限公司',
        '宁波海王星辰健康药房有限公司',
        '宁波市四季康来医药有限公司',
        '宁波四明大药房有限责任公司',
        '温州百晓药房连锁有限公司',
        '温州大参林药店连锁有限公司',
        '温州市修正堂药品零售连锁有限公司',
        '温州延生堂医药连锁有限公司',
        '温州一正药房连锁有限公司',
        '余姚市同济堂药品零售连锁有限公司',
        '浙江国药大药房有限公司',
        '浙江海港医药连锁有限公司',
        '浙江湖州华圣医药零售连锁有限公司',
        '浙江华联医药连锁有限公司',
        '浙江华通医药连锁有限公司',
        '浙江省东阳市统一药房连锁有限公司',
        '浙江省杭州华东大药房连锁有限公司',
        '浙江省嘉兴市老百姓药品零售有限公司',
        '浙江省桐乡市老百姓药品零售有限公司',
        '浙江震元医药连锁有限公司',
        '深圳市海王星辰健康药房连锁有限公司',
        '叮当智慧药房(广东)有限公司',
        '恩平市银星药业有限公司',
        '恩平市长安药业有限公司',
        '广东日兴药品有限公司',
        '广东省江门市台山市人民大药房有限公司',
        '国药控股国大药房广东有限公司',
        '国药控股国大药房江门连锁有限公司',
        '惠州市百姓大药房医药连锁有限公司',
        '惠州市百姓缘医药有限公司',
        '惠州市大参林药店有限公司',
        '江门大参林药店有限公司',
        '江门市新会区健丰药业有限公司',
        '深圳二天堂大药房有限公司',
        '深圳市大参林药业连锁有限公司',
        '深圳市佳广友和医药大药房有限公司',
        '深圳市民心大药房连锁有限公司',
        '深圳市南北药行连锁有限公司',
        '深圳市瑞草堂大药房有限公司',
        '深圳市万泽医药连锁有限公司',
        '深圳市元和堂药业连锁有限公司',
        '深圳中联大药房控股有限公司',
        '中山市大参林连锁药业有限公司',
        '中山市仁泽堂药业连锁有限公司',
        '中山市新特药有限公司',
        '珠海市济生医药连锁有限公司',
        '珠海市金杏堂医药批发有限公司',
        '潮州市大参林药店有限公司',
        '佛山大参林连锁药店有限公司',
        '佛山市百姓堂药业连锁有限公司',
        '佛山市佛心医药连锁有限公司',
        '佛山市好参来医药连锁有限公司',
        '佛山市南海区祈福药业连锁有限公司',
        '佛山市南海益康医药连锁店有限公司',
        '佛山市千和堂医药连锁有限公司',
        '佛山市顺德区大参林药业有限公司',
        '佛山市中天药业连锁有限公司',
        '广东关爱大药房连锁有限公司',
        '广东恒青大药房连锁有限公司',
        '广东省佛山市都市百姓医药连锁有限公司',
        '海南鸿翔一心堂医药连锁有限公司',
        '揭阳市大参林药店有限公司',
        '揭阳市汇康医药连锁有限公司',
        '茂名大参林连锁药店有限公司',
        '梅州大参林药店有限公司',
        '清远百姓大药房医药连锁有限公司',
        '清远大参林连锁药店有限公司',
        '汕头市大参林连锁药店有限公司',
        '汕头市凯德药品连锁有限公司',
        '汕尾大参林药店有限公司',
        '韶关市大参林药店有限公司',
        '韶关市乡亲大药房医药连锁有限公司',
        '湛江天马大药房连锁有限公司',
        '肇庆大参林药店有限公司',
        '大参林医药集团股份有限公司',
        '东莞市大参林连锁药店有限公司',
        '广东宝家康药业有限公司',
        '广东济和堂药业连锁有限公司',
        '广东康之家药业有限公司',
        '广东省东莞国药集团有限公司',
        '广东扬帆药房连锁有限公司',
        '广东益丰益荔康信大药房连锁有限公司',
        '广州东兴堂大药房连锁有限公司',
        '广州集和堂大药房连锁有限公司',
        '广州健民医药有限公司',
        '广州市宝芝林大药房连锁有限公司',
        '广州市海王星辰医药连锁有限公司',
        '广州市天仁药业有限公司',
        '广州一笑堂医药连锁有限公司',
        '广州正和药业连锁有限公司',
        '国药控股国大药房广州连锁有限公司',
        '河源大参林药店有限公司',
        '老百姓大药房连锁广东有限公司',
        '广西大参林连锁药店有限公司',
        '广西鸿翔一心堂药业有限责任公司',
        '广西健之佳药店连锁有限公司',
        '广西一心医药集团有限责任公司',
        '广西友和古城大药房有限责任公司',
        '国药控股国大药房广西连锁有限公司',
        '老百姓大药房连锁（广西）有限公司',
        '湖北益生天济大药房连锁有限公司',
        '老百姓大药房连锁(湖北)有限公司',
        '武汉海王星辰医药连锁有限公司',
        '武汉璟泓万方堂大药房连锁有限公司',
        '武汉普安医药有限公司',
        '武汉为民天寿大药房有限公司',
        '襄阳天济大药房连锁有限责任公司',
        '湖南海王星辰健康药房连锁有限公司',
        '湖南九芝堂零售连锁有限公司',
        '湖南养天和大药房企业集团有限公司',
        '老百姓大药房连锁股份有限公司',
        '甘肃众友健康医药连锁有限公司',
        '贵州鸿翔一心堂医药连锁有限公司',
        '贵州一树连锁药业有限公司',
        '陕西广济大药房医药有限公司',
        '国药控股国大药房新疆新特药业连锁有限责任公司',
        '老百姓大药房连锁(陕西)有限公司',
        '宁夏国大药房连锁有限公司',
        '陕西众信医药超市有限公司',
        '陕西众友健康医药有限公司',
        '成都高济瑞康医药连锁有限公司',
        '成都良元大药房连锁有限公司',
        '成都宁丰堂大药房连锁有限公司',
        '成都市乐源堂大药房连锁有限公司',
        '四川德仁堂药业连锁有限公司',
        '四川芙蓉大药房连锁有限公司',
        '四川海王星辰健康药房连锁有限公司',
        '四川鸿翔一心堂医药连锁有限公司',
        '四川健之佳福利大药房连锁有限责任公司',
        '四川省华安堂药业零售连锁有限公司',
        '四川同善堂药业连锁有限公司',
        '四川一心堂医药连锁有限公司',
        '云南鸿翔一心堂药业（集团）股份有限公司',
        '云南健之佳健康连锁店股份有限公司',
        '云南健之佳重庆勤康药业有限公司',
        '重庆鸿翔一心堂药业有限公司',
        '重庆桐君阁股份有限公司',

      ],
      selectList: [],
      text: '',
      selectShow: false,
      isRule:false,
      isTrue: false
    }
  },
  created () {
    // 深拷贝数组
    // this.selectList = JSON.parse(JSON.stringify(this.list))
  },
  methods: {
    isBlur () {
      this.selectShow = false
    },
    // 关闭弹窗
    closeDialog () {
      this.$emit('closeDialog')
      if (!this.isTrue) {
        this.$emit('goHome')
      }
    },
    input () {
      this.isRule = false
      this.selectShow = false
      // 禁止输入空格
      this.text = this.text.replace(/\s/g,"")
      let content = this.text.replace(/[^\u4E00-\u9FA5]/g,'')
      if (!content) {
        return
      }
      // let text = content.split('')
      // 筛选
      let data = JSON.parse(JSON.stringify(this.list))
      data = data.filter(item => item.includes(content))
      if (data.length) {
        let formatData = data.join(',')
        formatData = formatData.replace(new RegExp(content,'gm'), `<span style='color: red'>${content}</span>`)
        this.selectList = formatData.split(',')
        this.selectShow = true
      }
      // text.forEach(item => {
      //   data = data.filter(citem => citem.includes(item))
      // })
      // 添加颜色
      // text = Array.from(new Set(text))
      // let formatData = data.join(',')
      // text.forEach(item => {
      //   formatData = formatData.replace(new RegExp(item,'gm'), `<span style='color: red'>${item}</span>`)
      // })
      // this.selectList = formatData.split(',')
      // if (this.selectList.length > 1) {
      //   this.selectShow = true
      // }
    },
    async submit () {
      if (!this.text) {
        this.isRule = true
        return
      }
      let result = await AddAppUserJoinEnterprise({
        Name: this.text,
        Type: 0
      })
      if (result.Code === 200) {
        this.isTrue = true
        this.$emit('isOK')
        this.closeDialog()
      }
    },
    listClick (val) {
      let reg = /<[^<>]+>/g;
      this.text = val.replace(reg,"")
      this.selectShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.verify {
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 55;
  display: flex;
  justify-content: center;
  align-items: center;
  .verify-box {
    width: 6rem;
    height: 5.6rem;
    background-color: #fff;
    border-radius: .2rem;
    box-sizing: border-box;
    padding: .6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: .8rem;
      height: .8rem;
      font-size: .5rem;
      line-height: .8rem;
      text-align: center;
    }
    .title {
      margin: .6rem 0 0;
      width: 2.3rem;
      height: .6rem;
      // background-color: red;
      font-family: 'PMZD';
      font-size: .6rem;
      color: #006B45;
    }
    .hint {
      color: #F5222D;
      opacity: .8;
      margin-top: .2rem;
      font-size: .24rem;
      line-height: .42rem;
      margin-bottom: .6rem
    }
    .input {
      width: 100%;
      position: relative;
      height: .5rem;
      input {
        outline: none;
        border: 0;
        width: 100%;
        font-size: .3rem;
        line-height: .4rem;
        padding-bottom: .08rem;
        border-bottom: 1px solid #979797;
        text-align: center;
      }
      input::-webkit-input-placeholder {
        color: #999;
        font-size: .3rem;
      }
      .menu {
        margin-top: .12rem;
        position: absolute;
        // bottom: 0;
        width: 100%;
        max-height: 2rem;
        background-color: #F9F9F9;
        box-sizing: border-box;
        padding: .2rem .3rem;
        overflow-y: scroll;
        li {
          font-size: .26rem;
          line-height: .4rem;
          // padding: .8rem 0;
          padding: .08rem 0;
          color: #999;
          white-space: nowrap;
          overflow-x: scroll;
          .keyword {
            color: red;
          }
        }
        li::-webkit-scrollbar {display:none}
      }
      .rule {
        font-size: .22rem;
        padding-top: .1rem;
        color: #F5222D;
      }
    }
    .btn-container {
      width: 100%;
      height: .88rem;
      background-color: #006B45;
      margin-top: .73rem;
      border-radius: .44rem;
      text-align: center;
      line-height: .88rem;
      color: #fff;
      font-size: .3rem;
    }
  }
}
</style>