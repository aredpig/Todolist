<template>
    <!-- 编写HTML内容 -->
    <div class="container">
        <div>已完成{{ isComplete}} / 全部 {{all}}</div>
        <div class="btn" v-if="isComplete > 0">
            <button @click="clear">清除已完成</button>
        </div>
        
    </div>
</template>
<script>
// 编写JS内容
import { defineComponent, ref } from 'vue';
export default defineComponent ({
    name: 'navFooter', //组件名称

    setup() {
        let isComplete = ref(1);
        let all = ref(3);
        let clear = () => {
            console.log('clear');
        }
    return {
        isComplete,
        all,
        clear
    }
    }
})

</script>

<style scoped lang='scss'>
  .container {
    display: flex;
    align-items: center;
    .btn {
        margin-left: 10px;
    }
  }
  

</style>