<template>
    <div id="main">
       <div id="content">
         <h1 class="text-center text-primary">欢迎点餐</h1>
         <router-link to="/main">
           <img src="../../static/img/kid-foods.jpg" class="img-responsive center-block">
         </router-link>
       </div>
    </div>
</template>
<script>
</script>
<style scoped>
  /*flex布局居中*/
  #main{
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*内容高度*/
  #content{
    height: 50%;
  }
</style>
