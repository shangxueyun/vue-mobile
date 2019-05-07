<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">{{titleMsg}}</x-header>
        </div>
        <div class="centetn_div" style="margin-top: 3.2rem;padding: 7rem 1rem 1rem 1rem;text-align: left;">
            <i :style="style"></i>
            <div style="padding: 1rem 0rem .5rem 0rem;font-weight: bolder;font-size: 1.2rem;">{{textMsg}}</div>
            <div style="color:#888;font-size: 1rem;">{{textMsg2}}</div>
        </div>
        <div v-show="BtnFlgF" style="padding:1rem">
            <x-button  class="button_dark" type="primary"  ref="button" @click.native="backReturn" action-type="button">确认</x-button>
        </div>
        <div class="btn_div" style="position: fixed;bottom: 0;width: 100%;" v-show="BtnFlg">
            <x-button @click.native="backReturn" :mini="true" style="width: 100%;border-radius: 0;height: 3.5rem;color: #888;font-size: 1.2rem;border: 0;border-top: 1px solid #ccc;" plain>返回登录</x-button>
        </div>
    </div>
</template>
<script>
import { XButton, XHeader } from 'vux'
export default {
    components: {
        XButton,
        XHeader,
    },
    data() {
      return {
          titleMsg:'',
          textMsg:'',
          textMsg2:'',
          BtnFlg:true,
          BtnFlgF:false,
          style:'background: url("https://china-mz.cn/bmimg/time.svg") 0% 0% / 100% 100% no-repeat;'
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        document.body.scrollTop = 0;
        if(this.$route.query.type)
        {
            this.style = 'background: url("https://china-mz.cn/bmimg/ok.svg") 0% 0% / 100% 100% no-repeat;'
            this.titleMsg = '审核中';
            this.textMsg = '温馨提示';
            this.textMsg2 = '您的贷款合同已签署，将在资金方审批通过后进行放款，您可以在“我的”相应列表查询审核状态及放款结果。';
            this.BtnFlg = false;
            this.BtnFlgF = true;
        }else{
            this.style = 'background: url("https://china-mz.cn/bmimg/time.svg") 0% 0% / 100% 100% no-repeat;'
            this.titleMsg = '额度审核';
            this.textMsg = '申请已提交，额度审核中……';
            this.textMsg2 = '额度申请已提交，请耐心等待';
            this.BtnFlg = true;
            this.BtnFlgF = false;
        }
    },  
    methods: {
        backReturn(){
            if(this.$route.query.type)
            {
                this.$router.push({
                    path: '/mine',
                });
            }else{
                this.$router.push({
                    path: '/login',
                });          
            }
        },
    },
  }

</script>

<style lang="scss" scoped>
.centetn_div i{
    display: block;
    width: 6rem;
    height: 6rem;
    padding-bottom: 1rem;
    margin: 0 auto;
}
.centetn_div div{
    text-align: center;
}
.btn_div{
    position: relative;
}
</style>