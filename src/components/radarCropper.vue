
<template>
  <section>
    <el-dialog title="上传图片" :visible.sync="dialogVisible" width="1050px" :before-close="beforeClose" :append-to-body="true">
      <div class="c-flex m-b-10">
        <span class="flex-1">裁剪框</span>
        <span class="flex-1">预览框</span>
      </div>
      <div class="relative">
        <div class="vueCropper">
          <vueCropper ref="cropper" v-if="loading" :infoTrue="true" :full="option.full" :maxImgSize="option.maxImgSize" :centerBox="option.centerBox" @realTime="realTime" :img="option.img" :outputSize="option.outputSize" :outputType="option.outputType" :info="option.info" :canScale="option.canScale" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixed="option.fixed" :fixedNumber="option.fixedNumber"></vueCropper>
        </div>
        <img :src="newImg" class="img" @load="load">
        <!-- <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
          <div :style="previews.div" style="    background-color: #e4e7ed;">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div> -->
        <img :src="realImg" alt="" style=" width: 350px;position: absolute;right: 80px;top: 5px;">
      </div>
      <hr>
      <div style="display: flex;justify-content: space-between;">
        <el-upload class="avatar-uploader" action="http" :show-file-list="false" :auto-upload="false" 
        :on-change="changeFile">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        </el-upload>
        <el-button type="danger" @click="onCubeImg">确定裁剪图片</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import VueCropper from "vue-cropper";
import Card from "@/services/card.js";
export default {
  label: "图片裁剪",
  name: "radarCropper",
  props: ["fixedNumber", "img", "dialogVisible"],
  components: { VueCropper },
  data() {
    return {
      previews: {},
      loading: false,
      newImg: "",
      realImg: "",
      option: {
        img: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        outputSize: 0.5, // 裁剪生成图片的质量
        outputType: "jpeg", //裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        fixed: true, //是否开启截图框宽高固定比例,
        centerBox: true,
        full: true
      },
      realImgStyle: {
        width: "375px",
        position: "absolute",
        right: "80px",
        top: "5px"
      }
    };
  },
  created() {
    this.option.fixedNumber = this.fixedNumber || [4, 4];
    this.option.fixed = Boolean(this.fixedNumber);
    if (!this.option.fixed) {
      this.realImgStyle = {
        "max-width": "375px",
        "max-height": "500px",      
        position: "absolute",
        right: "80px",
        top: "5px"
      };
    }
  },
  methods: {
    succ(e){
      console.log('succ',e)
    },
    err(e){
      console.log('err',e)
    },
    load(e) {
      let img = e.path[0];
      let height = img.offsetHeight;
      let width = img.offsetWidth;
      if (this.fixedNumber) {
        let molh = width * this.fixedNumber[1] / this.fixedNumber[0],
          length,
          realh,
          realw;
        if (molh < height) {
          realh = molh;
        } else if (molh > height) {
          realh = height;
          realw = height * this.fixedNumber[0] / this.fixedNumber[1];
        }
        this.option.autoCropHeight = realh;
        this.option.autoCropWidth = realw;
      } else {
        this.option.autoCropHeight = height;
        this.option.autoCropWidth = width;
      }
      this.loading = true;
    },
    beforeClose() {
      this.$emit("update:dialogVisible", false);
    },
    changeFile(e) {
      console.log(e);
      this.newImg = e.url;
      this.option.img = e.url;
    },
    onCubeImg() {
      var aLink = document.createElement("a");
      aLink.download = "demo";
      // 获取截图的base64 数据
      this.$refs.cropper.getCropData(data => {
        Card.StoragePhoto({ baseString: data.split(",")[1] }).then(res => {
          this.$emit("setUrl", { url: res.result });
        });
      });
    },
    realTime(data) {
      this.previews = data;
      this.$refs.cropper.getCropData(data => {
        this.realImg = data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.img {
  position: absolute;
  z-index: -1;
  visibility: hidden;
  max-width: 500px;
  max-height: 500px;
}
.vueCropper {
  width: 500px;
  height: 500px;
}
.relative{
  position: relative;
}
</style>
