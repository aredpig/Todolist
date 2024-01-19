<template>
  <div>
    <h1>This is an about page</h1>
    <child :msg="msg"></child>

  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import child from '../components/child/Child'
export default defineComponent ({
  name:'about',
  components: {
    child
  },
  setup() {
    let msg = ref('这是父组件')
    return {
      msg
    }
  }
})

</script>
