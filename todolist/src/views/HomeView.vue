<template>
<!-- 编写HTML内容 -->
<div>
    <nav-header></nav-header>
    <nav-main></nav-main>
    <nav-footer></nav-footer>
    <div>{{ list }}</div>
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
    let list = computed( () => {
      return store.state.list
    })
    return {
      list
    }
  }
})

</script>

<style scoped lang='scss'>

</style>