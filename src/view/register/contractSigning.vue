<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">信息确认</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: 3rem .8rem;background: rgb(6, 18, 60);">
            <step v-model="step1" background-color='#fbf9fe'>
                <step-item description="上传资料"></step-item>
                <step-item description="信息确认"></step-item>
                <step-item description="合同签署"></step-item>
            </step>
        </div>
        <div class="company_div" style="padding: .5rem 1rem;text-align: left;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#fff">
            <i></i>
            <div>公司名称</div>
        </div>
        <div style="padding: 0rem;text-align: left;background:#fff">
            <cell title="企业名称" value="111" ></cell>
        </div>
        <div style="padding: 0rem;text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="企业法定代表人手机号码" value="2222" ></cell>
        </div>
        <div style="padding: 1rem;text-align: left;">
            <div style="font-size:1rem">后续通过手机号确认的信息均将视为企业及企业法定代表人的行为。</div>
        </div>
        
        <div class="text_div" style="padding: .5rem 1rem;;text-align: left;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#fff">
            <i></i>
            <div>合同文本</div>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;background:#fff">
            <x-button :mini="true" style="width:100%" @click.native="positionS_Lo = true" action-type="button">点击进行电子签章授权及验证</x-button>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;background:#fff">
            <span @click="Query_function" name="REGISTER" style="font-size:1rem;color:#2e6bbe">《会员注册协议》</span>
        </div>
        <div style="padding: 0rem 1rem;text-align: left;background:#fff">
            <span @click="Query_function" name="PERSON_CREDIT_QUERY" style="font-size:1rem;color:#2e6bbe">《个人信息授权书》</span>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;background:#fff">
            <span @click="Query_function" name="COMPANY_CREDIT_QUERY" style="font-size:1rem;color:#2e6bbe">《企业数据授权书》</span>
        </div>

        <div style="padding: 0.5rem 1rem 1rem 1rem;text-align: left;background:#fff">
            <check-icon :value.sync="demo1"  type="plain"><span style="font-size:1rem;">我已经详细阅读并确认以上协议及信息</span></check-icon>
        </div>
        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>


        <div class="positionS" v-show="positionS_Lo">
            <div style="width: 90%;height: auto; margin: 0 auto;">
                <div class="hint" style="padding: 1rem 1rem 0rem 1rem;text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: normal;background:#fff;border-radius: 10px 10px 0px 0px;">
                    <i></i>
                    <div>提示</div>
                </div>
                <div style="padding: 1rem 1rem 0rem 1rem;color:#999;background:#fff;text-align: left;">
                    即将进行法定代表人手机验证，验证通过后即表示贵公司授权我司第三方平台申请贵司的电子CA证书完成协议签署并提交额度申请。
                </div>
                <div style="padding:0rem 1rem 0rem 0rem;color:#999;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;background:#fff">
                    <x-input title="" style="background-color:#fff;text-align: left;" :show-clear="false" type="number" v-model="verificationVlu" placeholder="请输入验证码"></x-input>
                    <x-button :mini="true" style="width: 44%;height: 2.4rem;font-size: 1rem;" @click.native="verificationFunc" plain>{{verificationmsg}}</x-button>
                </div>
                <div style="padding:.5rem 5rem 1rem 5rem;color:#999;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;background:#fff;border-radius: 0px 0px 10px 10px;">
                    <div @click="positionS_Lo = false" style="font-size:1.2rem;color:#333">否</div>
                    <div @click="verifySMSAuthCode" style="font-size:1.2rem;color:#333">是</div>
                </div>                
            </div>

        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHeader,XInput,Cell,CheckIcon, } from 'vux'
