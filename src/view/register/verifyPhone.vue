<template>
    <div style="height: 100%;overflow: hidden;">
        <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">验证手机号</x-header>
        <div style="padding: 0.3rem 1rem;text-align: left;">
            <span style="font-size:1rem">手机号:{{phone}}</span>
        </div>
        <div style="margin-bottom:2px">
            <x-input title="字数+字母不少于6位" style="background-color:#fff;" :show-clear="false" type="password" v-model="password" @on-change="Fvalue" placeholder="字数+字母不少于6位">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/lock.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="margin-bottom:2px">
            <x-input title="请再次确认密码" style="background-color:#fff;" :show-clear="false" type="password" v-model="newPassword" @on-change="Fvalue" placeholder="请再次确认密码">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/lock.svg" width="24" height="24">
            </x-input>
        </div>
        <div class="centetn" style="margin-bottom:1.5rem;background-color:#fff;">
            <x-input title="请输入验证码" style="background-color:#fff;width: 58%;" type="text" :show-clear="false" v-model="verification" @on-change="Fvalue" placeholder="请输入验证码">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/mail.svg" width="24" height="24">
            </x-input>
            <div style="padding: .6rem 0px;color: #7a9dec;" @click="verificationFunc">{{verificationmsg}}</div>
        </div>
        <div style="padding:0px 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
    </div>
</template>

<script>
import { XHeader,XInput,XButton } from 'vux'

export default {
    components: {
        XHeader,
        XInput,
        XButton
    },
    data() {
      return {
          phone:this.$route.query.phone,
          password:'',
          newPassword:'',
          verification:'',
          verificationmsg:'获取验证码',
          verificationFlg:false,
      };
    },
    created() {

    },
    computed: {

    },
    mounted() {
        window.flgNum = 60;
        window.Setflg = null;
        window.OutFlg = null;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },  
    methods: {
        Fvalue(e){
            this.APIFunc.BtnColor(this,['password','newPassword','verification']);
        },
        verificationFunc(){
            if(!this.verificationFlg)
            {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.APIFunc.AjaxPost('sendSMSAuthCode', {
                phoneNo: this.phone,
                bizType: 'REGISTER'
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
            }
        },
        SubmitNext(){
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/,router = this.$router;
            if(!reg.test(this.password))
            {
                this.$vux.alert.show({title: '提示',content: '字数+字母不少于6位！',})
                return false
            }
            if(this.newPassword != this.password){
                this.$vux.alert.show({title: '提示',content: '两次输入密码不一致！',onHide () {}})
                return false
            }
            if(this.verification==""){
                this.$vux.alert.show({title: '提示',content: '请输入验证码！',})
                return false
            }
            this.$vux.loading.show({text: '加载中...'})
            this.APIFunc.AjaxPost('memberRegister', {
                loginIdentity: this.phone,
                verifyCode: this.verification,
                password: this.password,
                memberType: "COMPANY",
                extension: null,
                identityType: "PHONE_NO"
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.setItem("token",data.bizData.token);
                    window.sessionStorage.setItem("memberId",data.bizData.memberId);
                    window.sessionStorage.setItem("phone",this.phone);
                    this.$vux.alert.show({title: '验证成功',content: '您接下来所录入或上传的资料和信息将用于收集主体资料、身份验证、审批业务等目的，并有可能披露给第三方；如果您非申请企业及其法定代表人本人或者有权代理人，请立即停止相关操作。',onHide () {
                        router.push({
                            path: '/uploadDocuments',
                        })
                    }})
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})                    
            });
        },
        backReturn(){
            this.$router.push({
                path: '/register',
            })
        },
    },
  }

</script>

<style lang="scss" scoped>
.input_style{
    width: 88%;
    height: 2.6rem;
}
.input-style{
    width: 88%;
}
.iocn-ip{
    width: 1.8rem;
    height: 1.8rem;
    margin: 0rem .6rem 0 0.5rem;
}
.lock{
    background: url(https://china-mz.cn/bmimg/lock.svg) no-repeat;
    background-size: 100% 100%;
}
.mail{
    background: url(https://china-mz.cn/bmimg/mail.svg) no-repeat;
    background-size: 100% 100%;
}
.button_style{
    height: 2.4rem;
    font-size: 1rem;
}
.centetn{
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: normal;
}

</style>