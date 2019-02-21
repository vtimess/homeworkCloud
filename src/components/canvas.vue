<template>
<el-form :model="myform" inline-message :rules="rules" ref="myform" >
    <el-form-item label="验证码" prop="verifyCode">
        <el-input v-model="myform.verifyCode"></el-input>
        <canvas id="c1" width='150' height='30' style='vertical-align:middle;cursor:pointer' @click='getCanvas'></canvas>
    </el-form-item>
</el-form>
</template>

<script>
export default {
    data(){
    var checkCode = (rule, value, callback) => {
        let str = this.vaildCode.join("").toLowerCase();
        // str='0000';   // 测试用
        let valid = value.toLowerCase() == str ? true : false;
        if (!valid) {
        callback(new Error("验证失败"));
        } else {
        callback();
        }
    };
        return{
            rlus:{
                verifyCode: [
                    { required: true, message: "请输入验证码", trigger: "blur" },
                    { validator: checkCode, trigger: "blur" }
                ]
            }
        }
    },
    methods:{
        getCanvas() {
      this.vaildCode = [];
      var w = 120;
      var h = 30;
      var c1 = document.getElementById("c1");
      c1.width = w;
      c1.height = h;
      var ctx = c1.getContext("2d");

      //1.填充一个矩形，作为背景颜色
      ctx.fillStyle = this.rc(80, 280);
      ctx.fillRect(0, 0, w, h);
      

      //2.绘制4个随机文字
      var pool = "ABCDEFGHJKLMNPQRSTUVWXY3456789";
      let txtValue;
      for (var i = 0; i < 4; i++) {
        var txt = pool[this.$util.random(0, pool.length - 1)]; //生成一个随机字符
        var fontSize = this.$util.random(18, 35); //字体大小
        ctx.font = fontSize + "px SimHei";
        var color = this.rc(80, 180); //字体颜色
        ctx.fillStyle = color;
        ctx.textBaseline = "top"; //文本基线
        ctx.save(); //保存画笔的当前状态：无旋转/无平移
        ctx.translate(30 * i + 30 / 2, 30 / 2);
        ctx.rotate((this.$util.random(-45, 45) * Math.PI) / 180);
        var x = -fontSize / 2;
        var y = -fontSize / 2;
        ctx.fillText(txt, x, y); //绘制文本
        // ctx.fillText('0', x, y);  //测试用
        ctx.restore(); //恢复画笔状态到最近一次保存的效果
        this.vaildCode.push(txt);
      }

      //3.绘制6条干扰直线
      for (var i = 0; i < 2; i++) {
        ctx.beginPath();
        var x1 = this.$util.random(0, w);
        var y1 = this.$util.random(0, h);
        ctx.moveTo(x1, y1);
        var x2 = this.$util.random(0, w);
        var y2 = this.$util.random(0, h);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = this.rc(0, 255);
        ctx.stroke(); //对直线路径进行描边
      }

      //4.绘制30个干扰点——半径为1的圆形路径
      for (var i = 0; i < 15; i++) {
        ctx.beginPath();
        var x = this.$util.random(0, w);
        var y = this.$util.random(0, h);
        ctx.arc(x, y, 1, 0, 2 * Math.PI);

        ctx.fillStyle = this.rc(0, 255);
        ctx.fill(); //填充圆形路径
      }
    }
    }
}
</script>
