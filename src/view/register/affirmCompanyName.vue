<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: ''}">信息确认</x-header>
        </div>
        <div class="schedule3" style="margin-top: 3.2rem;padding: 1.5rem 0.8rem;background: rgb(6, 18, 60);">
            <flow>
                <flow-state state="1" title="上传资料" is-done></flow-state>
                <flow-line is-done></flow-line>

                <flow-state state="2" title="信息确认" is-done></flow-state>
                <flow-line></flow-line>

                <flow-state state="3" title="合同签署"></flow-state>
            </flow>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;">
            <span style="font-size:1rem"><span style="color:red">*</span>公司名称</span>
        </div>
        <div style="padding: .4rem 1rem;text-align: left;background:#fff">
            <x-input title="" style="background-color:#fff;" :show-clear="false" type="text" v-model="companyName" @on-blur="Fvalue" placeholder="请输入完整公司全称"></x-input>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;">
            <span style="font-size:1rem"><span style="color:red">*</span>邮箱</span>
        </div>
        <div style="padding: .4rem 1rem;text-align: left;background:#fff">
            <x-input title="" style="background-color:#fff;" :show-clear="false" type="text" v-model="companyMail" @on-change="Fvalue" placeholder="请输入邮箱"></x-input>
        </div>
        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHeader,XInput,Flow, FlowState, FlowLine } from 'vux'
export default {
    components: {
        Flow,
        FlowState,
        FlowLine,
        XButton,
        XInput,
        XHeader,
    },
    data() {
      return {
        step1: 1, 
        companyName:'',
        companyMail:'',
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
        // window.flgNum = 60;
        // window.Setflg = null;
        // window.OutFlg = null;
        document.body.scrollTop = 0
    },  
    methods: {
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.companyName!=""&&this.companyMail!="")
            {
                this.flg = false
                className = className.replace("button_dark","")
                this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
            }else{
                this.flg = true
                className = className.replace("button_gray","")
                this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
            }
        },
        SubmitNext(){
            let reg = /^[A-Za-z0-9._%-]+@([A-Za-z0-9-]+\.)+[A-Za-z]{2,4}$/;
            if(this.companyName==""){
                this.$vux.alert.show({title: '提示',content: '请输入公司全称',});
                return false;
            }
            if(this.companyMail==""){
                this.$vux.alert.show({title: '提示',content: '请输入邮箱',});
                return false;
            }else{
                if(!reg.test(this.companyMail)){
                    this.$vux.alert.show({title: '提示',content: '请输入正确邮箱',});
                    return false;
                }
            }
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('companyInfoQueryByChannel', {
                companyName: this.companyName,
                email: this.companyMail
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.setItem("company",JSON.stringify(data));
                    this.$router.push({
                        path: '/perfectionCompanyInfo',
                        query: {
                            email: this.companyMail
                        }
                    })
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
    },
  }

</script>

<style>
.schedule3 .weui-wepay-flow__li_done .weui-wepay-flow__state {
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
.schedule3 .weui-wepay-flow__li_done {
    background: #333;
    color:#333;
}
.schedule3 .weui-wepay-flow__li .weui-wepay-flow__state {
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
.schedule3 .weui-wepay-flow__line {
    background-color: #82889D;
}
.schedule3 .weui-wepay-flow__line_done .weui-wepay-flow__process {
    background: #fff;
}
.schedule3 .weui-wepay-flow__title-bottom {
    color:#82889D;
}
.schedule3 .weui-wepay-flow__li_done .weui-wepay-flow__title-bottom {
    color: #fff;
} 
</style>