export default {
    components: {
        Step,
        StepItem,
        XButton,
        XInput,
        XHeader,
        Cell,
        CheckIcon,
    },
    data() {
      return {
        step1: 2, 
        flg:false,
        positionS_Lo:false,
        verification:false,
        verificationVlu:'',
        verificationFlg:false,
        verificationmsg:"获取验证码",
        REGISTER:'',
        PERSON_CREDIT_QUERY:'',
        COMPANY_CREDIT_QUERY:'',
        REGISTERV:'',
        PERSON_CREDIT_QUERYV:'',
        COMPANY_CREDIT_QUERYV:'',
        demo1:true
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
    },  
    methods: {
        verificationFunc(){
            if(!this.verificationFlg)
            {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.APIFunc.AjaxPost('sendSMSAuthCode', {
                    phoneNo: window.sessionStorage.phone,
                    bizType: 'PHONE_NO_VERIFY'
                }).then(data => {
                    this.$vux.loading.hide()
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
        verifySMSAuthCode(){
            if(this.verificationVlu != "")
            {
                this.$vux.loading.show({
                    text: '加载中...'
                })
                this.APIFunc.AjaxPost('verifySMSAuthCode', {
                    verifyCode: this.verificationVlu,
                    bizType: 'PHONE_NO_VERIFY'
                }).then(data => {
                    this.$vux.loading.hide()
                    if(data.requestStatus =="SUCCESS"){
                        this.positionS_Lo = false;
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                })   
            }else
            this.$vux.alert.show({title: '提示',content: "请输入验证码"})
        },
        Query_function(e){
            let keyvalue = e.target.attributes.name.value;
            let tuna = this;
            if(this[`${keyvalue}V`]=="")
            {
                this.$vux.loading.show({text: '加载中...'});
                this.APIFunc.AjaxPost('signApply', {
                    onlineSignType: keyvalue,
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this[`${keyvalue}V`] = data.bizData.applyNo;
                        window.location.href = data.bizData.link;
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });
            }else{
                this.$vux.loading.show({text: '加载中...'});
                this.APIFunc.AjaxPost('signStatusQuery', {
                    applyNo: this[`${keyvalue}V`],        
                    onlineSignType: keyvalue,
                    updateStep: '/waitReview'
                }).then(data => {
                    this.$vux.loading.hide();
                    let keyvalue = keyvalue;
                    if(data.requestStatus =="SUCCESS"){
                        debugger
                        this.$vux.loading.show({text: '加载中...'});
                        this.APIFunc.AjaxPost('signApply', {
                            onlineSignType: keyvalue,
                        }).then(data => {
                            this.$vux.loading.hide();
                            if(data.requestStatus =="SUCCESS"){
                            debugger
                            }else
                            this.$vux.alert.show({title: '提示',content: data.returnMessage})
                        });
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });
            }
        },






        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.companyName!=""&&this.companyMail!="")
            {
                this.flg = false
                className = className.replace("button_dark","")
                this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
            }else{
                this.flg = true
                className = className.replace("button_gray","")
                this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
            }
        },
        SubmitNext(){
            let reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
            if(this.companyName==""){
                this.$vux.alert.show({title: '提示',content: '请输入公司全称',});
                return false;
            }
            if(this.companyMail==""){
                this.$vux.alert.show({title: '提示',content: '请输入邮箱',});
                return false;
            }else{
                if(!reg.test(this.companyMail)){
                    this.$vux.alert.show({title: '提示',content: '请输入正确邮箱',});
                    return false;
                }
            }
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('companyInfoQueryByChannel', {
                companyName: this.companyName,
                email: this.companyMail
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.setItem("company",JSON.stringify(data));
                    this.$router.push({
                        path: '/perfectionCompanyInfo',
                    })
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        backReturn(){
            this.$router.push({
                path: '/uploadCard2',
            })
        },
    },
  }

</script>

<style lang="scss" scoped>
.company_div i{
    display: block;
    width: 2rem;
    height: 1.6rem;
    margin-right: .2rem;
    background: url(https://china-mz.cn/bmimg/company.png) no-repeat;
    background-size: 100% 100%;
}
.text_div i{
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .2rem;
    background: url(https://china-mz.cn/bmimg/contract.png) no-repeat;
    background-size: 100% 100%;
}
.hint i{
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .2rem;
    background: url(https://china-mz.cn/bmimg/warn.svg) no-repeat;
    background-size: 100% 100%;
}
.positionS{
    position: fixed;
    z-index: 111;
    background: rgba(0, 0, 0, .5);
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 12rem;
}
</style>