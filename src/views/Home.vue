<template>
  <el-container style="height:100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1', '2','3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>分类</template>
        <el-menu-item-group>
          <template slot="title">分类管理</template>
          <el-menu-item index="/category">分类列表</el-menu-item>
          <el-menu-item index="/addcategory">添加分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>文章详情</template>
         <el-menu-item-group title="分组2">
           <template slot="title">文章管理</template>
          <el-menu-item index="/detail">文章列表</el-menu-item>
          <el-menu-item index="/adddetail">添加文章</el-menu-item>
          <el-menu-item index="/contribute">话题审核</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>管理员</template>
         <el-menu-item-group title="分组2">
           <template slot="title">人员管理</template>
          <el-menu-item index="/user">管理员详情</el-menu-item>
          <el-menu-item index="/adduser">添加管理员</el-menu-item>
          <el-menu-item index="/webuser">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
</el-container>

</template>
<script>

</script>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

