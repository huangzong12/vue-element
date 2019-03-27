<template>
  <li class="el-select-dropdown__item" @mouseenter="hoverItem">
    <el-checkbox v-bind="$attrs" v-on="$listeners">全选</el-checkbox>
  </li>
</template>

<script>
  export default {
    name: 'checkAll',
    inject: ['select'],
    props: {
      checkAll: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      hoverItem() {
        this.select.hoverIndex = -1;
        this.select.hoverOption = -1;
      }
    }
  }
</script>
