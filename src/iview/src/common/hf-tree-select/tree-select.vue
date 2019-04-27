<template>
  <Select ref="select"
          class="tree-select"
          v-bind="$attrs"
          @on-change="handleChange"
          :multiple="multiple">
    <tree-select-tree-item :selected-data="value"
                           :data="data"
                           :load-data="loadData"
                           @on-clear="handleClear"
                           @on-selected="handleTreeSelected"
                           @on-check="handleTreeCheck">
    </tree-select-tree-item>
  </Select>
</template>

<script>
  import TreeSelectTreeItem from './tree-select-tree.vue'

  export default {
    name: 'HfTreeSelect',
    components: {
      TreeSelectTreeItem
    },
    props: {
      value: {
        type: [String, Number, Array],
        default: ''
      },
      labelKey: {
        type: String,
        default: 'label'
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      childrenKey: {
        type: String,
        default: 'children'
      },
      data: {
        type: Array,
        default: () => []
      },
      multiple: {
        type: Boolean,
        default: false
      },
      expandAll: {
        type: Boolean,
        default: true
      },
      loadData: Function
    },
    data() {
      return {
        isChangedByTree: true,
        isInit: true
      }
    },
    provide() {
      return {
        parent: this
      }
    },
    methods: {
      handleChange(selected) {
        if (!this.isChangedByTree) this.$emit('input', selected)
        this.isChangedByTree = false
      },
      handleTreeCheck(selectedArray) {
        this.isChangedByTree = true
        this.$emit('input', selectedArray.map(item => item[this.valueKey]))
      },
      handleTreeSelected(selected) {
        this.isChangedByTree = true
        this.$emit('input', selected)
      },
      handleClear() {
        this.$refs.select.reset()
      }
    },
    created() {
      if (this.multiple && !Array.isArray(this.value)) {
        this.$emit('input', []);
      }
      if (!this.multiple && Array.isArray(this.value)) {
        this.$emit('input', '');
      }
    }
  }
</script>

<style lang="less">
  .tree-select {
    .ivu-select-dropdown {
      padding: 0 6px;
    }
  }
</style>
