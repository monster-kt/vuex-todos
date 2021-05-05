import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框内容
    inputValue: '',
    nextId: 5,
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为 store 的 inputValue 赋值
    setInput(state, val) {
      state.inputValue = val
    },
    // 添加 列表项
    addItem(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 根据 id 删除事项
    removeItem(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    cbchenge(state, param) {
      const index = state.list.findIndex(x => x.id === param.id)
      if (index !== -1) {
        state.list[index].done = param.val
      }
    },
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeViewkey(state, val) {
      state.viewKey = val
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      } else if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      } else if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {}
})
