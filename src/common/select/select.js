export default {
  name: 'QhSelect',
  functional: true,
  props: {
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  render(h, ctx) {
    return h('el-select', ctx.data, ctx.props.options.map((item, index) => {
      return h('el-option', {
        key: index,
        attrs: {
          disabled: item.disabled,
          label: item[ctx.props.labelKey],
          value: item[ctx.props.valueKey]
        }
      })
    }))
  }
}
