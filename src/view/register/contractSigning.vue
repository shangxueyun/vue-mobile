<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">合同签署</x-header>
        </div>
        <div class="schedule1" style="margin-top: 3.2rem;padding: 1.5rem 0.8rem;background: rgb(6, 18, 60);">
            <flow>
                <flow-state state="1" title="上传资料" is-done></flow-state>
                <flow-line is-done></flow-line>

                <flow-state state="2" title="信息确认" is-done></flow-state>
                <flow-line></flow-line>

                <flow-state state="3" title="合同签署" is-done></flow-state>
            </flow>
        </div>
        <div class="company_div" style="padding: .5rem 1rem;text-align: left;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#fff">
            <i></i>
            <div>公司名称</div>
        </div>
        <div style="padding: 0rem;text-align: left;background:#fff">
            <cell title="企业名称" :value="companyName" ></cell>
        </div>
        <div style="padding: 0rem;text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="企业法定代表人手机号码" :value="legalPersonPhone" ></cell>
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
            <check-icon :value.sync="check"  type="plain"><span style="font-size:1rem;">我已经详细阅读并确认以上协议及信息</span></check-icon>
        </div>
        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_dark" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>


        <div class="positionS" v-show="positionS_Lo">
            <div style="width: 86%;height: auto; margin: 0 auto;">
                <div class="hint" style="padding: 1rem 1rem 0rem 1rem;text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: normal;background:#fff;border-radius: 10px 10px 0px 0px;">
                    <i></i>
                    <div>提示</div>
                </div>
                <div style="padding: 1rem 1rem 0rem 1rem;color:#999;background:#fff;text-align: left;">
                    即将进行法定代表人手机验证，验证通过后即表示贵公司授权我司第三方平台申请贵司的电子CA证书完成协议签署并提交额度申请。
                </div>
                <div style="padding:0rem 1rem 0rem 0rem;color:#999;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;background:#fff">
                    <x-input title="" style="background-color:#fff;text-align: left;" :show-clear="false" type="text" v-model="verificationVlu" placeholder="请输入验证码"></x-input>
                    <x-button :mini="true" style="width: 34%;height: 2rem;font-size: .8rem;padding: 0;" @click.native="verificationFunc" plain>{{verificationmsg}}</x-button>
                </div>
                <div style="padding:.5rem 5rem 1rem 5rem;color:#999;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;background:#fff;border-radius: 0px 0px 10px 10px;">
                    <div @click="positionS_Lo = false" style="font-size:1.2rem;color:#333">否</div>
                    <div @click="verifySMSAuthCode" style="font-size:1.2rem;color:#1AAD19">是</div>
                </div>                
            </div>

        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHeader,XInput,Cell,CheckIcon,Flow, FlowState, FlowLine } from 'vux'
