<template>
  <el-tree ref="tree"
           :data="options"
           :default-checked-keys="multiple?value:[]"
           :highlight-current="!multiple"
           :current-node-key="!multiple?value:''"
           :expand-on-click-node="false"
           node-key="value"
           check-strictly
           :show-checkbox="multiple"
           @node-click="handleNodeClick"
           @check="handleCheckSelect">
  </el-tree>
</template>

<script>
  import Emitter from '../../utils/emitter';

  export default {
    name: 'TreeSelectTree',
    inject: ['select'],
    mixins: [Emitter],
    props: {
      value: {
        require: true
      },
      options: {
        type: Array,
        default: () => []
      },
      multiple: Boolean
    },
    watch: {
      options() {
        this.initData();
      }
    },
    methods: {
      getData(data, callback) {
        data.forEach(item => {
          if (item.children && item.children.length) {
            this.getData(item.children, callback)
          }
          callback(item)
        })
      },
      initData() {
        let array = [];
        this.getData(this.options, item => {
          item.currentLabel = item.label;
          array.push(item);
        });
        this.select.optionsCount = array.length;
        this.select.filteredOptionsCount = array.length;
        this.select.options = array;
        this.select.cachedOptions = array;
      },
      setChecked(val) {
        this.$refs.tree && this.$refs.tree.setCheckedKeys(val);
      },
      handleCheckSelect(val) {
        let obj = this.select.options.find(item => item.value === val.value);
        if (obj) {
          this.dispatch('ElSelect', 'handleOptionClick', [obj, true]);
        }
      },
      handleNodeClick(val) {
        if (!this.multiple) {
          this.handleCheckSelect(val)
        }
      }
    },
    created() {
      this.initData();
    },
    mounted() {
      if (this.multiple) {
        this.$watch('value', this.setChecked)
      }
    }
  }
</script>
