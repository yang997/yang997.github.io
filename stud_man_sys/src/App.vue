<template>
  <div id="app" class="wrapper">
    <sys-header></sys-header>
    <left-menu></left-menu>
  </div>
</template>

<script>
import sysHeader from './components/sysHeader'
import leftMenu from './components/leftMenu'
// import api from './api.js'
import {mapActions} from 'vuex'
export default {
  components:{
    sysHeader,
    leftMenu
  },
  created() {
    this.getStuList()
    // api.findByPage(1,15).then(data => console.log(data))
  },
  methods: {
    ...mapActions(['getStuList'])
  }
}
</script>

<style >

html,body,.wrapper {
    height: 100%;
}
button {
    cursor: pointer;
} 
input{
    border: 1px solid #b3bcc5;
}
.wrapper {
    position: fixed;
    height: 100%;
    width: 100%;

}
.wrapper .header {
    width: 100%;
    height: 70px;
    line-height: 70px;
    background: #354457;
    position: absolute;
}
.wrapper .header span {
    margin-left: 20px;
    font-size: 14px;
    color: #b3bcc5;
}
.wrapper .container {
    width: 100%;
    height: 100%;
    padding-top: 70px;
    box-sizing: border-box;
    background: #eee;
}

.wrapper .left-menu {
    float: left;
    width: 200px;
    height: 100%;
    box-sizing: border-box;
    background: #4d5e70;
}
.left-menu dl {
    font-size: 14px;
    color: #b3bcc5;
}
.left-menu dl dt {
    font-weight: bold;
    padding: 10px;
}
.left-menu dl dd {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    padding-left: 30px;
}
.left-menu dl dd.active {
    background: #ddd;
    color: #354457;
}
/* 主区域 */
.wrapper .right-content {
    /* min-width: 800px; */
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    height: 100%;
    overflow: auto;

}
.right-content .content {
    top: 0;
    position: absolute;
    width: 100%;
}

.right-content form {
    /* position: absolute; */
    /* left: calc(50% - 200px); */
    width: 400px;
    margin: 50px auto;
}
 .right-content  form label {
    display: inline-block;
    width: 80px;
    text-align: right;
    font-size: 16px;
}
.right-content form div {
    margin: 10px auto;
}
.right-content  form input {
    font-size: 16px;
}
.right-content  form .btn {
    font-size: 16px;
    padding: 5px 30px;
}
/* 添加学生 */
.right-content .add-student {
    /* width: 100%; */
    /* display: none; */
}

/* 搜索  学生列表*/
.student-list {
    /* display: none; */
    min-width: 800px;
    /* overflow: auto; */

}
.student-list .search-bar {
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 16px;
}
.search-bar label {
    font-size: 16px;
    color: #646987;
    font-weight: 800;
}
.search-bar input {
    font-size: 16px;
    height: 30px;
    width: 200px;
}
.search-bar .search-submit {
    padding: 0 10px;
    height: 30px;
    background: #354457;
    color: #fff;
    font-size: 16px;
}
.search-submit:hover {
    background: #1e2936;
}
table {
    width:100%;
    font-size: 14px;
    background: #fff;
}
table thead {
     background: #e3e8ee;
}
table th, table td {
    text-align: center;
    padding: 10px;
    /* border: 2px solid #ccc; */
}
table th {
    color: #646987;
    font-weight: bold;
}
table .btn {
    padding: 3px 10px;
    color: #fff;
    cursor: pointer;
}
table .btn.edit {
    background: #5cb85c;
}
table .btn.edit:hover {
    background: #398439;
    border-color: #255625;
}
table .btn.del {
    background: #d9534f;
}
table .btn.del:hover {
    background: #c9302c;
}
#turn-page {
    float: right;
    margin: 20px;
}
#turn-page li{
   display: inline-block;
   padding: 5px 10px;
   border: 1px solid #ddd;
   color: #b3bcc5;
   font-size: 14px;
   cursor: pointer;
}
#turn-page li.cur-page {
    background-color: #428bca;
    border: 1px solid #428bca;
    color: #fff;
}
.model {
    /* display: none; */
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.model .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
}
.model .model-content {
    width: 500px;
    height: 450px;
    background-color: #ccc;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -225px;
}
.model .model-content h3 {
    font-size: 16px;
    color: #999;
}
</style>
