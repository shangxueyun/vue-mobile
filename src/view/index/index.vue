<template>
    <div style="height: 100%;">
        <div class="header_div" style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header style="background-color:#06123C;padding: .6rem 0;" :left-options="{showBack: false}">首页</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: .8rem 1rem .5rem 1rem;text-align: left;background: #06123C;">
            <div style="font-size:1rem;color:rgba(255,255,255,.5)">授信额度(元)</div>
            <div :style="styleCss">{{creditAmount}}</div>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;display: flex;flex-direction: row;justify-content: end;align-items: normal;background:#121D44">
            <div style="width: 50%;text-align: center;position: relative;"><p style="font-size:1rem;color:rgba(255,255,255,.5)">可用额度(元)</p><p style="font-size:1.2rem;color:rgba(255,255,255,.5)">{{useAmount}}</p><span @click="remind" class="iocn_wr">提醒</span></div>
            <div style="width: 50%;text-align: center;"><p style="font-size:1rem;color:rgba(255,255,255,.5)">已用额度(元)</p><p style="font-size:1.2rem;color:rgba(255,255,255,.5)">{{canAmount}}</p></div>
        </div>
        <!--  -->
        <div class="IOCN_div account">
            <i></i>
            <div style="font-size:1.2rem;font-weight: bolder;color:#333">资金账户信息</div>
        </div>
        <div style="padding: 1rem;text-align: left;background:#fff">
            <div style="font-size:1rem;">账户余额(元)：{{accountBalance}}</div>
            <div style="font-size:1rem;">冻结余额(元)：{{freezeBalance}}</div>
            <div style="font-size:1rem;">可提现余额(元)：{{withdrewBalance}}</div>
        </div>
        <!--  -->
        <div class="IOCN_div bill" style="margin-top:1rem;">
            <i></i>
            <div style="font-size:1.2rem;font-weight: bolder;color:#333">发票池信息</div>
        </div>
        <div style="padding: 1rem;text-align: left;background:#fff">
            <div style="font-size:1rem;">发票池实时余额(元)：{{currentBalance}}</div>
            <div style="font-size:1rem;">上月核销发票金额(元)：{{cancelAmount}}</div>
            <div style="font-size:1rem;">上月新增发票金额(元)：{{addAmount}}</div>
        </div>
        <!--  -->
        <div class="IOCN_div other" style="margin-top:1rem;">
            <i></i>
            <div style="font-size:1.2rem;font-weight: bolder;color:#333">发票池信息</div>
        </div>
        <div style="text-align: left;background:#fff;">
            <cell @click.native="$router.push({path: '/outstandingLoan'})" title="待还款贷款列表" is-link></cell>
        </div>
        <div style="text-align: left;padding-bottom: 6rem;"></div>
        <!-- end -->
        <div style="position: fixed;bottom:0;left:0;z-index:1;width: 100%;">
            <tabbar class="tabbar_div">
                <tabbar-item selected link="">
                    <img slot="icon" src="../../assets/img/tabbar_index_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_index_on.png">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item  link="/applicationLoan">
                    <img slot="icon" src="../../assets/img/tabbar_loan_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_loan_on.png">
                    <span slot="label">申请贷款</span>
                </tabbar-item>
                <tabbar-item  link="/mine">
                    <img slot="icon" src="../../assets/img/tabbar_mine_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_mine_on.png">
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </div>

    </div>
</template>
<script>
import { Cell, XHeader,Tabbar, TabbarItem, } from 'vux'
export default {
    components: {
        Tabbar,
        TabbarItem,
        XHeader,
        Cell,
    },
    data() {
      return {
          creditAmount:'0',
          styleCss:'font-size:1rem;color:#fff;',
          useAmount:'0',
          canAmount:'0',
          accountBalance:'0.00',
          freezeBalance:'0.00',
          withdrewBalance:'0.00',
          currentBalance:'0.00',
          cancelAmount:'0.00',
          addAmount:'0.00',
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        document.body.scrollTop = 0
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('memberInfoQuery', {queryContentList:['BANK_ACCOUNT','INVOICE_POOL','CREDIT_ACCOUNT','COMPANY']
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                let {creditAccountInfo,bankAccountInfo,invoicePoolInfo,companyInfo} = data.bizData;
                if(Number(creditAccountInfo.creditAmount)==0)
                {
                    this.creditAmount = '批复中...';
                    this.styleCss = 'font-size:1rem;color:#fff;';
                }else{
                    this.creditAmount = this.APIFunc.stringDispose(Number(creditAccountInfo.creditAmount).toString());
                    this.styleCss = 'font-size:1.5rem;color:#fff;';
                }
                this.canAmount= this.APIFunc.stringDispose(Number(creditAccountInfo.useAmount).toString());
                this.useAmount = this.APIFunc.stringDispose((Number(creditAccountInfo.creditAmount) - Number(creditAccountInfo.useAmount)).toString());
                if(bankAccountInfo)
                {
                    this.accountBalance = this.string(bankAccountInfo.accountBalance/100);
                    this.freezeBalance = this.string(bankAccountInfo.freezeBalance/100);
                    this.withdrewBalance = this.string(bankAccountInfo.withdrewBalance/100);
                }
                if(invoicePoolInfo){
                    this.currentBalance = this.string(invoicePoolInfo.currentBalance);
                    this.cancelAmount = this.string(invoicePoolInfo.cancelAmount);
                    this.addAmount = this.string(invoicePoolInfo.addAmount);
                }
                if(companyInfo)
                {
                    window.sessionStorage.companyInfo = JSON.stringify({
                        companyName:companyInfo.companyName,
                        legalPersonName:companyInfo.legalPersonName,
                        accountNo:bankAccountInfo.accountNo,
                    });
                }
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        remind(){
            this.$vux.alert.show({title: '提醒',content: '若您有部分应收账款付款方的回款账户未作变更，或者已用额度大于0，可用额度将低于预授信额度。'});
        },
        string:function(str){if(str==null){return "-"}else{
                return Number(str).toFixed(2)
        }},
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
.iocn_wr{
    display: block;
    width: 2.5rem;
    height: 1rem;
    position: absolute;
    right: -.5rem;
    top: 0;
    color:rgba(255,255,255,.5);
    font-size: 1rem;
}
.iocn_wr::before{
    content: "";
    position: absolute;
    top: 0;
    left: -.8rem;
    width: 1rem;
    height: 1rem;
    background: url(https://china-mz.cn/bmimg/warn_red.svg) no-repeat;
    background-size: 100%;
}
.IOCN_div{
    padding: .5rem 1rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: normal;
    background:#fff;
    border-bottom: 1px solid #ddd;
}
.IOCN_div i{
    display: block;
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.2rem;
}
.account i{
    background: url(https://china-mz.cn/bmimg/account.svg) no-repeat;
    background-size: 100%;
}
.bill i{
    background: url(https://china-mz.cn/bmimg/bill.svg) no-repeat;
    background-size: 100%;
}
.other i{
    background: url(https://china-mz.cn/bmimg/other.svg) no-repeat;
    background-size: 100%;
}
</style>