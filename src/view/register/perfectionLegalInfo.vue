<template>
    <div style="height: 100%;" class="box_input">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">信息确认</x-header>
        </div>
        <div class="schedule5" style="margin-top: 3.2rem;padding: 1.5rem 0.8rem;background: rgb(6, 18, 60);">
            <flow>
                <flow-state state="1" title="上传资料" is-done></flow-state>
                <flow-line is-done></flow-line>

                <flow-state state="2" title="信息确认" is-done></flow-state>
                <flow-line></flow-line>

                <flow-state state="3" title="合同签署"></flow-state>
            </flow>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;">
            <span style="font-size:1rem">请核对修改并完善法人相关信息</span>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="法定代表人姓名" style="background-color:#fff;" :show-clear="false" type="text" @on-blur="Fvalue" v-model="objData.legalPersonName" placeholder="">
            </x-input>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="身份证号" style="background-color:#fff;" :show-clear="false" type="text" @on-blur="Fvalue" v-model="objData.legalPersonId" placeholder="">
            </x-input>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <datetime @on-hide="Fvalue" v-model="objData.legalPersonIdStart" title="身份证有效起始日期"></datetime>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <datetime @on-hide="Fvalue" v-model="objData.legalPersonIdExpire" title="身份证有效截止日期"></datetime>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="住址" style="background-color:#fff;" :show-clear="false" type="text" v-model="objData.legalPersonIdAddress" @on-blur="Fvalue" placeholder="">
            </x-input>
        </div>
        <div style="text-align: left;background:#fff;margin-top:1rem">
            <x-input title="实际控制人姓名" style="background-color:#fff;" :show-clear="false" type="text" v-model="objData.controlName" @on-blur="Fvalue" placeholder="">
            </x-input>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="身份证号" style="background-color:#fff;" :show-clear="false" type="text" v-model="objData.controlIdNo" @on-blur="Fvalue" placeholder="">
            </x-input>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <datetime @on-hide="Fvalue" v-model="objData.controlIdExpire" title="身份证有效起始日期"></datetime>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <datetime @on-hide="Fvalue" v-model="objData.controlIdStart" title="身份证有效截止日期"></datetime>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="住址" style="background-color:#fff;" :show-clear="false" type="text" v-model="objData.legalPersonIdAddress" @on-blur="Fvalue" placeholder="">
            </x-input>
        </div>
        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_dark" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHeader,Cell,XInput,Datetime,Flow, FlowState, FlowLine } from 'vux'
import VDistpicker from 'v-distpicker'
export default {
    components: {
        Flow,
        FlowState,
        FlowLine,
        XButton,
        XInput,
        XHeader,
        Cell,
        Datetime,
    },
    data() {
      return {
        step1: 1, 
        objData:{
            legalPersonName:'',
            controlIdNo:'',
            legalPersonIdStart:'',
            legalPersonIdExpire:'',
            legalPersonIdAddress:'',
            controlName:'',
            legalPersonId:'',
            registerAddress:'',
            controlIdExpire:'',
            controlIdStart:'',
            updateStep:'/faceFecognition',
        },
        flg:false,
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
        this.onLoadUp();
        document.body.scrollTop = 0
    },  
    methods: {
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            for(let i in this.objData){
                if(objData[i] == "")
                {
                    this.flg = false
                    className = className.replace("button_dark","")
                    this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
                    return false;
                }else{
                    this.flg = true
                    className = className.replace("button_gray","")
                    this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
                    return false;
                }
            }
        },
        onLoadUp(){
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('memberInfoQuery', {
                queryContentList: ['COMPANY']
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    this.flg = true;
                    let company = data.bizData.companyInfo;
                    for(let o in this.objData){
                        for(let i in company)
                        {
                            if(o == i)
                            {
                                if(o == "legalPersonIdStart"||o == "legalPersonIdExpire"||o == "controlIdExpire"||o == "controlIdStart")
                                this.objData[o] = company[i].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
                                else
                                this.objData[o] = company[i]
                            }
                        }
                    }
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        SubmitNext(){
            if(this.flg){
                this.$vux.loading.show({text: '加载中...'});
                this.APIFunc.AjaxPost('companyModify', {
                    companyInfo: this.objData,
                }).then(data => {
                    this.$vux.loading.hide();
                    if(data.requestStatus =="SUCCESS"){
                        this.$router.push({
                            path: '/faceFecognition',
                        })
                    }else
                    this.$vux.alert.show({title: '提示',content: data.returnMessage})
                });                
            }
        },
        backReturn(){
            this.$router.push({
                path: '/perfectionCompanyInfo',
            })
        },
    },
  }

</script>

<style>
.box_input .weui-input {
    text-align: right;
}
</style>
<style>
.schedule5 .weui-wepay-flow__li_done .weui-wepay-flow__state {
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
.schedule5 .weui-wepay-flow__li_done {
    background: #333;
    color:#333;
}
.schedule5 .weui-wepay-flow__li .weui-wepay-flow__state {
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
.schedule5 .weui-wepay-flow__line {
    background-color: #82889D;
}
.schedule5 .weui-wepay-flow__line_done .weui-wepay-flow__process {
    background: #fff;
}
.schedule5 .weui-wepay-flow__title-bottom {
    color:#82889D;
}
.schedule5 .weui-wepay-flow__li_done .weui-wepay-flow__title-bottom {
    color: #fff;
} 
</style>