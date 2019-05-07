<template>
    <iframe id="iframe" :src="url" frameborder="0"></iframe>
</template>

<script>
export default {
    data() {
      return {
          url:`../../components/iframe.html?${this.$route.query.url}`
      };
    },
    created() {

    },
    computed: {

    },
    mounted() {

    },  
    methods: {
    }
  }

</script>
<style>
    body{
        margin: 0;
        padding: 0;
    }
    iframe{
        position: relative;
        width: 100%;
        height: 100%;
    }
    img{
        width: 700;
    }

</style>