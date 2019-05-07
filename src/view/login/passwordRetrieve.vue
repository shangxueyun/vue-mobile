<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">密码找回</x-header>
        </div>
        <div style="margin-top:5rem;border-bottom:1px solid #ddd">
            <x-input title="" style="background-color:#fff;height: 2rem;" :show-clear="false" type="number" v-model="phone" placeholder="手机号">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/phone.svg" width="24" height="24">
            </x-input>
        </div>
        <div class="centetn" style="margin-bottom:1.5rem;background-color:#fff;">
            <x-input title="请输入验证码" style="background-color:#fff;width: 58%;" type="number" :show-clear="false" v-model="verification" @on-change="Fvalue" placeholder="请输入验证码">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/mail.svg" width="24" height="24">
            </x-input>
            <div style="padding: .6rem 0px;color: #7a9dec;" @click="verificationFunc">{{verificationmsg}}</div>
        </div>
        <div style="padding:.5rem 1rem">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
    </div>
</template>
<script>
import { XButton, XHeader,XInput } from 'vux'
export default {
    components: {
        XButton,
        XHeader,
        XInput
    },
    data() {
      return {
          phone:'',
          type:this.$route.query.type,
          verification:'',
          verificationmsg:'获取验证码',
          verificationFlg:false,
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        window.flgNum = 60;
        window.Setflg = null;
        window.OutFlg = null;
        document.body.scrollTop = 0;
    },  
    methods: {
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.phone!=""&&this.verification!="")
            {
                className = className.replace("button_dark","")
                this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
            }else{
                className = className.replace("button_gray","")
                this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
            }
        },
        verificationFunc(){
            if(this.phone!="")
            {
                if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/.test(this.phone))
                {
                    this.$vux.alert.show({title: '提示',content: "请输入正确的手机号"});
                    return false;
                }
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.APIFunc.AjaxPost('sendSMSAuthCode', {
                    phoneNo: this.phone,
                    bizType: 'RESET_PASSWORD'
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        window.Setflg = setInterval(()=>{
                            this.verificationFlg = true
                            this.verificationmsg = `${window.flgNum}s 获取验证码`
                            window.flgNum--
                        },1000)
                        window.OutFlg = setTimeout(()=>{
                            clearInterval(window.Setflg)
                            this.verificationFlg = false
                            this.verificationmsg = `获取验证码`
                            window.flgNum = 60
                        },60000)
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})                        
                })   
            }else
            this.$vux.alert.show({title: '提示',content: "请输入手机号"})
        },
        SubmitNext(){
            let router = this.$router;
            if(!/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/.test(this.phone))
            {
                this.$vux.alert.show({title: '提示',content: "请输入正确的手机号"});
                return false;
            }
            if(this.verification==""){
                this.$vux.alert.show({title: '提示',content: '请输入验证码！',})
                return false
            }
            this.$router.push({
                path: '/setPassword',
                query: {
                    loginIdentity:this.phone,
                    verifyCode:this.verification,
                    type:2,
                }
            });
        },
        backReturn(){
            if(this.type=="1")
            {
                this.$router.push({
                    path: '/login',
                })
            }else{
                this.$router.push({
                    path: '/setting',
                })
            }
        },
    },
  }

</script>

<style lang="scss" scoped>
.centetn_div i{
    display: block;
    width: 5rem;
    border-radius: 2.5rem;
    height: 5rem;
    margin: 0 auto;
    background: url(https://china-mz.cn/bmimg/avatar.svg) no-repeat;
    background-size: 100% 100%;
}
.centetn_div div{
    text-align: center;
}
.centetn{
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: normal;
}
</style>