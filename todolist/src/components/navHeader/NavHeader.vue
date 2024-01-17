<template>
<!-- 编写HTML内容 -->
    <div>
        <input placeholder="请输入任务名称" 
        v-model="value"
        @keydown.enter="enter">

    </div>
</template>
<script>
// 编写JS内容
import { defineComponent, ref } from 'vue';
export default defineComponent ({
    name: 'navHeader',//组件名称
    setup() {
    let value = ref('')
    //按回车确认
    let enter = () => {
        console.log(value.value);
    }
    return {
        value,
        enter
    }
    }
})

</script>

<style scoped lang='scss'>
input{
    margin-bottom: 10px;
}
</style>