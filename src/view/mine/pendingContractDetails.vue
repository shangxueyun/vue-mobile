<template>
    <div style="height: 100%;">
        <div class="header_div" style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">待签订合同详情页</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: .8rem 1rem .5rem 1rem;text-align: left;background: #06123C;">
            <div style="font-size:.8rem;color:rgba(255,255,255,.5)">借款本金金额(元)</div>
            <div style="font-size:2rem;color:#fff;">{{applyAmount}}</div>
        </div>
        <!--  -->
        <div class="listDiv">
            <div style="border-right:1px solid #ddd;width: 16%;">
                {{loanY}}
                <br>
                <span style="font-size:.6rem;color:#999999">借款期限</span>
            </div>
            <div style="border-right:1px solid #ddd;width: 16%;">
                {{loanRate}}%
                <br>
                <span style="font-size:.6rem;color:#999999">年化利率</span>
            </div>
            <div style="width: 34%;">
                {{applyAmountSE}}
                <br>
                <span style="font-size:.6rem;color:#999999">应还总额(元)</span>
            </div>
            <div style="border-left:1px solid #ddd;width: 26%;">
                {{serverMountvalue}}
                <br>
                <span style="font-size:.6rem;color:#999999">服务费用(元)</span>
            </div>
        </div>
        <div class="text_div" style="padding: .5rem 1rem;;text-align: left;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#fff">
            <i></i>
            <h3 style="color:#333">合同文本</h3>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;background:#fff">
            <x-button :mini="true" style="width:100%" @click.native="positionS_Lo = true" action-type="button">点击进行电子签章授权及验证</x-button>
        </div>
        <div style="padding: 0rem 1rem;text-align: left;background:#fff">
            <span @click="Query_function" name="LOAN" style="font-size:1rem;color:#2e6bbe">《借款合同》</span>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;background:#fff">
            <span @click="Query_function" name="GUARANTEE" style="font-size:1rem;color:#2e6bbe">《担保合同》</span>
        </div>
        <div style="padding: 0.5rem 1rem 1rem 1rem;text-align: left;background:#fff">
            <check-icon :value.sync="check"  type="plain"><span style="font-size:1rem;">我已经详细阅读并确认以上协议及信息</span></check-icon>
        </div>
        <div style="padding:1rem;">
            <x-button  class="button_dark" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">确认提交</x-button>
        </div>
        <div style="text-align: center;font-size:1rem;color:#999999">
            <div>信息不可修改，修改请联系客服人员</div>
        </div>
        <div style="text-align: center;font-size:1rem;color:#999999;display: flex;flex-direction: row;justify-content: center;align-items: normal;">
            <img style="margin-right: 0.5rem;width: 1.5rem;" src="https://china-mz.cn/bmimg/customer_service.svg" alt="">
            <a style="font-size:1rem;color:#06123C;line-height: 2rem;" href="tel:021-68888083">021-68888083</a>
        </div>

        <div class="positionS" v-show="positionS_Lo">
            <div style="width: 86%;height: auto; margin: 0 auto;">
                <div class="hint" style="padding: 1rem 1rem 0rem 1rem;text-align: center;display: flex;flex-direction: row;justify-content: center;align-items: normal;background:#fff;border-radius: 10px 10px 0px 0px;">
                    <i></i>
                    <div>提示</div>
                </div>
                <div style="padding: 1rem;color: rgb(153, 153, 153);background: rgb(255, 255, 255);text-align: left;font-size: 1.1rem;">
                    向法人手机{{textV}}发送验证码。
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
import { Cell, XHeader,Tabbar, TabbarItem,XInput,XButton,PopupPicker,TransferDom,CheckIcon } from 'vux'
export default {
    components: {
        XHeader,
        XInput,
        XButton,
        Cell,
        CheckIcon
    },
    data() {
      return {
        applyAmount:'',
        loanY:'',
        loanRate:'',
        applyAmountSE:'',
        serverMountvalue:'',
        positionS_Lo:false,
        verificationVlu:'',
        verificationmsg:"获取验证码",
        verificationFlg:false,
        textV:window.sessionStorage.phone.substring(0, 3) + '****' + window.sessionStorage.phone.substring(7),
        info: {
            contractNo: '',
            loanAmt: '',
            loanRate: '',
            interest: '',
            loanTerm: '',
            fundSideId: '',
            onlineSignType: ''
        },
        check:false,
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
        window.flgNum = 60;
        window.Setflg = null;
        window.OutFlg = null;

        window.localStorage.token = window.sessionStorage.token;

        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('queryApplyRecordDetail', {
            loanApplyNo: window.sessionStorage.loanNo,
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                this.applyAmount = data.bizData.loanAmt
                this.loanY = data.bizData.loanTerm+data.bizData.termUnit
                this.loanRate = data.bizData.loanRate
                this.applyAmountSE = data.bizData.awaitRepayAmt
                this.serverMountvalue = data.bizData.interest;
                for(let i in this.info)
                {
                    for(let o in data.bizData)
                    {
                        if(o==i)
                        {
                            this.info[i] = data.bizData[o];
                        }
                    }
                }
                this.info.fundSideId = window.sessionStorage.fundSideId;
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
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
            if(this.verificationVlu)
            {
                this.$vux.loading.show({text: '加载中...'});
                this.APIFunc.AjaxPost('verifySMSAuthCode', {
                    verifyCode: this.verificationVlu,
                    bizType: 'PHONE_NO_VERIFY'
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this.positionS_Lo = false;
                        window.sessionStorage["verificationVlu"] = this.verificationVlu
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });
            }else
            this.$vux.alert.show({title: '提示',content: '请发送验证码'})
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
                    this.info.onlineSignType = keyvalue;
                    this.APIFunc.AjaxPost('signApply', this.info).then(data => {
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
                        loanApplyNo:window.sessionStorage.loanNo,
                        onlineSignType: keyvalue,
                        updateStep: '/pages/upload_file/state_of_check'
                    }).then(data => {
                        this.$vux.loading.hide();
                        if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                        {
                            window.sessionStorage[keyvalue] = "SUCCESS";
                            window.location.href=`http://47.99.169.202/static/pdf/web/viewer.html?file=/html/${window.sessionStorage.loanNo}-${keyvalue}.pdf`;
                        }else{
                            this.info.onlineSignType = keyvalue;
                            this.$vux.loading.show({text: '加载中...'});
                            this.APIFunc.AjaxPost('signApply', this.info).then(data => {
                                this.$vux.loading.hide();
                                if(data.requestStatus =="SUCCESS"){
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
            let {LOAN,GUARANTEE} = window.sessionStorage;
            if(window.sessionStorage["verificationVlu"]){
                if(LOAN=="SUCCESS"&&GUARANTEE=="SUCCESS")
                {
                    if(tanu.check){
                        this.modifyStatus();
                    }else
                    this.$vux.alert.show({title: '提示',content: '请选中我已经详细阅读并确认以上协议及信息',});
                }else{
                    this.info.onlineSignType = 'LOAN';
                    this.$vux.loading.show({text: '加载中...'});
                    this.APIFunc.AjaxPost('signApply', this.info).then(data => {
                        this.$vux.loading.hide();
                        if(data.requestStatus =="SUCCESS"){
                            let applyNo = data.bizData.applyNo;
                            this.$vux.loading.show({text: '加载中...'});
                            this.APIFunc.AjaxPost('signStatusQuery', {
                                applyNo: window.sessionStorage[`LOANV`],        
                                onlineSignType: "LOAN",
                                loanApplyNo:window.sessionStorage.loanNo,
                                updateStep: '/pages/upload_file/state_of_check'
                            }).then(data => {
                                this.$vux.loading.hide();
                                if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                                {
                                    this.$vux.loading.show({text: '加载中...'});
                                    this.APIFunc.AjaxPost('signStatusQuery', {
                                        applyNo: window.sessionStorage[`GUARANTEEV`],        
                                        onlineSignType: "GUARANTEE",
                                        loanApplyNo:window.sessionStorage.loanNo,
                                        updateStep: '/pages/upload_file/state_of_check'
                                    }).then(data => {
                                        this.$vux.loading.hide();
                                        if(data.bizData.signStatus == "1" || data.bizData.signStatus == "3")
                                        {
                                            if(tanu.check){
                                                this.modifyStatus();
                                            }else
                                            this.$vux.alert.show({title: '提示',content: '请选中我已经详细阅读并确认以上协议及信息',});
                                        }else{
                                            this.$vux.alert.show({title: '提示',content: '请进行担保合同签署',});
                                            return false;
                                        }
                                    });
                                }else{
                                    this.$vux.alert.show({title: '提示',content: '请进行借款合同签署',});
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
        modifyStatus(){
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('modifyStatus', {
                loanApplyNo: window.sessionStorage.loanNo,
                status: 'FUND_OUT_PROCESSING'
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.removeItem("GUARANTEEV");
                    window.sessionStorage.removeItem("LOANV");
                    window.sessionStorage.removeItem("LOAN");
                    window.sessionStorage.removeItem("GUARANTEE");
                    window.sessionStorage.removeItem("fundSideId");
                    window.sessionStorage.removeItem("loanNo");
                    window.sessionStorage.removeItem("verificationVlu");
                    window.localStorage.removeItem("token");
                    this.$router.push({
                        path: '/waitReview',
                        query:{
                            type:1
                        }
                    })
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        backReturn(){
            this.$router.push({
                path: '/pendingContract',
            })
        },
    },
  }

</script>

<style lang="less">
.tabbar_div .weui-tabbar__item {
    padding: .3rem 0rem;
}
.tabbar_div span{
    font-size: .5rem !important;
}
.header_div h1 {
    font-size: 1rem !important;
}
.listDiv{
    padding: 1rem .5rem;
    background: rgb(255, 255, 255);
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: normal;
}
.listDiv div{
    margin-left: 6px;
    font-size: 1rem;
    color: #333;
    line-height: 1.2rem;
    font-weight: 300;
}
.text_div i{
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: .2rem;
    background: url(https://china-mz.cn/bmimg/contract.png) no-repeat;
    background-size: 100% 100%;
}
.LIST .vux-label{
    color: #999999;
}
.LIST .weui-cell__ft{
    color: #333;
    font-size: 1rem;
    text-align: left;
}
.LIST .weui-cell:before{
    display: none;
}
.LIST .weui-cell {
    padding: .5rem 1rem 0rem 1rem;
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
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 12rem;
}
</style>