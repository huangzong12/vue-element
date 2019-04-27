<template>
  <Tree :data="data"
        @on-check-change="handleCheckSelect"
        @on-select-change="handleSelect"
        v-on="parent.$listeners"
        v-bind="parent.$attrs"
        check-strictly
        check-directly
        :children-key="childrenKey"
        :load-data="loadDataCallback"
        :show-checkbox="multiple">
  </Tree>
</template>

<script>
  import Emitter from '@/mixins/emitter'

  const arrayEqual = (arr1, arr2) => {
    // 判断数组的长度
    if (arr1.length !== arr2.length) {
      return false
    } else {
      // 循环遍历数组的值进行比较
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }
  }

  export default {
    name: 'TreeSelectTree',
    mixins: [Emitter],
    props: {
      data: {
        type: Array,
        default: () => []
      },
      selectedData: {
        require: true
      },
      loadData: Function
    },
    data() {
      return {
        flatDic: {},
        checkedArray: []
      }
    },
    inject: ['parent'],
    computed: {
      expandAll() {
        return this.parent.$props.expandAll
      },
      labelKey() {
        return this.parent.$props.labelKey
      },
      valueKey() {
        return this.parent.$props.valueKey
      },
      childrenKey() {
        return this.parent.$props.childrenKey
      },
      multiple() {
        return this.parent.$props.multiple
      }
    },
    watch: {
      data(newData) {
        this.updateFlagDic(newData)
        if (this.multiple) {
          let selectArray = []
          this.selectedData.forEach(value => {
            if (value in this.flatDic) selectArray.push(value)
          })
          this.$emit('on-check', selectArray.map(value => this.flatDic[value]))
        }
        if (this.expandAll) this.checkData(newData, false, true)
      },
      selectedData(newVal, oldVal) {
        if (this.multiple) {
          if (arrayEqual(newVal, oldVal)) return
          const filtedNewVal = newVal.filter(value => value in this.flatDic)
          this.$emit('on-check', filtedNewVal.map(value => this.flatDic[value]))
          this.$emit('on-clear')
          this.$nextTick(() => {
            this.checkData(this.data, true)
          })
        } else {
          this.selectChange(newVal)
        }
      }
    },
    methods: {
      checkEmit(value, label) {
        this.dispatch('iSelect', 'on-select-selected', {value, label})
        this.$emit('on-select-selected', {value, label})
      },
      updateFlagDic(newData) {
        let newFlagDic = {}
        this.setFlagDic(newData, item => {
          newFlagDic[item[this.valueKey]] = item
        })
        this.flatDic = newFlagDic
      },
      setFlagDic(data, callback) {
        data.forEach(item => {
          if (item.children && item.children.length) {
            this.setFlagDic(item.children, callback)
          }
          callback(item)
        })
      },
      checkData(data, emit, expandAll) {
        data.forEach(item => {
          this.$set(item, 'title', item[this.labelKey])
          if (this.multiple) {
            if (this.selectedData.includes(item[this.valueKey])) {
              this.$set(item, 'checked', true)
              this.checkedArray.push(item)
              if (emit) this.checkEmit(item[this.valueKey], item[this.labelKey])
            } else {
              this.$set(item, 'checked', false)
            }
          } else {
            if (item[this.valueKey] === this.selectedData) {
              this.$set(item, 'selected', true)
              if (emit) this.checkEmit(item[this.valueKey], item[this.labelKey])
            } else {
              this.$set(item, 'selected', false)
            }
          }
          if (item.children && item.children.length) {
            if (this.expandAll && expandAll) this.$set(item, 'expand', true)
            this.checkData(item.children, emit, expandAll)
          }
        })
      },
      loadDataCallback(item, callback) {
        this.loadData(item, data => {
          return (() => {
            callback(data)
            this.updateFlagDic(this.data)
          })(data)
        })
      },
      selectChange(value) {
        let label = ''
        if (value && this.flatDic[value]) {
          label = this.flatDic[value][this.labelKey]
        }
        this.$emit('on-selected', value)
        this.checkEmit(value, label)
      },
      handleCheckSelect(selectArray) {
        this.$emit('on-check', selectArray)
        this.parent.$emit('on-change', selectArray)
      },
      handleSelect(select) {
        let value = ''
        if (Array.isArray(select) && select.length === 1) {
          value = select[0][this.valueKey]
        }
        this.$emit('on-selected', value)
        this.parent.$emit('on-change', value)
      }
    },
    mounted() {
      this.checkData(this.data, false, true)
      this.$nextTick(() => {
        if (this.multiple) {
          this.$emit('on-check', this.checkedArray)
        } else {
          this.selectChange(this.selectedData)
        }
      })
    }
  }
</script>
