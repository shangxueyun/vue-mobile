<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header style="background-color:#06123C;padding: .6rem 0;" :left-options="{showBack: false}">登录</x-header>
        </div>
        <div class="centetn_div" style="margin-top: 3.2rem;height: 8rem;padding-top: 2rem;background: #06123C;">
            <i></i>
        </div>
        <div style="margin-top:1rem;border-bottom:1px solid #ddd">
            <x-input title="" style="background-color:#fff;height: 2rem;" :show-clear="false" type="text" v-model="phonePE" @on-change="passwordFvalue" placeholder="手机号">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/phone.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="">
            <x-input title="" style="background-color:#fff;height: 2rem;" :show-clear="false" type="password" v-model="passwordPW" @on-change="passwordFvalue" placeholder="密码">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/lock.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="padding:1.2rem">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">登录</x-button>
        </div>
        <div style="padding: 0rem 1rem 0rem 1rem;color: #2e6bbe;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;">
            <div @click="routerF('/register')" style="font-size:1rem;cursor: pointer;">注册账号</div>
            <div @click="routerF('/passwordRetrieve','1')" style="font-size:1rem;cursor: pointer;">忘记密码？</div>
        </div> 

        <div v-show="loading_Flg" id="loading_div" style="display:none">
            <div class="loading"></div>
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
          phonePE:'',
          passwordPW:'',
          loading_Flg:false,
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        if(window.location.search.replace("?",""))
        {
            this.loading_Flg = true;
            this.$router.push({
                path: "/pendingContractDetails",
                query:{
                    parameter:window.location.search.replace("?","")
                }
            });
        }else{
            this.loading_Flg = false;
            window.sessionStorage.removeItem("fundSideId");
            window.sessionStorage.removeItem("loanNo");
            window.sessionStorage.removeItem("token");
            window.sessionStorage.removeItem("memberId");
            window.sessionStorage.removeItem("phone");
            window.sessionStorage.removeItem("companyInfo");
            window.localStorage.removeItem("token");
        }
    },  
    methods: {
        passwordFvalue(e){
            this.Fvalue(e)
        },
        newPasswordFvalue(e){
            this.Fvalue(e)
        },
        verificationFvalue(e){
            this.Fvalue(e)
        },
        Fvalue(e){
            this.APIFunc.BtnColor(this,['phonePE','passwordPW']);
        },
        SubmitNext(){
            let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/,router = this.$router;
            if(this.passwordPW=="")
            {
                this.$vux.alert.show({title: '提示',content: '请输入密码',})
                return false
            }
            if(this.phonePE==""){
                this.$vux.alert.show({title: '提示',content: '请输入手机号'})
                return false
            }else{
                if(!reg.test(this.phonePE))
                {
                    this.$vux.alert.show({title: '提示',content: '请输入正确的手机号',});
                    return false
                }
            }
            this.$vux.loading.show({text: '加载中...'})
            this.APIFunc.AjaxPost('memberLogin', {
                loginIdentity: this.phonePE,
                verifyType: 'PASSWORD',
                loginVoucher: this.passwordPW,
                extension:null,
                identityType: 'PHONE_NO',
                client: 'APP'
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.setItem("token",data.bizData.token);
                    window.sessionStorage.setItem("memberId",data.bizData.memberId);
                    window.sessionStorage.setItem("phone",this.phonePE);
                    if(data.bizData.updateStep == "/pages/upload_file/state_of_check")
                    {
                        this.$router.push({
                            path: "/Home",
                        })
                    }
                    else if(data.bizData.updateStep == null)
                    {
                        this.$router.push({
                            path: "/uploadDocuments",
                        })
                    }
                    else{
                        if(data.bizData.updateStep=="/contractSigning")
                        {
                            window.localStorage.token = data.bizData.token;
                        }
                        this.$router.push({
                            path: data.bizData.updateStep,
                        })   
                    }
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})                    
            });
        },
        routerF(str,type){
            this.$router.push({
                path: str,
                query:{
                    type:type
                }
            })
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
.btn_div{
    position: relative;
}
#loading_div{
	width: 100%;
	height: 100%;
	position: absolute;
    background: #fff;
	top: 0;
	left: 0;
	z-index: 111111;
}
#loading_div .loading{
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 1.5rem;
	border: 2px solid transparent;
	border-top: 2px solid #0000008f;
	position: absolute;
	top: 35%;
	left: 50%;
	transform:rotate(0deg);
	animation:myfirst .5s both infinite;
	-moz-animation:myfirst .5s both infinite; 
	-webkit-animation:myfirst .5s both infinite; 
	-o-animation:myfirst .5s both infinite; 
}

@keyframes myfirst
{
0%   {transform:rotate(0deg);}
25%  {transform:rotate(72deg);}
50%  {transform:rotate(144deg);}
75% {transform:rotate(230deg);}
100% {transform:rotate(360deg);}
}

@-webkit-keyframes myfirst /* Safari and Chrome */
{
	0%   {transform:rotate(0deg);}
25%  {transform:rotate(72deg);}
50%  {transform:rotate(144deg);}
75% {transform:rotate(230deg);}
100% {transform:rotate(360deg);}
}
</style>