export default {
    components: {
        Flow,
        FlowState,
        FlowLine,
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
        companyName:'',
        legalPersonPhone:'',
        positionS_Lo:false,
        verification:false,
        verificationVlu:'',
        verificationFlg:false,
        verificationmsg:"获取验证码",
        check:false
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
        this.getInfo();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    },  
    methods: {
        getInfo(){
            this.$vux.loading.show({text: '加载中...'})
            this.APIFunc.AjaxPost('memberInfoQuery', {
                queryContentList: ['COMPANY']
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.token = data.bizData.token;
                    this.companyName = data.bizData.companyInfo.companyName;
                    this.legalPersonPhone = data.bizData.companyInfo.legalPersonPhone;
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
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
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this.flg = true;
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
                        window.sessionStorage["verificationVlu"] = this.verificationVlu
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                })   
            }else
            this.$vux.alert.show({title: '提示',content: "请输入验证码"})
        },
        Query_function(e){
            let keyvalue = e.target.attributes.name.value;
            let tuna = this,h,hrefs;
            let keyvalueV = window.sessionStorage[`${keyvalue}V`];
            if(window.sessionStorage.verificationVlu)
            {
                if(keyvalueV==undefined)
                {
                    this.$vux.loading.show({text: '加载中...'});
                    this.APIFunc.AjaxPost('signApply', {
                        onlineSignType: keyvalue,
                    }).then(data => {
                        this.$vux.loading.hide();
                        if(data.requestStatus =="SUCCESS"){
                            window.sessionStorage[`${keyvalue}V`] = data.bizData.applyNo;
                            h = window.location.href;
                            if(h.indexOf('?')>=0)
                            hrefs = h.substr(0,h.indexOf('?'));
                            else
                            hrefs = h;
                            window.location.href = data.bizData.link+`&backUrl=${hrefs}`;
                        }else
                        this.$vux.alert.show({title: '提示',content: data.returnMessage})
                    });
                }else{
                    this.$vux.loading.show({text: '加载中...'});
                    this.APIFunc.AjaxPost('signStatusQuery', {
                        applyNo: keyvalueV,        
                        onlineSignType: keyvalue,
                        updateStep: '/pages/upload_file/state_of_check'
                    }).then(data => {
                        this.$vux.loading.hide();
                        if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                        {
                            window.sessionStorage[keyvalue] = "SUCCESS";
                            window.location.href=`http://47.99.169.202/static/pdf/web/viewer.html?file=/html/${window.sessionStorage.memberId}-${keyvalue}.pdf`;
                        }else{
                            let keyvalueObj = {
                                onlineSignType: keyvalue,
                            };
                            this.$vux.loading.show({text: '加载中...'});
                            this.APIFunc.AjaxPost('signApply', keyvalueObj).then(data => {
                                this.$vux.loading.hide();
                                if(data.requestStatus =="SUCCESS"){
                                    window.sessionStorage[`${keyvalueObj.onlineSignType}V`] = data.bizData.applyNo;
                                    h = window.location.href;
                                    if(h.indexOf('?')>=0)
                                    hrefs = h.substr(0,h.indexOf('?'));
                                    else
                                    hrefs = h;
                                    window.location.href = data.bizData.link+`&backUrl=${hrefs}`;
                                }else
                                this.$vux.alert.show({title: '提示',content: data.returnMessage})
                            });                  
                        }
                    });
                }                
            }else
            this.$vux.alert.show({title: '提示',content: "请进行电子签章授权及验证"});
        },
        SubmitNext(){
            let applyNo,tanu = this;
            let {REGISTER,PERSON_CREDIT_QUERY,COMPANY_CREDIT_QUERY} = window.sessionStorage;
            if(window.sessionStorage["verificationVlu"]){
                if(REGISTER==undefined){
                    this.$vux.alert.show({title: '提示',content: '请进行会员注册协议签署',});
                    return false;
                }else if(PERSON_CREDIT_QUERY==undefined){
                    this.$vux.alert.show({title: '提示',content: '请进行个人信息授权书签署',});
                    return false;
                }else if(COMPANY_CREDIT_QUERY==undefined){
                    this.$vux.alert.show({title: '提示',content: '请进行企业数据授权书签署',});
                    return false;
                }

                if(REGISTER=="SUCCESS"&&PERSON_CREDIT_QUERY=="SUCCESS"&&COMPANY_CREDIT_QUERY=='SUCCESS')
                {
                    if(tanu.check){
                        this.$router.push({
                            path: '/waitReview',
                        })
                    }else
                    this.$vux.alert.show({title: '提示',content: '请选中我已经详细阅读并确认以上协议及信息',});
                }else{
                    this.$vux.loading.show({text: '加载中...'});
                    this.APIFunc.AjaxPost('signApply', {
                        onlineSignType: "REGISTER",
                    }).then(data => {
                        this.$vux.loading.hide();
                        if(data.requestStatus =="SUCCESS"){
                            let applyNo = data.bizData.applyNo;
                            this.$vux.loading.show({text: '加载中...'});
                            this.APIFunc.AjaxPost('signStatusQuery', {
                                applyNo: applyNo,        
                                onlineSignType: "REGISTER",
                                updateStep: '/pages/upload_file/state_of_check'
                            }).then(data => {
                                this.$vux.loading.hide();
                                if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                                {
                                    this.$vux.loading.show({text: '加载中...'});
                                    this.APIFunc.AjaxPost('signStatusQuery', {
                                        applyNo: applyNo,        
                                        onlineSignType: "PERSON_CREDIT_QUERY",
                                        updateStep: '/pages/upload_file/state_of_check'
                                    }).then(data => {
                                        this.$vux.loading.hide();
                                        if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                                        {
                                            this.$vux.loading.show({text: '加载中...'});
                                            this.APIFunc.AjaxPost('signStatusQuery', {
                                                applyNo: applyNo,        
                                                onlineSignType: "COMPANY_CREDIT_QUERY",
                                                updateStep: '/pages/upload_file/state_of_check'
                                            }).then(data => {
                                                this.$vux.loading.hide();
                                                if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                                                {
                                                    if(tanu.check){
                                                        window.sessionStorage.removeItem("verificationVlu")
                                                        window.localStorage.removeItem("token");
                                                        this.$router.push({
                                                            path: '/waitReview',
                                                        })
                                                    }else
                                                    this.$vux.alert.show({title: '提示',content: '请选中我已经详细阅读并确认以上协议及信息',});
                                                }else{
                                                    this.$vux.alert.show({title: '提示',content: '请进行企业数据授权书签署',});
                                                    return false;
                                                }
                                            });
                                        }else{
                                            this.$vux.alert.show({title: '提示',content: '请进行个人信息授权书签署',});
                                            return false;
                                        }
                                    });
                                }else{
                                    this.$vux.alert.show({title: '提示',content: '请进行会员注册协议签署',});
                                    return false;
                                }
                            });
                        }else
                        this.$vux.alert.show({title: '提示',content: data.returnMessage})
                    });
                }
            }else
            this.$vux.alert.show({title: '提示',content: "请进行电子签章授权及验证"});
        },
        backReturn(){
            this.$router.push({
                path: '/faceFecognition',
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
    background: rgba(0, 0, 0, .5);
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 12rem;
}
</style>
<style>
.schedule1 .weui-wepay-flow__li_done .weui-wepay-flow__state {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 1rem;
    top: -.3rem;
    background: #fff;
    color: rgb(6, 18, 60);
    font-weight: bolder;
    font-size: 1rem;
}
.schedule1 .weui-wepay-flow__li_done {
    background: #333;
    color:#333;
}
.schedule1 .weui-wepay-flow__li .weui-wepay-flow__state {
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    border-radius: 1rem;
    top: -.3rem;
    background: #fff;
    color: #06123C;
    font-weight: bolder;
    font-size: 1rem;
}
.schedule1 .weui-wepay-flow__line {
    background-color: #fff;
}
.schedule1 .weui-wepay-flow__line_done .weui-wepay-flow__process {
    background: #fff;
}
.schedule1 .weui-wepay-flow__title-bottom {
    color:#82889D;
}
.schedule1 .weui-wepay-flow__li_done .weui-wepay-flow__title-bottom {
    color: #fff;
} 
</style>