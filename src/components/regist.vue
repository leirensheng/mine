<template>
  <div id="main">
    <div class="out_box">
      <div class="box">
        <h3>欢迎注册</h3>
        <form id="form_register" class="form col-xs-12">
          <div class="form-group">
            <label for="phone">手机:</label>
            <input type="text" id="phone" v-model="data.phone" class="form-control" placeholder="请输入手机号码">
          </div>
          <div class="form-group">
            <label for="mima">密码：</label>
            <input type="password" id="mima"v-model="data.pwd" class="form-control" placeholder="请输入密码">
          </div>
          <div class="form-group">
            <label for="mima2">确认密码:</label>
            <input type="password" id="mima2"v-model="data.pwd2" class="form-control" placeholder="请再次输入密码">
          </div>
          <div class="form-group">
            <input type="button" class="btn btn-primary btn-block " :value="btnVal" :disabled="!access" @click="submit">
          </div>
        </form>
      </div>
      <img src="../../static/img/canting.jpg" alt="">
    </div>
    <My-Modal ref="modal" :data="dataForModal"></My-Modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import Modal from './modal.vue'
  import router from '../router/index'
  export default{
//       保存用户登录信息和模态对话框数据以及按钮相关信息
    data: function () {
      return {
        data: {
          phone: '',
          pwd: '',
          pwd2: ''
        },
        dataForModal:{
          content:"该用户已注册!",
          resolveName:'去登陆',
          route: '/login'
        },
        btnVal: '提交登录信息',
        submiting: false
      }
    },
//    模态对话框组件
    components:{
      MyModal:Modal
    },
    computed: {
//      提交注册按钮状态
      access(){
        return (this.data.pwd==this.data.pwd2&&this.data.pwd!=''&&this.data.phone!='')&&!this.submiting
      }
    },
    methods: {
//      提交注册请求并验证信息
      submit: function () {
        this.btnVal='正在提交...'
        this.submiting=true
        axios({
          method: 'POST',
          url: 'http://127.0.0.1/leirensheng/php/user_regis.php',
          data: qs.stringify(this.data)
        }).then((res) => {
          if(res.data.msg=='succ'){
//            将手机号存储到sessionStrage并且传到header组件
            sessionStorage.setItem('phone',this.data.phone)
            this.$root.$emit('phone',sessionStorage['phone'])
            router.push('/main')
          }
          else if(res.data.msg=='existed'){
            this.btnVal='提交注册信息'
            this.submiting=false
            this.$refs.modal.active()
            this.data.phone=this.data.pwd=this.data.pwd2=''
          }
        }).catch((err) => console.log(err))
      }
    }
  }
</script>

<style scoped>
  #main{
    height: 100%;
    display:flex;
    align-items: center;
  }
  h3{
    text-align: center;
    margin: 0;
    font-family: "Microsoft Yahei";
    color: #241d1e;
  }
  .out_box{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img{
    width: 100%;
    z-index: -1;
  }
  .box{
    width: 50%;
    position: absolute;
    background-color: rgba(255,255,255,0.7);
    border-radius: 5px;
    padding:1%;
  }
  .form-group{
    margin-bottom: 5%;
  }
</style>
