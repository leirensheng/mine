<template>
  <div id="main">
    <div class="out_box ">
      <div class="box">
          <h3>欢迎登陆</h3>
          <form id="form_register" class="form">
            <div class="form-group">
              <label for="phone">手机:</label>
              <input type="text" id="phone" v-model="data.phone" class="form-control" placeholder="请输入手机号码">
            </div>
            <div class="form-group">
              <label for="mima">密码：</label>
              <input type="password" id="mima"v-model="data.pwd" class="form-control" placeholder="请输入密码">
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
  import router from '../router/index'
  import Modal from './modal.vue'
  export default{
//    模态对话框组件
    components:{
      MyModal: Modal
    },
//    保存用户登录信息和模态对话框数据以及按钮状态
    data: function () {
      return {
        data: {
          phone: '',
          pwd: '',
        },
        dataForModal:{
          content:"输入有误，请重新输入!",
          resolveName:'确定',
          route: '/login'
        },
        btnVal: '提交登录信息',
        submiting: false
      }
    },
    methods: {
//      提交登录并验证
      submit: function (){
        this.btnVal='正在提交...'
        this.submiting=true
        axios({
          method: 'POST',
          url: 'http://127.0.0.1/leirensheng/php/user_login.php',

//          url: 'http://127.0.0.1/leirensheng/php/user_login.php',
          data: qs.stringify(this.data)
        }).then((res) => {
//          登录成功保存手机号并传递到header组件
          if(res.data.msg=='succ'){
            sessionStorage.setItem('phone',this.data.phone),
            this.$root.$emit('phone',sessionStorage['phone'])
            router.push('/main')
          }
          else if(res.data.msg=='none'){
            this.$refs.modal.active()
            this.data.phone=this.data.pwd=''
            this.btnVal='提交登录信息'
            this.submiting=false
          }
        }).catch((err) => console.log(err))
      }
    },
    computed:{
//      提交按钮状态
      access(){
        return this.data.phone!=''&&this.data.pwd!=''&&!this.submiting
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
