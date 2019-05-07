<template>
    <div style="height: 100%;">
        <div class="header_div" style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header style="background-color:#06123C;padding: .6rem 0;" :left-options="{showBack: false}">申请贷款</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: .8rem 1rem .5rem 1rem;text-align: left;background: #06123C;">
            <div style="font-size:.8rem;color:rgba(255,255,255,.5)">剩余可用额度(元)</div>
            <div style="font-size:2rem;color:#fff;">{{canAmount}}</div>
        </div>
        <!--  -->
        <div style="padding:.5rem 1rem;margin-top:1rem;background:#fff;text-align: left;">
            <div style="font-size:1rem;color:#999999">本次申请贷款</div>
        </div>
        <div class="input_div_F" style="padding:.5rem 1rem 1rem 1rem;background:#fff;text-align: left;display: flex;flex-direction: row;justify-content: center;align-items: normal;">
        <!-- @on-blur="InputVlaue.indexOf('0(元)')?true:InputVlaue=''" -->
            <div style="width: 2rem;height: 3.5rem;background: url(https://china-mz.cn/bmimg/yen.svg) no-repeat;background-size: 100% 100%;"></div>
            <input class="Input_div_Text" type="text" @keyup="Digit(InputVlaue)" @focus="valueIs" @blur="Ch_inputVF" v-model="InputVlaue">
            <span>{{InputValueDigit}}</span>
        </div>
        <div style="padding:0rem 1rem;background:#fff;text-align: left;">
            <div style="font-size:1rem;color:#999999">贷款期限</div>
        </div>
        <div style="padding:0rem 1rem .5rem 0rem;background:#fff;text-align: left;">
            <cell @click.native="showPopupPicker = true" :title="selectValue" is-link></cell>
        </div>
        <div style="padding:0rem 1rem;background:#fff;text-align: left;">
            <div style="width:100%;height:1px;background:#ddd;"></div>
        </div>
        <div style="padding:.5rem 1rem;background:#fff;text-align: left;">
            <div style="font-size:1rem;">贷款年化利率为：<span style="font-size:1rem;color:red">{{loanRate}}%</span></div>
        </div>
        <div style="padding:0rem 1rem .5rem;background:#fff;text-align: left;">
            <div style="font-size:1rem;">还款方式为：{{modeDesc}}</div>
        </div>
        <div style="padding:1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
        <div style="text-align: left;padding-bottom: 6rem;"></div>
        <!-- <popup-picker :show.sync="showPopupPicker" :show-cell="false" title="TEST" :data="[['1', '2', '3', '4', '5']]" v-model="value5"></popup-picker> -->
        <!-- end -->
        <div style="position: fixed;bottom:0;left:0;z-index:1;width: 100%;">
            <tabbar class="tabbar_div">
                <tabbar-item link="/Home">
                    <img slot="icon" src="../../assets/img/tabbar_index_off.png">
                    <img slot="icon-active" src="../../assets/img/tabbar_index_on.png">
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item selected  link="">
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
        <div  v-transfer-dom>
            <popup-picker :show.sync="showPopupPicker" @on-shadow-change="valueFs" :data="dataList" v-model="changeVue"></popup-picker>
        </div>
    </div>
