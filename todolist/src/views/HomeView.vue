<template>
<!-- 编写HTML内容 -->
<div>
    <nav-header @task="add"></nav-header>
    <nav-main :list="list" @del="del"></nav-main>
    <nav-footer :list="list" @clear="clear"></nav-footer>
</div>
</template>
<script>
// 编写JS内容
import NavHeader from '@/components/navHeader/NavHeader';
import NavMain from '@/components/navMain/NavMain';
import NavFooter from '@/components/navFooter/NavFooter';
import { defineComponent,ref, computed} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default defineComponent ({
  name: 'home', //组件名称
  props: {
    //用来接收父组件数据
  },
  components: {
    //定义子组件的地方
    NavHeader,
    NavMain,
    NavFooter
  },
  setup(props, ctx) {
    let store = useStore()
    let value = ref('')
    let add = (val) => {
      value.value = val
      let flag = true
      list.value.map((item) => {
        if (item.title === value.value) {
          flag = false
          alert('任务已存在')
        }
      })
      if (flag) {
        store.commit('addTodo', {
        title: value.value,
        complete: false
      })
      }
      
    }
    let del = (val) => {
      store.commit('delTodo', val)
    }
    let clear = (val) => {
      console.log(val)
      store.commit('clear', val)
    }
    let list = computed( () => {
      
      return store.state.list
    })
    return {
      list,
      add,
      del,
      clear
    }
  }
})

</script>

<style scoped lang='scss'>

</style>