export default {
  name: 'HfSelect',
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
    data: Array
  },
  render(h, self) {
    if (Array.isArray(self.props.data)) {
      return h('Select', self.data, self.props.data.map((item, index) => {
        return h('Option', {
          key: index,
          attrs: {
            disabled: item.disabled,
            label: item[self.props.labelKey],
            value: item[self.props.valueKey]
          }
        })
      }))
    } else {
      return self.parent.$createElement('Select', self.data, self.children)
    }
  }
}
