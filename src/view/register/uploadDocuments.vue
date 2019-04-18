<template>

    <div style="height: 100%;background:#fff">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">上传证件资料</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: 3rem .8rem;background: rgb(6, 18, 60);">
            <step v-model="step1" background-color='#fbf9fe'>
                <step-item description="上传资料"></step-item>
                <step-item description="信息确认"></step-item>
                <step-item description="合同签署"></step-item>
            </step>
        </div>
        <div style="padding: 0.3rem 1rem;text-align: left;">
            <span style="font-size:1rem">上传证件材料<span style="color:#ccc">(*为必须上传)</span></span>
        </div>
        <div style="padding: .4rem 1rem;text-align: left;background: #fff;">
            <div style="display: flex;flex-direction: row;justify-content: end;align-items: normal;">
                <div v-show="yyzzDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传营业执照</div>
                    <input type="file" accept="image/*" name="yyzzDiv yyzzSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="yyzzSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.yyzzDiv" alt="营业执照"  @click="show(0)" style="max-height:100%;max-width:100%">
                    <span @click="clos('yyzzDiv yyzzSRC')">X</span>
                </div>
                <div v-show="khxkDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传开户许可证</div>
                    <input type="file" accept="image/*" name="khxkDiv khxkSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="khxkSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.khxkDiv" alt="营业执照"  @click="show(1)" style="max-height:100%;max-width:100%">
                    <span @click="clos('khxkDiv khxkSRC')">X</span>
                </div>
            </div>

            <div style="display: flex;flex-direction: row;justify-content: end;align-items: normal;margin-top:.8rem">
                <div v-show="jgdmDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传机构信用代码</div>
                    <input type="file" accept="image/*" name="jgdmDiv jgdmSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="jgdmSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.jgdmDiv" alt="营业执照"  @click="show(2)" style="max-height:100%;max-width:100%">
                    <span @click="clos('jgdmDiv jgdmSRC')">X</span>
                </div>
                <div v-show="frhkbDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传法人户口簿</div>
                    <input type="file" accept="image/*" name="frhkbDiv frhkbSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="frhkbSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.frhkbDiv" alt="营业执照"  @click="show(3)" style="max-height:100%;max-width:100%">
                    <span @click="clos('frhkbDiv frhkbSRC')">X</span>
                </div>
            </div>

            <div style="display: flex;flex-direction: row;justify-content: end;align-items: normal;margin-top:.8rem">
                <div v-show="frpoDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传法人配偶身份证扫描</div>
                    <input type="file" accept="image/*" name="frpoDiv frpoSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="frpoSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.frpoDiv" alt="营业执照"  @click="show(4)" style="max-height:100%;max-width:100%">
                    <span @click="clos('frpoDiv frpoSRC')">X</span>
                </div>
                <div v-show="zfrjhzDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传法人结婚证</div>
                    <input type="file" accept="image/*" name="zfrjhzDiv zfrjhzSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="zfrjhzSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.zfrjhzDiv" alt="营业执照"  @click="show(5)" style="max-height:100%;max-width:100%">
                    <span @click="clos('zfrjhzDiv zfrjhzSRC')">X</span>
                </div>
            </div>

            <div style="display: flex;flex-direction: row;justify-content: end;align-items: normal;margin-top:.8rem">
                <div v-show="SQSDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>上传实际控制个人征信查询授权书</div>
                    <input type="file" accept="image/*" name="SQSDiv SQSSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="SQSSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.SQSDiv" alt="营业执照"  @click="show(6)" style="max-height:100%;max-width:100%">
                    <span @click="clos('SQSDiv SQSSRC')">X</span>
                </div>
                <div v-show="QTDiv" class="div_IMG" >
                    <i></i>
                    <div><span style="color:red">*</span>其他照片</div>
                    <input type="file" accept="image/*" name="QTDiv QTDSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="QTDSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.QTDiv" alt="营业执照"  @click="show(7)" style="max-height:100%;max-width:100%">
                    <span @click="clos('QTDiv QTDSRC')">X</span>
                </div>
            </div>

            <div style="padding: 2rem 1rem 1rem 1rem;">
                <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
            </div>
        </div>
        <div v-transfer-dom>
        <previewer :list="listImg" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
    </div>
