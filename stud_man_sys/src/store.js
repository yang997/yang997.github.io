import Vue from 'vue'
import Vuex from 'vuex'
import api from './api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stuList: [],
    page: 1,
    size: 15,
    showModel: false,
    editUser: {},
    total: 0,
    keyWord: ''
  },
  mutations: {
    setStuList(state, list) {
      state.stuList = list
    },
    setShowModel(state, bool) {
      state.showModel = bool
    },
    setEditUser(state, user) {
      state.editUser = user
    },
    setTotal(state, cont) {
      state.total = cont
    },
    setKeyword(state,word= '') {
      state.keyWord = word
    }
  },
  actions: {
    getStuList({commit, state, dispatch},page = 1) {
      if(state.keyWord !== '') {
        dispatch('stuSearch',page)
      }
      else{
        return api
        .findByPage(page)
        .then(data => {
          commit('setStuList', data.data.data.findByPage)
          commit('setTotal', data.data.data.cont)
        })
        .catch(err => console.log(err))
      }
    },
    updateStu({commit, state,dispatch},data) {
      console.log(data)
      return api
        .updateStu(data)
        .then(msg =>{
          if(msg.data.status == 'success') {
            Object.assign(state.editUser,data)
            // dispatch('getStuList')
            commit('setShowModel',false)
            // commit('setEditUser')
            return msg.data.msg            
          }
          else{
            return Promise.reject(msg.data.msg)
          }
        })      
    },
    delBySno({commit},sNo){
      api
        .delBySno(sNo)
        .then(() => {
          this.dispatch('getStuList')
          alert('删除成功')
        })
    },
    stuSearch({state,commit},page){
      api
        .stuSearch(state.keyWord,page)
        .then(data => {
          console.log(data)
          commit('setTotal',data.data.data.cont)
          commit('setStuList', data.data.data.searchList)
        })
    }
  }
})
