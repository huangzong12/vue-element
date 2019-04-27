export default {
  name: 'HfDatePicker',
  functional: true,
  render(h, self) {
    return h('DatePicker', self.data, self.children)
  }
}
