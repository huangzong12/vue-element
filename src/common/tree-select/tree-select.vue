<template>
  <el-select v-bind="$attrs" v-on="$listeners">
    <tree-select-item v-bind="$attrs" :options="options"></tree-select-item>
  </el-select>
</template>

<script>
  import TreeSelectItem from './tree-select-item.vue'

  export default {
    name: 'TreeSelect',
    components: {
      TreeSelectItem
    },
    props: {
      options: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
