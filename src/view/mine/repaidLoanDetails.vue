<template>
    <div style="height: 100%;" class="repaidLoanDetails">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">已还款贷款详情</x-header>
        </div>
        <div style="padding-top:3.8rem;text-align: left;background:#fff;">
            <cell title="状态" value="已还款" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="应还本金" :value="objData.loanAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="贷款利率" :value="objData.loanRate+'%'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="应还利息" :value="objData.interest+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="放款日期" :value="objData.loanStartDate" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="贷款到期日" :value="objData.loanEndDate" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="贷款期限" :value="objData.loanTerm+objData.termUnit" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="逾期罚息日利率" :value="objData.delayRate" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="已还金额" :value="objData.repayAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="逾期金额" :value="objData.delayAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="已产生罚息总额" value="-" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="剩余应还总额" :value="objData.awaitRepayAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="服务费率" :value="objData.feeRate+'%'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="服务费金额" :value="objData.feeAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="服务费支付方式" :value="objData.feeMode" ></cell>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;background:#fff;border-top:1px solid #ddd;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;">
            <div style="font-size:1rem;color: #999;">借款合同</div>
            <div style="font-size:1rem;color: #000;"><a style="font-size:1rem;color: #2e6bbe;" target="1" :href="'http://47.99.169.202/static/pdf/web/viewer.html?file=/html/'+objData.loanNo+'-LOAN.pdf'">《借款合同》</a></div>
        </div>
        <div style="padding: .5rem 1rem;text-align: left;background:#fff;border-top:1px solid #ddd;display: flex;flex-direction: row;justify-content: space-between;align-items: normal;">
            <div style="font-size:1rem;color: #999;">担保合同</div>
            <div style="font-size:1rem;color: #000;"><a style="font-size:1rem;color: #2e6bbe;" target="1" :href="'http://47.99.169.202/static/pdf/web/viewer.html?file=/html/'+objData.loanNo+'-GUARANTEE.pdf'">《担保合同》</a></div>
        </div>
    </div>
</template>

<script>
import { XHeader,Cell, } from 'vux'
export default {
    components: {
        XHeader,
        Cell,
    },
    data() {
      return {
        objData:{
            loanAmt:this.$route.query.amount,
            loanRate:'',
            interest:'',
            loanTerm:'',
            termUnit:'',
            loanStartDate:'',
            loanEndDate:'',
            delayRate:'',
            repayAmt:'',
            delayAmt:'',
            awaitRepayAmt:'',
            feeRate:'',
            feeAmt:'',
            feeMode:'',
            loanNo:'',
        },
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
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('queryApplyRecordDetail', {
            agreementId: this.$route.query.agreementId,
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                let obj = data.bizData;
                for(let i in this.objData)
                {
                    for(let o in obj)
                    {
                        if(o == i)
                        {
                            this.objData[i] = obj[o]
                        }
                    }
                }
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        backReturn(){
            this.$router.push({
                path: '/repaidLoan',
            })
        },
    },
    updated(){

    }
  }

</script>
<style>
.repaidLoanDetails .weui-cell__ft{
    color: #000;
}
.repaidLoanDetails .vux-label{
    color: #999;
}
</style>