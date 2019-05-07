<template>
    <div style="height: 100%;overflow: hidden;background-color:#F0EFF5;">
        <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">注册</x-header>
        <div style="padding: 1.5rem 0;">
            <x-input title="请输入手机号" style="background-color:#fff;" :show-clear="false" v-model="phone" @on-change="phoneFvalue" placeholder="请输入手机号">
                <img slot="label" style="padding-right:10px;display:block;" src="https://china-mz.cn/bmimg/phone.svg" width="24" height="24">
            </x-input>
        </div>
        <div style="padding:0px 1rem;">
            <x-button  class="button_gray" type="primary"  ref="button" @click.native="SubmitNext" action-type="button">下一步</x-button>
        </div>
    </div>
</template>

<script>
import { XHeader,XInput,XButton } from 'vux'

export default {
    components: {
        XHeader,
        XInput,
        XButton
    },
    data() {
      return {
          phone:'',
          correct:false
      };
    },
    created() {

    },
    computed: {

    },
    mounted() {
        //console.log(this.$router)
        document.body.scrollTop = 0
    },  
    methods: {
        phoneFvalue(value) {
           let className = this.$refs.button.$el.className;
           let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
           if(reg.test(value)){
               this.correct = true;
               if(className.indexOf("button_gray")<0)
               {
                    this.$refs.button.$el.className =  className.replace("button_dark","") + " button_gray";
               }else{
                   this.$refs.button.$el.className =  className.replace("button_gray","") + " button_dark";
               }
           }
        },
        SubmitNext(){
            if(this.correct){
                this.$router.push({
                    path: '/verifyPhone',
                    query: {
                        phone: this.phone
                    }
                })
            }
        },
        backReturn(){
            this.$router.push({
                path: '/login',
            })
        },
    },
  }

</script>

<style lang="scss" scoped>
.input_style{
    width: 88%;
    height: 2.6rem;
}
/* // .{#9196aa
//     https://china-mz.cn/bmimg/phone.svg
// } */
.input-style{
    width: 88%;
}
.iocn-ip{
    width: 2.2rem;
    height: 2rem;
        margin: 0rem .2rem 0 .5rem;
    background: url(https://china-mz.cn/bmimg/phone.svg) no-repeat;
}
.button_style{
    height: 2.4rem;
    font-size: 1rem;
}
.centetn{
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: normal;
}

</style>