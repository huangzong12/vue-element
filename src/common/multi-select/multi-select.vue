<template>
  <el-select :value="value" multiple v-bind="$attrs" @change="handleChange" v-draggable class="draggable">
    <check-all :indeterminate="isIndeterminate"
               v-model="checkAll"
               @change="handleCheckAllChange">
    </check-all>
    <el-checkbox-group :value="value" @change="handleCheckedChange">
      <multi-select-item v-for="(item,index) in options"
                         v-bind="item"
                         :key="index">
      </multi-select-item>
    </el-checkbox-group>
  </el-select>
</template>

<script>
  import checkAll from './check-all.vue'
  import MultiSelectItem from './multi-select-item.vue'

  export default {
    name: 'MultiSelect',
    components: {
      MultiSelectItem,
      checkAll
    },
    props: {
      value: {
        type: Array,
        default: () => []
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        checkAll: false,
        isIndeterminate: false
      }
    },
    computed: {
      allValues() {
        let array = [];
        this.options.forEach(item => {
          if (!item.disabled) array.push(item.value)
        });
        return array
      }
    },
    methods: {
      handleChange(selected) {
        if (selected.length === 0) {
          this.isIndeterminate = false;
        }
        this.$emit('input', selected);
        this.$emit('change', selected);
      },
      handleCheckAllChange(val) {
        let array = [];
        if (val) {
          array.push(...this.allValues)
        }
        this.isIndeterminate = false;
        this.$emit('input', array);
        this.$emit('change', array);
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.allValues.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allValues.length;
      }
    },
    created() {
      this.handleCheckedChange(this.value);
    }
  }
</script>
<style scoped>
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    display: none;
  }
</style>
