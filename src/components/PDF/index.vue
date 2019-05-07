<template>
  <div style="height: 100%;overflow-y: scroll;">
    <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
export default {
    data() {
      return {
          pdfDoc:'',
          pages:[],
          loading_Flg:false,
      };
    },
    watch: {

    },
    created() {

    },
    computed: {

    },
    mounted() {
      this._loadFile('/9542037c844f43758d35c8531c0edab9-LOAN.pdf')
    },  
    methods: {
          _renderPage (num) {
        this.pdfDoc.getPage(num).then((page) => {
          let canvas = document.getElementById('the-canvas' + num)
          let ctx = canvas.getContext('2d')
          let dpr = window.devicePixelRatio || 1
          let bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1
          let ratio = dpr / bsr
          let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
          canvas.width = viewport.width * ratio
          canvas.height = viewport.height * ratio
          canvas.style.width = viewport.width + 'px'
          canvas.style.height = viewport.height + 'px'
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          page.render(renderContext)
          if (this.pages > num) {
            this._renderPage(num + 1)
          }
        })
      },
      _loadFile (url) {
        PDFJS.getDocument(url).then((pdf) => {
          this.pdfDoc = pdf
          console.log(pdf)
          this.pages = this.pdfDoc.numPages
          this.$nextTick(() => {
            this._renderPage(1)
          })
        })
      }
    },
  }

</script>
<style lang="less">
.cpdf {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    text-align: center;
    height: 100%;
    overflow: auto;
    padding-top: 20px;
    .contor {
     margin-bottom: 10px;
    }
  }
 }
</style>
