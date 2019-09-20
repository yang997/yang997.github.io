<template>
  <div class="container">
    <div class="left-menu">
      <dl>
        <dt>学生管理</dt>
        <router-link to='/stulist' tag='dd'>学生列表</router-link>
        <router-link to='/addstu' tag='dd'>新增学生</router-link>
      </dl>
    </div>
    <div class="right-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style >
</style>