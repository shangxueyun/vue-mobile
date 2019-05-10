<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn('/mine')" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">待还款贷款</x-header>
        </div>
        <div style="padding-top:3.8rem">
            <tab active-color="rgb(6, 18, 60)" style="font-size:1rem;" custom-bar-width="6rem" default-color="#333" animate>
                <tab-item style="font-size:1rem;" selected @on-item-click="onItemClick('J')">即将到期贷款</tab-item>
                <tab-item style="font-size:1rem;" @on-item-click="onItemClick('Y')">逾期贷款</tab-item>
            </tab>
        </div>
        <div v-show="showDiv">
            <div v-for="(item,key) in loanList" :key="key" >
                <div style="padding:.8rem 1rem 0.8rem;background-color:#fff;text-align: left;" @click="backReturn" :data="JSON.stringify(item)">
                    <cell class="hr_list7" style="font-size:1rem;padding:0;" :title="item.amount" value="即将到期"></cell>
                    <cell class="hr_list7 color_7" style="font-size:1rem;padding:0;color:#999" title="应还本金+利息总额" :value="'到期日'+item.lastRepayDate"></cell>
                </div>
                <div class="item_div" style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
            </div>
            <divider  id="cut-off">没有更多了</divider>        
        </div>
        <div v-show="showDiv1">
            <div v-for="(item,key) in loanList1" :key="key" >
                <div style="padding:.8rem 1rem 0.8rem;background-color:#fff;text-align: left;" @click="backReturn" :data="JSON.stringify(item)">
                    <cell class="hr_list7" style="font-size:1rem;padding:0;" :title="item.amount" value="即将到期"></cell>
                    <cell class="hr_list7 color_7" style="font-size:1rem;padding:0;color:#999" title="应还本金+利息总额" :value="'到期日'+item.lastRepayDate"></cell>
                </div>
                <div class="item_div" style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
            </div>
            <divider  id="cut-off1">没有更多了</divider>        
        </div>
    </div>
</template>
<script>
import { XHeader,Cell,Divider,Tab, TabItem, } from 'vux'
export default {
    components: {
        XHeader,
        Cell,
        Tab,
        TabItem,
        Divider
    },
    data() {
      return {
          loanList:[],
          loanList1:[],
          showDiv:true,
          showDiv1:false,
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
            status: 'AR',
            page: 1,
            pageSize: 999
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                if(data.bizData)
                this.loanList = JSON.parse(JSON.stringify(data.bizData.list));
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('queryRepayPlan', {
            orderType: 'LOAN',
            status: 'RETL',
            page: 1,
            pageSize: 999
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                if(data.bizData)
                this.loanList1 = JSON.parse(JSON.stringify(data.bizData.list));
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        onItemClick(e){
            if(e == "J")
            {
                this.showDiv = true;
                this.showDiv1 = false;
            }else{
                this.showDiv = false;
                this.showDiv1 = true;
            }
        },
        backReturn(str){
            if(str=="/mine"){
                this.$router.push({
                    path: '/mine',
                })
            }else{
                if(JSON.parse(str.currentTarget.attributes.data.value)["status"] == "AWAIT_REPAY")
                {
                    this.$router.push({
                        path: '/outstandingLoanDetailsExpire',
                        query:{
                            agreementId:JSON.parse(str.currentTarget.attributes.data.value)["agreementId"],
                            amount:JSON.parse(str.currentTarget.attributes.data.value)["amount"]
                        }
                    });
                }else{
                    this.$router.push({
                        path: '/outstandingLoanDetailsOverdue',
                        query:{
                            agreementId:JSON.parse(str.currentTarget.attributes.data.value)["agreementId"],
                            amount:JSON.parse(str.currentTarget.attributes.data.value)["amount"],
                        }
                    })                    
                }
            }
        },
    },
    updated(){
        if(this.showDiv&&this.loanList.length>0)
        document.getElementById('cut-off').previousElementSibling.lastElementChild.style.height = "0px";
        if(this.showDiv1&&this.loanList1.length>0)
        document.getElementById('cut-off1').previousElementSibling.lastElementChild.style.height = "0px";
    }
  }

</script>

<style>
.hr_list7::before{
    display: none;
}
.hr_list7 .weui-cell__ft{
    color: #333;
}
.color_7 .weui-cell__ft{
    color: #999;
}
/* .item_div:last-child{
    height: 0px !important;
} */
  .tab-component .vux-tab .vux-tab-item {
    display: inline-block;
    width: auto;
    height: 100%;
    padding: 0 10px;
    flex: none;
    background-color: #f2f4f5;
}
</style>