<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="backReturn" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">用户信息</x-header>
        </div>
        <div class="InfoList" style="margin-top: 5rem;padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="企业名称" :value="data.companyName"></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="InfoList" style="padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="统一社会信用代码" :value="data.licenseNo"></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="InfoList" style="padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="法定代表人姓名" :value="data.legalPersonName"></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="InfoList" style="padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="法定代表人身份证号" :value="data.legalPersonId"></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="InfoList" style="padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="法定代表人手机号" :value="data.legalPersonPhone"></cell>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div class="InfoList width" style="padding:.5rem 1rem;background: #fff;text-align: left;">
            <cell style="font-size:1rem;padding:0;" title="企业经营地址" :value="data.licenseCity+data.licenseAddress"></cell>
        </div>
        <div style="text-align: center;font-size:1rem;color:#999999;margin-top: 1rem;">
            <div>信息不可修改，修改请联系客服人员</div>
        </div>
        <div style="text-align: center;font-size:1rem;color:#999999;display: flex;flex-direction: row;justify-content: center;align-items: normal;">
            <img style="margin-right: 0.5rem;width: 1.5rem;" src="https://china-mz.cn/bmimg/customer_service.svg" alt="">
            <a style="font-size:1rem;color:#06123C;line-height: 2rem;" href="tel:021-68888083">021-68888083</a>
        </div>
    </div>
</template>
<script>
import { XHeader,Cell } from 'vux'
export default {
    components: {
        XHeader,
        Cell
    },
    data() {
      return {
          data:{
            companyName:'-',
            licenseNo:'-',
            legalPersonName:'-',
            legalPersonId:'-',
            legalPersonPhone:'-',
            licenseCity:'-',
            licenseAddress:'-',
          },
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
        this.$vux.loading.show({text: '加载中...'});
        this.APIFunc.AjaxPost('memberInfoQuery', {
            queryContentList:["COMPANY"]
        }).then(data => {
            this.$vux.loading.hide();
            if(data.requestStatus =="SUCCESS"){
                let companyInfo = data.bizData.companyInfo;
                for(let i in this.data)
                {
                    for(let o in companyInfo)
                    {
                        if(o == i)
                        {
                            this.data[i] = companyInfo[o];
                        }
                    }
                }
            }else
            this.$vux.alert.show({title: '提示',content: data.returnMessage})
        });
    },  
    methods: {
        backReturn(){
            this.$router.push({
                path: '/mine',
            })
        },
    },
  }

</script>

<style>
.InfoList .vux-label{
    color: #999999;
}
.InfoList .weui-cell__ft{
    color: #333;
    font-size: 1rem;
    text-align: left;
}
.width .weui-cell__ft{
    width: 64%;
}
</style>