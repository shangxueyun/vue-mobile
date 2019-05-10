<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn('/mine')" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">已还款贷款</x-header>
        </div>
        <div style="padding-top:3.8rem"></div>
        <div v-for="(item,key) in loanList" :key="key" >
            <div style="padding:.8rem 1rem 0.8rem;background-color:#fff;text-align: left;" @click="backReturn" :data="JSON.stringify(item)">
                <cell class="hr_list4" style="font-size:1rem;padding:0;" :title="item.loanAmt" value="已还款"></cell>
                <cell class="hr_list4 color_4" style="font-size:1rem;padding:0;color:#999" title="应还本金+利息总额" :value="'申请日'+item.loanApplyDate"></cell>
            </div>
            <div class="item_div" style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        </div>
        <divider  id="cut-off">没有更多了</divider>
    </div>
</template>
<script>
import { XHeader,Cell,Divider } from 'vux'
export default {
    components: {
        XHeader,
        Cell,
        Divider
    },
    data() {
      return {
          loanList:[],
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
        this.APIFunc.AjaxPost('queryRepayPlan', {
            orderType: 'LOAN',
            status: 'RF',
            page: 1,
            pageSize: 999
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                if(data.bizData)
                this.loanList = JSON.parse(JSON.stringify(data.bizData.loanList));
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        backReturn(str){
            if(str=="/mine"){
                this.$router.push({
                    path: '/mine',
                })
            }else{
                this.$router.push({
                    path: '/repaidLoanDetails',
                    query:{
                        agreementId:JSON.parse(str.currentTarget.attributes.data.value)["agreementId"],
                        amount:JSON.parse(str.currentTarget.attributes.data.value)["amount"],
                    }
                })
            }
        },
    },
    updated(){
        document.getElementById('cut-off').previousElementSibling.lastElementChild.style.height = "0px";
    }
  }

</script>

<style>
.hr_list4::before{
    display: none;
}
.hr_list4 .weui-cell__ft{
    color: #333;
}
.color_4 .weui-cell__ft{
    color: #999;
}
/* .item_div:last-child{
    height: 0px !important;
} */
</style>