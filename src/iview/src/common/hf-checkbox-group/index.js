export default {
  name: 'HfCheckboxGroup',
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
      return h('CheckboxGroup', self.data, self.props.data.map((item, index) => {
        return h('Checkbox', {
          key: index,
          attrs: {
            disabled: item.disabled,
            label: item[self.props.valueKey]
          }
        }, item[self.props.labelKey])
      }))
    } else {
      return h('CheckboxGroup', self.data, self.children)
    }
  }
}
