<template>
  <div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
<style lang="less">
@import '~vux/src/styles/1px.less';
</style>
<style lang="less">
@import '~vux/src/styles/close.less';
</style>
<style>
body{
    width: 100%;
    height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  background: #f0eff5;
}
</style>
