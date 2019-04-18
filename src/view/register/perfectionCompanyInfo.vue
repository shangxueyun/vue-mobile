<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">信息确认</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: 3rem .8rem;background: rgb(6, 18, 60);">
            <step v-model="step1" background-color='#fbf9fe'>
                <step-item description="上传资料"></step-item>
                <step-item description="信息确认"></step-item>
                <step-item description="合同签署"></step-item>
            </step>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;">
            <span style="font-size:1rem">请核对修改并完善公司信息</span>
        </div>
        <div style="text-align: left;background:#fff;">
            <cell title="公司名称" :value="objData.companyName" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="统一社会信用代码" :value="objData.licenseNo" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="经营状态" :value="objData.entStatus" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="公司类型" value="" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="成立日期" :value="objData.licenseBeginDate" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="营业期限" value="" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="注册资本" :value="objData.regCap" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="法定代表人" :value="objData.controlName" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="控股股东" :value="objData.legalPersonName" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="控股股东出资额" :value="objData.regCap" ></cell>
        </div>
        <div class="registerAddress" style="text-align: left;background:#fff;border-top:1px solid #ddd">
            <cell title="公司注册地址" :value="objData.registerAddress" ></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <cell title="实际经营城市" @click.native="distpickerShow" :value="practicalinfoAddress" is-link></cell>
        </div>
        <div style="text-align: left;background:#fff;border-top:1px solid #ddd;">
            <x-input title="实际经营详细地址" style="background-color:#fff;" :show-clear="false" type="text" v-model="infoAddress" @on-blur="Fvalue" placeholder="请输入详细地址">
            </x-input>
        </div>
        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
        <div class="distpicker_div_f" v-show="distpickerflg">
            <div class="distpicker_div">
                <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
            </div>
        </div>
    </div>
</template>
<script>
import { Step, StepItem, XButton, XHeader,XInput,Cell, } from 'vux'
import VDistpicker from 'v-distpicker'
export default {
    components: {
        Step,
        StepItem,
        XButton,
        XInput,
        XHeader,
        Cell,
        VDistpicker
    },
    data() {
      return {
        step1: 1, 
        objData:{
            companyName:'',
            licenseNo:'',
            entStatus:'',
            licenseBeginDate:'',
            regCap:'',
            controlName:'',
            legalPersonName:'',
            registerAddress:'',
        },
        email:this.$route.query.email,
        practicalinfoAddress:'',
        infoAddress:'',
        distpickerflg:false,
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
        let company = JSON.parse(window.sessionStorage.company)["bizData"];
        for(let o in this.objData){
            for(let i in company)
            {
                if(o == i)
                {
                    this.objData[o] = company[i]
                }
            }
        }
    },  
    methods: {
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.practicalinfoAddress!=""&&this.infoAddress!="")
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
            if(this.practicalinfoAddress==""){
                this.$vux.alert.show({title: '提示',content: '请选择实际经营城市',});
                return false;
            }
            if(this.infoAddress==""){
                this.$vux.alert.show({title: '提示',content: '请输入详细地址',});
                return false;
            }
            let companyInfo = {companyInfo:Object.assign({}, this.objData, {
                licenseAddress: this.infoAddress,
                companyIdType: "2",
                email: this.email,
                licenseCity: this.practicalinfoAddress,
                legalPersonPhone: window.sessionStorage.phone,
                updateStep: "/perfectionLegalInfo",
            })}

            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('companyModify', companyInfo).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.removeItem("company");
                    this.$router.push({
                        path: '/perfectionLegalInfo',
                    })
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        distpickerShow(){
            document.body.style.overflow = "hidden"
            this.distpickerflg = true;
        },
        onSelected(data) {
            this.practicalinfoAddress = `${data.province.value} ${data.city.value} ${data.area.value}`;
            this.distpickerflg = false
            document.body.style.overflow = "auto";
            this.Fvalue()
        },
        backReturn(){
            this.$router.push({
                path: '/affirmCompanyName',
            })
        },
    },
  }

</script>
<style lang="less">
.distpicker_div{
    width: 100%;
    max-height: 40%;
    position: fixed;
    bottom: 0;
    overflow: scroll;
}
.distpicker-address-wrapper .address-container {
    min-height: 16rem;
}
.distpicker-address-wrapper {
    color: #9caebf;
    position: relative;
}
.registerAddress .weui-cell__ft {
    text-align: right;
    color: #999999;
    width: 64%;
}
.distpicker_div_f{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 111;
}
</style>