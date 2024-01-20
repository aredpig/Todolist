<template>
    <!-- 编写HTML内容 -->
    <div v-if="list.length > 0">
        <div v-for="(item, index) in list" :key="index">
            <div class="item">
                <input type="checkbox" v-model="item.complete">
                {{ item.title }}
                <button class="del" @click="del(item, index)">删除</button>
            </div>
        </div>
    </div>
    <div v-else>
        暂无内容
    </div>
</template>
<script>
// 编写JS内容
import { defineComponent, ref, withCtx } from 'vue';
export default defineComponent({
    name: 'navMain', //组件名称
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    emits: ['del'],
    setup(props, ctx) {
        let del = (item, index) => {
            ctx.emit('del', index)
        }
        return {
            del
        }
    }
})

</script>

<style scoped lang='scss'>
.item {
    height: 35px;
    line-height: 35px;
    position: relative;
    width: 160px;
    cursor: pointer;

    button {
        position: absolute;
        right: 20px;
        top: 6px;
        display: none;
        z-index: 99;

    }

    &:hover {
        background: #ddd;

        button {

            display: block;
        }
    }

}
</style>