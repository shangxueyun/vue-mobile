<template>
    <div style="height: 100%;">
        <div class="header_div" style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header style="background-color:#06123C;padding: .6rem 0;" :left-options="{showBack: false}">我的</x-header>
        </div>
        <div @click="routerF('/personalInformation')" class="centetn_div" style="margin-top: 3.2rem;height: 8rem;padding-top: 2rem;background: #06123C;">
            <i></i>
            <div>{{companyName}}</div>
        </div>
        <div class="Iocn_List" style="margin-top: 1rem;text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="IocN1"></span>
            <cell ref="contract" @click.native="routerF('/pendingContract')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="待签订合同" is-link></cell>
        </div>
        <div class="Iocn_List" style="margin-top: 1rem;text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="IocN1"></span>
            <cell @click.native="routerF('/pendingLoan')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="受理中贷款" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="Iocn_List" style="text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="money"></span>
            <cell @click.native="routerF('/pendingLoanLoan')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="待放款贷款" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="Iocn_List" style="text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="hand_money"></span>
            <cell @click.native="routerF('/outstandingLoan')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="待还款贷款" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="Iocn_List" style="text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="card_ok"></span>
            <cell @click.native="routerF('/repaidLoan')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="已还款贷款" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="Iocn_List" style="text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="wallet"></span>
            <cell @click.native="routerF('/badLoan')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="未通过贷款" is-link></cell>
        </div>
        <div class="Iocn_List" style="margin-top: 1rem;text-align: left;padding: .5rem 1rem;background: #fff;display: flex;flex-direction: row;justify-content: space-between;align-items: center;">
            <span class="settings"></span>
            <cell @click.native="routerF('/setting')" class="LISTdiv" style="font-size:1rem;padding: 0;color:#000;width: 94%;" title="设置" is-link></cell>
        </div>
        <div style="text-align: left;padding-bottom: 6rem;"></div>

        <div style="position: fixed;bottom:0;left:0;z-index:1;width: 100%;">
            <tabbar class="tabbar_div">
                <tabbar-item link="/Home">
                    <img slot="icon" src="../../assets/img/tabbar_index_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_index_on.png">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item  link="/applicationLoan">
                    <img slot="icon" src="../../assets/img/tabbar_loan_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_loan_on.png">
                    <span slot="label">申请贷款</span>
                </tabbar-item>
                <tabbar-item selected  link="">
                    <img slot="icon" src="../../assets/img/tabbar_mine_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_mine_on.png">
                    <span slot="label">我的</span>
                </tabbar-item>
            </tabbar>
        </div>
    </div>
</template>
<script>
import { Cell, XHeader,Tabbar, TabbarItem,XInput,XButton, } from 'vux'
export default {
    components: {
        Tabbar,
        TabbarItem,
        XHeader,
        Cell,
    },
    data() {
      return {
            companyName:JSON.parse(sessionStorage.companyInfo)['companyName'],
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        window.ppss = this.$refs.contract.$el;
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('queryApplyRecord', {
            orderType: 'LOAN',
            status: 'I1',
            page: 1,
            pageSize: 4
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                if(data.bizData.loanList.length>0)
                this.$refs.contract.$el.children[1].children[0].innerHTML = "<label class='vux-label'>待签订合同</label><span class='span_d'></span>"
                else
                this.$refs.contract.$el.children[1].children[0].innerHTML = "<label class='vux-label'>待签订合同</label>"
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        routerF(str){
            this.$router.push({
                path: str,
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
    color: #fff;
    font-size: 1rem;
    line-height: 3rem;
}
.btn_div{
    position: relative;
}
.LISTdiv:before{
    display: none;
}
.Iocn_List span{
    display: block;
    width: 1.6rem;
    height: 2rem;
    margin-right: .5rem;
}
.IocN1{
    background: url(https://china-mz.cn/bmimg/file_time.svg) no-repeat;
    background-size: 100% 100%;
}
.money{
    background: url(https://china-mz.cn/bmimg/money.svg) no-repeat;
    background-size: 100% 100%;
}
.hand_money{
    background: url(https://china-mz.cn/bmimg/hand_money.svg) no-repeat;
    background-size: 100% 100%;
}
.wallet{
    background: url(https://china-mz.cn/bmimg/wallet.svg) no-repeat;
    background-size: 100% 100%;
}
.card_ok{
    background: url(https://china-mz.cn/bmimg/card_ok.svg) no-repeat;
    background-size: 100% 100%;
}
.settings{
    background: url(https://china-mz.cn/bmimg/settings.svg) no-repeat;
    background-size: 100% 100%;
}
</style>
<style>
.span_d{
    position: relative;
}
.span_d::before{
    content: '';
    width: 10px;
    border-radius: 1rem;
    height: 10px;
    position: absolute;
    top: .2rem;
    right: -1rem;
    background: #FC4A2D;
}
</style>