</template>
<script>
import { Cell, XHeader,Tabbar, TabbarItem,XInput,XButton,PopupPicker,TransferDom } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
        Tabbar,
        TabbarItem,
        XHeader,
        XInput,
        XButton,
        PopupPicker,
        Cell,
    },
    data() {
      return {
          canAmount:'-',
          InputVlaue:'0(元)',
          type:'text',
          selectValue:'-',
          loanRate:'-',
          modeDesc:'-',
          showPopupPicker:false,
          dataList:[],
          productData:[],
          changeVue:[''],
          ParameterObject:{},
          InputValueDigit:''
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
        let taund = this;
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('memberInfoQuery', {
            queryContentList:["CREDIT_ACCOUNT"]
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                let {creditAccountInfo} = data.bizData;
                this.canAmount = this.APIFunc.stringDispose((Number(creditAccountInfo.creditAmount) - Number(creditAccountInfo.useAmount)).toString());

            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('productQueryAll',).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                data.bizData;
                let arr = [];
                data.bizData.forEach((v,i)=>{
                    arr.push(v.loanTerm+v.loanTermUnitDescription)
                    taund.dataList.push([v.loanTerm+v.loanTermUnitDescription]);
                });
                taund.dataList = [arr];
                taund.changeVue = [data.bizData[0].loanTerm+data.bizData[0].loanTermUnitDescription];
                taund.selectValue = data.bizData[0].loanTerm+data.bizData[0].loanTermUnitDescription;
                taund.loanRate = data.bizData[0].loanRate;
                taund.modeDesc = data.bizData[0].repayMode.modeDesc;
                taund.productData = data.bizData;
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        Digit(e){
            let arr  = ["个","十","百","千","万","十万","百万","千万","亿","十亿","百亿","千亿"];
            if(Number(e).toString() != "NaN"&&Number(e).toString().substr(0,Number(e).toString().indexOf("0.")+2)!="0."&&Number(e)!=0){
                let str = Number(e).toString();
                if(str.indexOf(".")>0)
                {
                    let flat = str.substr(0,str.indexOf("."));
                    this.InputValueDigit = arr[flat.length-1];
                }else{
                    this.InputValueDigit = arr[str.length-1];
                }
            }else if(e == ""){
                this.InputValueDigit = '';
            }
        },
        Fvalue(e){
            this.APIFunc.BtnColor(this,['InputVlaue']);
        },
        valueIs(){
            if(this.InputVlaue == "0(元)")
            {
                this.InputVlaue = "";
            }else if(this.InputVlaue.indexOf(",")>=0){
                this.InputVlaue = this.InputVlaue.replace(/,/g,"")
            }
        },
        Ch_inputVF(e){
            debugger
            let that = this;
            if(this.InputVlaue == '')
            this.InputVlaue = '0(元)'
            else if(Number(this.InputVlaue)>Number(this.canAmount.replace(/,/g,""))){
                this.$vux.alert.show({title: '提示',content: "请输入金额不能大于剩余可用额度",onHide () {
                    that.InputVlaue = '0(元)';
                    that.InputValueDigit = '';
                }});
            }else if(Number(this.InputVlaue).toString() == "NaN"){
                if(this.InputVlaue.indexOf(",")>=0)
                {
                    that.InputVlaue = that.InputVlaue;
                }else{
                    this.$vux.alert.show({title: '提示',content: "请输入正确金额",onHide () {
                        that.InputVlaue = '0(元)';
                        that.InputValueDigit = '';
                    }});
                }
            }else if(Number(this.InputVlaue).toString().substr(0,Number(this.InputVlaue).toString().indexOf("0.")+2)=="0."){
                this.$vux.alert.show({title: '提示',content: "输入金额必须大于等于1",onHide () {
                    that.InputVlaue = '0(元)';
                    that.InputValueDigit = '';
                }});
            }else if(Number(this.InputVlaue).toString().indexOf(".")>=0){
                if((Number(this.InputVlaue).toString().substr(Number(this.InputVlaue).toString().indexOf(".")+1,Number(this.InputVlaue).toString().length)).length>2)
                {
                    this.$vux.alert.show({title: '提示',content: "输入金额小数位数不能小于两位小数",onHide () {
                        that.InputVlaue = '0(元)';
                        that.InputValueDigit = '';
                    }});
                }
            }else{
                this.Fvalue();
                this.InputVlaue = this.APIFunc.stringDispose(this.InputVlaue);  
            }
        },
        SubmitNext(){
            if(Number(this.InputVlaue.replace(/,/g, '')).toString()!='NaN'&&this.InputVlaue!="")
            {
                let {productCode,loanTerm,loanTermUnitDescription,feeRate} = this.ParameterObject;
                let serverMountvalue = parseFloat(Number(this.InputVlaue.replace(/,/g, '')).toFixed(2) * (feeRate/100));
                this.$router.push({
                    path: '/infoConfirming',
                    query: {
                        applyAmount:this.InputVlaue,
                        loanRate:this.loanRate,
                        productCode:productCode,
                        loanTerm:loanTerm,
                        loanTermUnitDescription:loanTermUnitDescription,
                        serverMountvalue:serverMountvalue,
                    }
                });
            }
        },
        valueFs(e){
            if(this.InputVlaue!='0(元)')
            this.Fvalue();
            let [value] = e;
            this.productData.forEach((v,i)=>{
                let Vv = v.loanTerm+v.loanTermUnitDescription
                if(Vv == value)
                {
                    for(let i in v)
                    {
                        this.ParameterObject[i] = v[i];
                    }
                    this.selectValue = Vv;
                    this.modeDesc = v.repayMode.modeDesc;
                    this.loanRate = v.loanRate;
                }
            });
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
.header_div h1 {
    font-size: 1rem !important;
}
.input_div_F .weui-input {
    height: 3rem;
    font-size: 2rem !important;
    position: relative;
}
.Input_div_Text{
    width: 90%;
    height: 3.5rem;
    font-size: 2rem !important;
    margin-left: .5rem;
}
.input_div_F span{
    position: absolute;
    left: 4rem;
    margin-top: -1rem;
    z-index: 1;
}
</style>