</template>

<script>
import { Step, StepItem, XButton, XHeader,TransferDom,Previewer } from 'vux'
import "../../assets/js/lrz.bundle.js"
export default {
    directives: {
        TransferDom
    },
    components: {
        Step,
        StepItem,
        XButton,
        XHeader,
        Previewer
    },
    data() {
      return {
        yyzzDiv:true,
        yyzzSRC:false,
        khxkDiv:true,
        khxkSRC:false,
        jgdmDiv:true,
        jgdmSRC:false,
        frhkbDiv:true,
        frhkbSRC:false,
        frpoDiv:true,
        frpoSRC:false,
        zfrjhzDiv:true,
        zfrjhzSRC:false,
        SQSDiv:true,
        SQSSRC:false,
        QTDiv:true,
        QTDSRC:false,
        QTDiv:true,
        QTSRC:false,
        step1: 0, 
        listImg: [],
        flg:false,
        Base64Obj:{
            yyzzDiv:"",
            khxkDiv:"",
            jgdmDiv:"",
            frhkbDiv:"",
            frpoDiv:"",
            zfrjhzDiv:"",
            SQSDiv:"",
            QTDiv:"",
        },
        options: {
            getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
            }
        }
      };
    },
    watch: {
        'Base64Obj.yyzzDiv': function(newVal){
            this.Base64Obj.yyzzDiv = "";
            this.Base64Obj.yyzzDiv = newVal;
        },
        'Base64Obj.khxkDiv': function(newVal){
            this.Base64Obj.khxkDiv = "";
            this.Base64Obj.khxkDiv = newVal;
        },
        'Base64Obj.jgdmDiv': function(newVal){
            this.Base64Obj.jgdmDiv = "";
            this.Base64Obj.jgdmDiv = newVal;
        },
        'Base64Obj.frhkbDiv': function(newVal){
            this.Base64Obj.frhkbDiv = "";
            this.Base64Obj.frhkbDiv = newVal;
        },
        'Base64Obj.frpoDiv': function(newVal){
            this.Base64Obj.frpoDiv = "";
            this.Base64Obj.frpoDiv = newVal;
        },
        'Base64Obj.zfrjhzDiv': function(newVal){
            this.Base64Obj.zfrjhzDiv = "";
            this.Base64Obj.zfrjhzDiv = newVal;
        },
        'Base64Obj.SQSDiv': function(newVal){
            this.Base64Obj.SQSDiv = "";
            this.Base64Obj.SQSDiv = newVal;
        },
        'Base64Obj.QTDiv': function(newVal){
            this.Base64Obj.QTDiv = "";
            this.Base64Obj.QTDiv = newVal;
        },
    },
    created() {

    },
    computed: {

    },
    mounted() {
        // window.flgNum = 60;
        // window.Setflg = null;
        // window.OutFlg = null;
    },  
    methods: {
        clos(estr){
            let arr = estr.split(" ");
            this[arr[0]] = true
            this[arr[1]] = false;
            this.Base64Obj[arr[0]] = "";
            this.listImg.pop();
        },
        lrzFUNC(arr,Base64Obj,data,quality){
            let type = data.type,url = window.URL || window.webkitURL;
            let img = new Image(),obj = Base64Obj,that = this;
            img.src = url.createObjectURL(data);
            img.onload = function () {
                let height = this.height
                let width = this.width
                lrz(data,{quality:quality})
                .then(function (rst) {
                    //rst.base64 = rst.base64.replace("data:image/jpeg;","data:"+type+";");
                    obj[arr[0]] = rst.base64;
                    that[arr[0]] = false;
                    that[arr[1]] = true;
                    that.listImg.push({
                        msrc: rst.base64,
                        src: rst.base64,
                        w: width/2,
                        h: height/2,
                    })
                    that.Fvalue()
                })
                .catch(function (err) {
                })
                .always(function (err) {
                });
            }
		},
        changeFileHandler(e){
            if(e.target.files.length==1)
            {
                //alert(e.target.files[0].size)
                const files = e.target.files,arr = e.target.name.split(" ");
                if(e.target.files[0].size>204800&&e.target.files[0].size<819200){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.85)
                }else if(e.target.files[0].size>1024000&&e.target.files[0].size<1536000){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.60)
                }else if(e.target.files[0].size>2000000&&e.target.files[0].size<3000000){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.40)
                }else if(e.target.files[0].size<204800){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.98)
                }

            }else{
                this.$vux.alert.show({title: '提示',content: '不能选择多张图片！',})
            }
        },
        logIndexChange (arg) {
            console.log(arg)
        },
        show (index) {
        this.$refs.previewer.show(index)
        },
        Fvalue(e){
            let className = this.$refs.button.$el.className;
            if(this.Base64Obj.yyzzDiv!=""&&this.Base64Obj.khxkDiv!=""&&this.Base64Obj.jgdmDiv!=""&&this.Base64Obj.frhkbDiv!="")
            {
                className = className.replace("button_dark","")
                this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
            }else{
                className = className.replace("button_gray","")
                this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
            }
        },
        SubmitNext(){
            this.verificationFunc(this.Base64Obj.yyzzDiv,'请上传营业执照');
            this.verificationFunc(this.Base64Obj.khxkDiv,'请上传开户许可证');
            this.verificationFunc(this.Base64Obj.jgdmDiv,'请上传机构信用代码');
            this.verificationFunc(this.Base64Obj.frhkbDiv,'请上传法人户口簿');
            let companyInfo = {companyInfo:{
                licenseNoPhoto: this.Base64Obj.yyzzDiv, //营业执照
                openingPermitPhoto: this.Base64Obj.khxkDiv, //开户许可
                organizationNoPhoto: this.Base64Obj.jgdmDiv, //组织机构
                legalAccountBookPhotoUrl: this.Base64Obj.frhkbDiv,
                legalSpouseIdPhotoUrl: this.Base64Obj.frpoDiv,
                legalMarriageCertificatePhotoUrl: this.Base64Obj.zfrjhzDiv,
                letterOfQuiryPhotoUrl: this.Base64Obj.SQSDiv,
                otherPhotoUrl: this.Base64Obj.QTDiv,          
                token:sessionStorage.token,
                updateStep: "/upload_idcard"
            }}
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('companyModify',companyInfo).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    this.$router.push({
                        path: '/uploadCard',
                    })
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        nextStep () {
            this.step2 ++
        },
        verificationFunc(str,msg){
            if(str == "")
            {
                this.$vux.alert.show({title: '提示',content: msg,})
                return false
            }else{
                return true
            }
        },
        backReturn(){

        },
    },
  }

</script>

<style lang="scss" scoped>
    .yd-step-item-bottom {
        color: #83899E !important;
    }

.div_IMG{
    width: 46%;
    position: relative;
    border-radius: 10px;
    height: 7rem;
    background: #EFEFF4;
    margin: 0rem .5rem;
    text-align: center;
    padding-top: 2rem;
}
.div_IMG input{
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.div_IMG i{
    display: block;
    width: 2.2rem;
    height: 2.2rem;
    margin: 0 auto;
    border-radius: 1.1rem;
    margin-bottom: .6rem;
    background: url("https://china-mz.cn/bmimg/plus_gray.svg") no-repeat;
}
.img_color{
    background: rgba(51, 51, 51, .5);
    padding: 0;
    padding: 1rem 0;
}
.img_color span{
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    line-height: 22px;
    background: #f33f3d;
    border: 0;
}
</style>