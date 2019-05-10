<template>
    <div style="height: 100%;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 11;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">人脸识别</x-header>
        </div>
        <div style="margin-top: 3.5rem;height: 400px;display: flex;flex-direction: row;justify-content: end;align-items: normal;">
            <div v-show="rlsbDiv" class="div_IMG" >
                <div class="img_div_all f">
                    <i></i>
                </div>
                <!-- capture="camera" -->
                <input type="file" accept="image/*" name="rlsbDiv rlsbSRC" @change="changeFileHandler" mutiple="mutiple" />
            </div>
            <div v-show="rlsbSRC" class="div_IMG img_color">
                <img id="portraitCompare" class="previewer-demo-img" :src="Base64Obj.rlsbDiv" alt="上传身份证反面"  @click="show(0)" style="height: 100%;width: 100%;border-radius: .5rem;">
                <span @click="clos('rlsbDiv rlsbSRC')">X</span>
            </div>
        </div>

        <div style="padding: .5rem 1rem;;text-align: left;">
            <span style="font-size:1rem">照片拍摄要求</span>
        </div>
        
        <div style="padding: 0rem 1rem;text-align: left;color:#f43530">
            <span style="font-size:1rem">1. 操作者必须是法定代表人本人</span>
        </div>
        <div style="padding: 0rem 1rem;;text-align: left;color:#f43530">
            <span style="font-size:1rem">2. 背景不要背光</span>
        </div>
        <div style="padding: 0rem 1rem;;text-align: left;color:#f43530">
            <span style="font-size:1rem">3. 人脸居中</span>
        </div>

        <div style="padding: 2rem 1rem 1rem 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>

        <div v-transfer-dom>
        <previewer :list="listImg" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
        </div>
    </div>
</template>
<script>
import { Confirm ,Step, StepItem, XButton, XHeader,TransferDomDirective as TransferDom,Previewer } from 'vux'
import lrz from 'lrz'
import { debuglog } from 'util';
export default {
    directives: {
        TransferDom
    },
    components: {
        Confirm,
        Step,
        StepItem,
        XButton,
        XHeader,
        Previewer
    },
    data() {
      return {
        rlsbDiv:true,
        rlsbSRC:false,
        step1: 0, 
        listImg: [],
        flg:false,
        showLG:false,
        Base64Obj:{
            rlsbDiv:"",
        },
        portraitCompare_img:'',
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
        'Base64Obj.rlsbDiv': function(newVal){
            this.Base64Obj.rlsbDiv = "";
            this.Base64Obj.rlsbDiv = newVal;
        },
    },
    created() {

    },
    computed: {

    },
    mounted() {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
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
            img.onload = function (e) {
                let height = this.height
                let width = this.width;
                let ele = e;
                lrz(data,{quality:quality})
                .then(function (rst) {
                    rst.base64 = rst.base64.replace("data:image/jpeg;","data:"+type+";");
                    obj[arr[0]] = rst.base64;
                    that[arr[0]] = false;
                    that[arr[1]] = true;
                    that.listImg.push({
                        msrc: rst.base64,
                        src: rst.base64,
                        w: width/2,
                        h: height/2,
                    })
                    that.Fvalue();
                    portraitCompare.onload =function(e){
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = 200;
                        canvas.height = 260;
                        //人脸识别尺寸规格*
                        ctx.drawImage(portraitCompare, 0, 0, 200, 260);
                        lrz(canvas.toDataURL("image/"+type).replace("data:image/png;","data:image/jpg;"),{quality:0.97})
                        .then(function (rst) {
                            that.portraitCompare_img = rst.base64;
                        })
                    }
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
                const files = e.target.files,arr = e.target.name.split(" ");
                this.lrzFUNC(arr,this.Base64Obj,files[0],0.60)

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
            if(this.Base64Obj.rlsbDiv!="")
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
            let router = this.$router;
            if(this.Base64Obj.rlsbDiv==""){
                this.$vux.alert.show({title: '提示',content: '请进行人脸识别操作',});
                return false;
            }
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('portraitCompare', {
                photo: this.portraitCompare_img,
                updateStep: "/contractSigning"
            }).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    this.$vux.alert.show({title: '验证成功',content: data.returnMessage,onHide () {
                        router.push({
                            path: '/contractSigning',
                        })
                    }})
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });    
        },
        backReturn(){
            this.$router.push({
                path: '/perfectionLegalInfo',
            })
        },
    },
  }

</script>

<style>

.div_IMG{
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 10px;
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
    background: rgba(0, 0, 0, .5);
    height: 100%;
    padding: 0rem 2rem;
    width: 100%;
    margin: 0 auto;
    border-radius: 0px;
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    position: relative;
}
.img_div_all i{
    width: 100%;
    height: 100%;
    background: url(https://china-mz.cn/bmimg/realize_face.png) no-repeat;
    background-size: 100% 100%;
}
.canvas_div{
    position: absolute;
    z-index: 1;
    width: 19.5rem;
    height: 24.8rem;
}
</style>