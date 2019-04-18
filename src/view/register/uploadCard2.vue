<template>

    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">上传证件资料</x-header>
        </div>
        <div style="margin-top: 3.2rem;padding: 3rem .8rem;background: rgb(6, 18, 60);">
            <step v-model="step1" background-color='#fbf9fe'>
                <step-item description="上传资料"></step-item>
                <step-item description="确认信息"></step-item>
                <step-item description="合同签署"></step-item>
            </step>
        </div>
        <div style="padding: .5rem 1rem;;text-align: left;background:#fff">
            <span style="font-size:1rem">请上传实际控制人身份证正面和背面照片</span>
        </div>
        <div style="padding: .4rem 1rem;text-align: left;background:#fff">
            <div style="display: flex;flex-direction: row;justify-content: end;align-items: normal;">
                <div v-show="sfzzDiv" class="div_IMG" style="margin-right: 1rem;margin-bottom: 1rem;">
                    <div class="img_div_all">
                        <i></i>
                        <i></i>
                    </div>
                    <div>上传身份证正面</div>
                    <input type="file" accept="image/*" name="sfzzDiv sfzzSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="sfzzSRC" class="div_IMG img_color" style="margin-right: 1rem;margin-bottom: 1rem;">
                    <img class="previewer-demo-img" :src="Base64Obj.sfzzDiv" alt="上传身份证正面"  @click="show(0)" style="height: 100%;width: 100%;border-radius: .5rem;">
                    <span @click="clos('sfzzDiv sfzzSRC')">X</span>
                </div>
                <div v-show="sfzfDiv" class="div_IMG" >
                    <div class="img_div_all f">
                        <i></i>
                        <i></i>
                    </div>
                    <div>上传身份证反面</div>
                    <input type="file" accept="image/*" name="sfzfDiv sfzfSRC" @change="changeFileHandler"  mutiple="mutiple" />
                </div>
                <div v-show="sfzfSRC" class="div_IMG img_color">
                    <img class="previewer-demo-img" :src="Base64Obj.sfzfDiv" alt="上传身份证反面"  @click="show(1)" style="height: 100%;width: 100%;border-radius: .5rem;">
                    <span @click="clos('sfzfDiv sfzfSRC')">X</span>
                </div>
            </div>

            <div style="padding: .5rem 0rem;text-align: left;border-top:1px solid #ddd">
                <span style="font-size:1rem">身份证的要求</span>
            </div>
            <div style="padding: 0.5rem 1rem;border: 1px solid #ddd;display: flex;flex-direction: row;justify-content: space-around;align-items: center;">
                <div class="pimg-div">
                    <i></i>
                    <div>标准</div>
                </div>
                <div class="pimg-div p1">
                    <i></i>
                    <div>标准</div>
                </div>
                <div class="pimg-div p2">
                    <i></i>
                    <div>标准</div>
                </div>
                <div class="pimg-div p3">
                    <i></i>
                    <div>标准</div>
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
import { Confirm ,Step, StepItem, XButton, XHeader,TransferDomDirective as TransferDom,Previewer } from 'vux'
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
        sfzzDiv:true,
        sfzzSRC:false,
        sfzfDiv:true,
        sfzfSRC:false,
        step1: 0, 
        listImg: [],
        flg:false,
        Base64Obj:{
            sfzzDiv:"",
            sfzfDiv:"",
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
        'Base64Obj.sfzzDiv': function(newVal){
            this.Base64Obj.sfzzDiv = "";
            this.Base64Obj.sfzzDiv = newVal;
        },
        'Base64Obj.sfzfDiv': function(newVal){
            this.Base64Obj.sfzfDiv = "";
            this.Base64Obj.sfzfDiv = newVal;
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
                const files = e.target.files,arr = e.target.name.split(" ")
                if(e.target.files[0].size>204800&&e.target.files[0].size<819200){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.90)
                }else if(e.target.files[0].size>1024000&&e.target.files[0].size<1536000){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.70)
                }else if(e.target.files[0].size>2000000&&e.target.files[0].size<3000000){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],0.50)
                }else if(e.target.files[0].size<204800){
                    this.lrzFUNC(arr,this.Base64Obj,files[0],1)
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
            if(this.Base64Obj.sfzfDiv!=""&&this.Base64Obj.sfzzDiv!="")
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
            if(this.Base64Obj.sfzfDiv==""){
                this.$vux.alert.show({title: '提示',content: '请上传身份证反面',});
                return false;
            }
            if(this.Base64Obj.sfzzDiv==""){
                this.$vux.alert.show({title: '提示',content: '请上传身份证正面',});
                return false;
            }
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('uploadPicture', {
            front: this.Base64Obj.sfzzDiv,
            behind: this.Base64Obj.sfzfDiv,          
            who: '1',
            updateStep: "/affirmCompanyName"
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    this.$router.push({
                        path: '/affirmCompanyName',
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
            this.$router.push({
                path: '/uploadCard',
            })
        },
    },
  }

</script>

<style lang="scss" scoped>

.div_IMG{
    width: 48%;
    position: relative;
    border-radius: 10px;
    height: 8rem;
    background: #EFEFF4;
    margin: 0rem;
    text-align: center;
    padding-top: .2rem;
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
    height: 8rem;
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
.img_div_all{
    width: 72%;
    height: 5.5rem;
    margin: 0 auto;
    position: relative;
}
.img_div_all i:first-child{
    width: 100%;
    height: 100%;
    background: url(https://china-mz.cn/bmimg/id_front.png) no-repeat;
    background-size: 100% 100%;
}
.img_div_all i:last-child{
    width: 50%;
    height: 72%;
    background: url(https://china-mz.cn/bmimg/camera.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 16%;
    left: 27%;
}
.f i:first-child{
    background: url(https://china-mz.cn/bmimg/id_back.png) no-repeat;
    background-size: 100% 100%;
}
.pimg-div{
    width: 23%;
    text-align: center;
}
.pimg-div i{
    width: 100%;
    height: 4rem;
    display: block;
    margin: 0 auto;
    background: url(https://china-mz.cn/bmimg/idcard_1.png) no-repeat;
    background-size: 100% 100%;
}
.p1 i{
    background: url(https://china-mz.cn/bmimg/idcard_2.png) no-repeat;
    background-size: 100% 100%;
}
.p2 i{
    background: url(https://china-mz.cn/bmimg/idcard_3.png) no-repeat;
    background-size: 100% 100%;
}
.p3 i{
    background: url(https://china-mz.cn/bmimg/idcard_4.png) no-repeat;
    background-size: 100% 100%;
}
</style>