<template>
    <div>
      <div class="box">
        <form id="form_register" class="form">
          <div class="form-group">
            <label for="phone">输入原密码:</label>
            <input type="password" id="phone" v-model="originPwd" class="form-control" placeholder="请输入原密码">
          </div>
          <div class="form-group">
            <label for="mima0">输入新密码：</label>
            <input type="password" id="mima0"v-model="pwd0" class="form-control" placeholder="请输入新密码">
          </div>
          <div class="form-group">
            <label for="mima1">再次输入新密码：</label>
            <input type="password" id="mima1"v-model="pwd1" class="form-control" placeholder="请再次输入新密码">
          </div>
          <div class="form-group">
            <input type="button" class="btn btn-primary btn-block " :value="btnVal" :disabled="!access" @click="submit">
          </div>
        </form>
      </div>
      <My-Modal ref="modal" :data="dataForModal"></My-Modal>

    </div>
</template>

<script>
  import Modal from './modal.vue'
  import axios from 'axios'
  import qs from 'qs'
  export default{
//    模态对话框组件
    components:{
      MyModal: Modal
    },
    data: function () {
      return {
        originPwd: '',
        pwd0: '',
        pwd1: '',
//        模态框数据
        dataForModal:{
          content:"输入有误，请重新输入!",
          resolveName:'确定',
          route: '/center/main'
        },
//        按钮信息
        btnVal: '提交修改',
        submiting: false
      }
    },
    computed: {
      access(){
        return (this.pwd0==this.pwd1)&&(this.pwd0 !='')&&(this.originPwd!='')&&!this.submiting
      }
    },
    methods:{
      submit(){
        this.btnVal='提交中...'
        this.submiting=true
        axios({
          method: 'POST',
          url: 'http://127.0.0.1/leirensheng/php/user_modify.php',
          data: qs.stringify({'phone': sessionStorage['phone'],'originPwd':this.originPwd,'pwd':this.pwd0 })
        }).then((res) => {
          if(res.data.msg=='succ'){
            this.dataForModal.content="更改成功！"
            this.$refs.modal.active()
          }
          else if(res.data.msg=='wrong'){
            this.dataForModal.content="原密码输入错误！"
            this.dataForModal.route='modify'
            this.$refs.modal.active()

          }
          this.btnVal='提交修改'
          this.originPwd=this.pwd0=this.pwd1=''
          this.submiting=false
        }).catch((err) => console.log(err))
      }
    }
  }
</script>

<style scoped>
  .box{
    margin:  auto;
    width: 100%;
    background-color: rgba(255,255,255,0.6);
    border-radius: 5px;
    padding:3%;
  }
  .form-group{
    margin-bottom: 5%;
  }
</style>
