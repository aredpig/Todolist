import { createStore } from 'vuex'

export default createStore({
  // 定义所需要的状态，为了达到数据共享
  state: {
    list: [
    {
        title:'吃饭',
        complete:false,
    },
    {
        title:'睡觉',
        complete:false,
    },
    {
        title:'敲代码',
        complete:false,
    }]
  },
  // 
  getters: {
  },
  // 同步修改state，不能用来异步操作
  mutations: {
    // 添加任务列表
    addTodo(state, data) {
      state.list.push(data);

    },
    delTodo(state, data) {
      state.list.splice(data, 1);
    },
    clear(state, data) {
      //已完成的过滤
      state.list = data;
    }
  },
  // 异步提交mutation，发请求，定时器之类在这里
  actions: {
  },
  modules: {
  }
})
