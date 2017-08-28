<template>
  <div class="modal" id="mymodal-data" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" >
    <div class="modal-dialog " id="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
          <h4 class="modal-title">温馨提示</h4>
        </div>
        <div class="modal-body">
          <p>{{data.content}}</p>
        </div>
        <div class="modal-footer">
          <router-link   :to="data.route"><button class="btn btn-primary" data-dismiss="modal">{{data.resolveName}}</button></router-link>
          <button type="button" class="btn btn-primary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    methods: {
//      定义模态框打开的方法
      active () {
        $("#mymodal-data").modal()
      }
    },
//    接收其他组件传入的数据
    props:['data']
  }
</script>

<style>
  /*设定模态框显示位置*/
  #modal-dialog{
    margin: 20% auto;
    width: 40%;
  }
</style>
