<template>
<!-- 编写HTML内容 -->
<div v-for="(item, index) in list" :key="index">
    <div>
        <input type="checkbox" v-model="item.complete">
        {{ item.title }}
        <button>删除</button>
    </div>
</div>


</template>
<script>
// 编写JS内容
import { defineComponent, ref } from 'vue';
export default defineComponent ({
  name: 'navMain', //组件名称
  setup() {
    let list = ref([
        {
            title:'吃饭',
            complete:'true'
        },
        {
            title:'睡觉',
            complete:'false'
        },
        {
            title:'敲代码',
            complete:'false'
        }
    ])
    return {
        list
    }
  }
});

</script>

<style scoped lang='scss'>

</style>