<template>
    <div style="height: 100%;" class="pendingLoanDetails">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">受理中贷款详情</x-header>
        </div>
        <div style="padding-top:3.8rem;text-align: left;background:#fff;">
            <cell title="状态" value="受理中" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="申请贷款金额" :value="objData.loanAmt+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="贷款利率" :value="objData.loanRate+'%'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="应还利息" :value="objData.interest+'元'" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="贷款期限" :value="objData.loanTerm+objData.termUnit" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="发起申请日" :value="objData.gmtCreate" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="应还总额" :value="objData.Total+'元'" ></cell>
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
            loanAmt:'',
            loanRate:'',
            interest:'',
            loanTerm:'',
            termUnit:'',
            gmtCreate:'',
            Total:'',
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
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('queryApplyRecordDetail', {
            loanApplyNo: this.$route.query.loanNo,
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
                this.objData.Total = Number(obj.loanAmt)+Number(obj.interest)
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        backReturn(){
            this.$router.push({
                path: '/pendingLoan',
            })
        },
    },
    updated(){

    }
  }

</script>
<style>
.pendingLoanDetails .weui-cell__ft{
    color: #000;
}
.pendingLoanDetails .vux-label{
    color: #999;
}
</style>