<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">设置新密码</x-header>
        </div>
        <div style="margin-top:5rem;border-bottom:1px solid #ddd">
            <x-input title="" style="background-color:#fff;height: 2rem;" :show-clear="false" type="password" v-model="password" placeholder="请输入新密码">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/lock.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="margin-bottom:1rem;background-color:#fff;">
            <x-input title="" style="background-color:#fff;height: 2rem;" :show-clear="false" type="password" v-model="Newpassword" @on-change="Fvalue" placeholder="请输入再次输入">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/lock.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="padding:.5rem 1rem">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">确认</x-button>
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
          password:'',
          Newpassword:'',
          loginIdentity:this.$route.query.loginIdentity,
          verifyCode:this.$route.query.verifyCode,
          type:this.$route.query.type,
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
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },  
    methods: {
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.password!=""&&this.Newpassword!="")
            {
                className = className.replace("button_dark","")
                this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
            }else{
                className = className.replace("button_gray","")
                this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
            }
        },
        SubmitNext(){
            debugger
            let router = this.$router;
            if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(this.password))
            {
                this.$vux.alert.show({title: '提示',content: "请输入密码，字数+字母不少于6位"});
                return false;
            }
            if(this.Newpassword!=this.password){
                this.$vux.alert.show({title: '提示',content: '两次输入密码不一致！',})
                return false
            }
            if(this.type == "2")
            {
                this.$vux.loading.show({text: '加载中...'})
                this.APIFunc.AjaxPost('setLoginPassword', {
                    identityType: 'PHONE_NO',
                    loginIdentity: this.loginIdentity,
                    verifyCode: this.verifyCode,
                    newPassword: this.Newpassword,
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this.$router.push({
                            path: '/login',
                        })
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });
            }else{
                this.$vux.loading.show({text: '加载中...'})
                this.APIFunc.AjaxPost('updateLoginPassword', {
                    newPassword: this.Newpassword,
                    oldPassword: this.$route.query.oldPassword,
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this.$router.push({
                            path: '/login',
                        })
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });
            }
        },
        backReturn(){
            if(this.type == "1")
            {
                this.$router.push({
                    path: '/modifyPassword',
                })
            }else{
                this.$router.push({
                    path: '/passwordRetrieve',
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