<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="routerF('/mine')" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">设置</x-header>
        </div>
        <div style="padding:4.2rem 1rem .5rem 1rem;background: #fff;text-align: left;">
            <cell @click.native="routerF('/passwordRetrieve')" style="font-size:1rem;padding: 0;color:#000;" title="找回密码" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div style="text-align: left;padding: .5rem 1rem;background: #fff;">
            <cell @click.native="routerF('/modifyPassword')" style="font-size:1rem;padding: 0;color:#000;" title="修改密码" is-link></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div style="text-align: left;padding: .5rem 1rem;background: #fff;">
            <cell @click.native="routerF('/aboutUs')" style="font-size:1rem;padding: 0;color:#000;" title="关于我们" is-link></cell>
        </div>
        <div @click="showLG = true" style="position: fixed;bottom: 0;width: 100%;line-height: 3rem;color:#ff6363;background: #fff;">
            安全退出
        </div>

        <div v-transfer-dom>
            <confirm confirm-text="确认" cancel-text="取消" v-model="showLG"
                title="提示"
                @on-cancel="showLG = false"
                @on-confirm="onConfirm">
                <p style="text-align:center;">您是要安全退出吗？</p>
            </confirm>
        </div>
    </div>
</template>
<script>
import { XHeader,Cell,TransferDomDirective as TransferDom,Confirm } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
        Confirm,
        XHeader,
        Cell
    },
    data() {
      return {
          showLG:false,
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
    },  
    methods: {
        onConfirm(){
            this.showLG = false;
            this.$vux.loading.show({text: '加载中...'});
            this.APIFunc.AjaxPost('memberLogout', {}).then(data => {
                this.$vux.loading.hide();
                if(data.requestStatus =="SUCCESS"){
                    window.sessionStorage.removeItem("fundSideId");
                    window.sessionStorage.removeItem("loanNo");
                    window.sessionStorage.removeItem("token");
                    window.sessionStorage.removeItem("memberId");
                    window.sessionStorage.removeItem("phone");
                    window.sessionStorage.removeItem("companyInfo");
                    this.routerF('/login');
                }else
                this.$vux.alert.show({title: '提示',content: data.returnMessage})
            });
        },
        routerF(str){
            this.$router.push({
                path: str,
            })
        },
    },
  }

</script>

<style>
/* .InfoList .vux-label{
    color: #999999;
}
.InfoList .weui-cell__ft{
    color: #333;
    font-size: 1rem;
    text-align: left;
}
.width .weui-cell__ft{
    width: 64%;
} */
</style>