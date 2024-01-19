<template>
    <div>
      <h1>This is child page</h1>
      <h2>{{ msg }}</h2>
    </div>
</template>
<script>
import {defineComponent, ref} from 'vue'
export default defineComponent ({
    name:'child',
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        console.log(props)
        return {
            
        }
    }
})

</script>
  