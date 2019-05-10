<template>
    <div style="height: 100%;overflow: hidden;">
        <div style="position: fixed;top: 0;left: 0;width: 100%;height: 4rem;z-index: 1;">
            <x-header @on-click-back="routerF('/setting')" style="background-color:#06123C;padding: .6rem 0;" :left-options="{backText: '',preventGoBack:true}">关于我们</x-header>
        </div>
        <div style="padding:4.5rem 1rem 0.8rem;text-align: left;">
            <h3 style="font-size: 1.3rem;">上海溟宗供应链管理有限公司</h3>
        </div>
        <div style="padding:.2rem 1rem;text-align: left;position: relative;">
            <h3 class="leftIocn" style="font-size: 1.2rem;margin-left: 1rem;">公司介绍</h3>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div style="padding:1rem;text-align: left;">
            <div style="font-size: 1rem;color:#000;text-align: justify;">
            上海溟宗供应链管理有限公司成立于2018年8月，为上海北溟数据科技有限公司子公司，公司依托北溟集团丰富的数据资源和强大的技术力量，
            通过搭建中小微企业交易金融管理平台，致力于实现中小微企业与金融机构（即资产和资金）在线高效、安全、便捷的需求匹配对接。
            通过对中小微企业供应链信息流、物流、资金流等实时信息的掌控和在线分析，从而实现“帮好的企业找到更便宜的钱”的战略愿景！
            </div>
        </div>
        <div style="padding:.2rem 1rem;text-align: left;position: relative;">
            <h3 class="leftIocn" style="font-size: 1.2rem;margin-left: 1rem;">联系我们</h3>
        </div>
        <div style="height: 1px;width: 90%;background: #ddd;margin: 0 auto;"></div>
        <div style="padding:1rem;text-align: left;color:#000">
            <div style="font-size: 1rem;">联系电话：<a style="font-size:1rem;color:#06123C;line-height: 2rem;" href="tel:021-68888083">021-68888083</a></div>
            <div style="font-size: 1rem;">地址：上海市浦东新区东方路3539号</div>
        </div>
    </div>
</template>
<script>
import { XHeader, } from 'vux'
export default {
    components: {
        XHeader,
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
.leftIocn::before{
    content: "";
    width: 4px;
    height: 1.2rem;
    background: #2c3e50;
    display: block;
    position: absolute;
    left: 1.2rem;
    top: .5rem;
}
</style>