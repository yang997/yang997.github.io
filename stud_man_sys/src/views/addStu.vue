<template>
  <div class="add-student content">
    <form id="addStudentForm">
      <div>
        <label for="name">姓名</label>
        <input type="text" name="name"  v-model="user.name"/>
      </div>
      <div class="sex">
        <label for="sex">性别</label>
        <input type="radio" name="sex" value="0" v-model="user.sex"/>
        <span>男</span>
        <input type="radio" name="sex" value="1" v-model="user.sex"/>
        <span>女</span>
      </div>
      <div>
        <label for="sNo">学号</label>
        <input type="text" name="sNo"  v-model="user.sNo"/>
      </div>
      <div>
        <label for="email">邮箱</label>
        <input type="text" name="email"   v-model="user.email" />
      </div>
      <div>
        <label for="birth">出生年</label>
        <input type="text" name="birth"  v-model="user.birth"/>
      </div>
      <div>
        <label for="phone">手机号</label>
        <input type="text" name="phone"  v-model="user.phone"/>
      </div>
      <div>
        <label for="address">住址</label>
        <input type="text" name="address"   v-model="user.address"/>
      </div>
      <div>
        <label for></label>
        <input type="button" class="btn"  value="提交" @click="submit" />
        <input type="button" class="btn" value="重置" @click="reset" />
      </div>
    </form>
  </div>
</template>

<script>
import api from '../api.js'
export default {
      data() {
        return {
          user: {
              sex: 0,
              name: '',
              birth: '',
              phone: '',
              address: '',
              sNo: '',
              email: ''
          }
        }
      },
      methods: {
        submit() {
                      console.log(this.user)

          api
            .addStu(this.user)
            .then(data => {
              if(data.data.status == 'success') {
                alert(data.data.msg)
                this.$store.dispatch('getStuList')
                      .then(()=>{
                          this.$router.push('/stulist')
                  })
              } else {
                alert(data.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        reset() {
          this.user = {
              sex: 0,
              name: '',
              birth: '',
              phone: '',
              adddress: '',
              sNo: '',
              email: ''
          }
        }

      }
};
</script>

<style >
    input, button {
    cursor: pointer;
    border: none;
    outline: none;
    outline-offset: 0;
    margin-left: 6px;
}
</style>