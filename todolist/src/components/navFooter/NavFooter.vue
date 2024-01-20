<template>
    <!-- 编写HTML内容 -->
    <div class="container">
        <div>已完成{{ isComplete}} / 全部 {{ list.length }}</div>
        <div class="btn" v-if="isComplete > 0">
            <button @click="clear">清除已完成</button>
        </div>
        
    </div>
</template>
<script>
// 编写JS内容
import { defineComponent, ref, computed} from 'vue';
export default defineComponent ({
    name: 'navFooter', //组件名称
    props: {
    list: {
        type: Array,
        required: true
    }
    },
    setup(props, ctx) {
        let isComplete = computed(() => {
            let arr = props.list.filter(item => {
                return item.complete === true
            })
            return arr.length
        })
        let clear = () => {
            let arr = props.list.filter(item => {
                return item.complete === false
            })
            ctx.emit('clear', arr)
        }
    return {
        isComplete,
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