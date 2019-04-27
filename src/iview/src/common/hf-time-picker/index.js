export default {
  name: 'HfTimePicker',
  functional: true,
  render(h, self) {
    return h('TimePicker', self.data, self.children)
  }
}
