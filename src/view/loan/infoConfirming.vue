<template>
    <div style="height: 100%;">
        <div class="header_div" style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">信息确认</x-header>
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
        <div class="company_div" style="padding: .5rem 1rem;margin-top: 1rem;background: rgb(255, 255, 255);text-align: left;border-bottom: 1px solid #ddd;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#fff">
            <i></i>
            <div style="font-size:1rem;font-weight: bolder;color:#000">企业注册信息</div>
        </div>
        <div class="LIST" style="text-align: left;background:#fff;padding-bottom: 1rem;">
            <cell title="企业名称：" :value="companyName" ></cell>
            <cell title="法定代表人名称：" :value="legalPersonName" ></cell>
            <cell title="法定代表人手机号：" :value="phone" ></cell>
            <cell title="资金监管专户账号：" :value="accountNo" ></cell>
        </div>
        <div style="padding:1rem;">
            <x-button  class="button_dark" type="primary"  ref="button" @click.native="positionS_Lo = true" action-type="button">确认无误，申请贷款</x-button>
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
                    <x-input title="" style="background-color:#fff;text-align: left;" :show-clear="false" type="number" v-model="verificationVlu" placeholder="请输入验证码"></x-input>
                    <x-button :mini="true" style="width: 34%;height: 2rem;font-size: .8rem;padding: 0;" @click.native="verificationFunc" plain>{{verificationmsg}}</x-button>
                </div>
                <div style="padding:.5rem 5rem 1rem 5rem;color:#999;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;background:#fff;border-radius: 0px 0px 10px 10px;">
                    <div @click="positionS_Lo = false" style="font-size:1.2rem;color:#333">否</div>
                    <div @click="loanApply" style="font-size:1.2rem;color:#1AAD19">是</div>
                </div>                
            </div>

        </div>
    </div>
</template>
<script>
import { Cell, XHeader,Tabbar, TabbarItem,XInput,XButton,PopupPicker,TransferDom } from 'vux'
export default {
    components: {
        XHeader,
        XInput,
        XButton,
        Cell,
    },
    data() {
      return {
        applyAmount:this.$route.query.applyAmount,
        loanY:this.$route.query.loanTerm + this.$route.query.loanTermUnitDescription,
        loanRate:this.$route.query.loanRate,
        applyAmountSE:Number(this.$route.query.applyAmount.replace(/,/g, '')) + Number(this.$route.query.serverMountvalue),
        serverMountvalue:this.$route.query.serverMountvalue,
        companyName:JSON.parse(sessionStorage.companyInfo)['companyName'],
        legalPersonName:JSON.parse(sessionStorage.companyInfo)['legalPersonName'],
        phone:sessionStorage.phone,
        accountNo:'',
        positionS_Lo:false,
        verificationVlu:'',
        verificationmsg:"获取验证码",
        verificationFlg:false,
        textV:window.sessionStorage.phone.substring(0, 3) + '****' + window.sessionStorage.phone.substring(7),
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
        if(JSON.parse(sessionStorage.companyInfo)['accountNo']!=null)
        this.accountNo = JSON.parse(sessionStorage.companyInfo)['accountNo']
        else
        this.accountNo = '-'

        window.flgNum = 60;
        window.Setflg = null;
        window.OutFlg = null;
        let returnAmount = Number(this.$route.query.applyAmount.replace(/,/g, '')) * this.$route.query.loanRate / 100 / (this.$route.query.loanTermUnitDescription === '月' ? 12 : this.$route.query.loanTermUnitDescription === 'YEAR' ? 1 : this.$route.query.loanTermUnitDescription === 'DAY' ? 365 : 0) * this.$route.query.loanTerm ;
        this.applyAmountSE = (Number(this.$route.query.applyAmount.replace(/,/g, '')) + Number(returnAmount)).toFixed(2)
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
                    bizType: 'LOAN_APPLY'
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
        loanApply(){
            if(this.verificationVlu != "")
            {
                this.$vux.loading.show({text: '加载中...'})
                this.APIFunc.AjaxPost('loanApply', {
                    productCode: this.$route.query.productCode,
                    applyAmount: Number(this.$route.query.applyAmount.replace(/,/g, '')),
                    verifyCode: this.verificationVlu,
                    contractNo: new Date().getTime()
                }).then(data => {
                    this.$vux.loading.hide()
                    if(data.requestStatus =="SUCCESS"){
                        this.$router.push({
                            //后续添加跳转页面
                            path: '/pendingLoan',
                        })
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                })   
            }else
            this.$vux.alert.show({title: '提示',content: "请输入验证码"})
        },
        SubmitNext(){

        },
        backReturn(){
            this.$router.push({
                path: '/applicationLoan',
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
.company_div i{
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
    background: url(https://china-mz.cn/bmimg/firm.svg) no-repeat;
    background-size: 100%;
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
    background: rgba(0, 0, 0, .5);
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 12rem;
}
</style>