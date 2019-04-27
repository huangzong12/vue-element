export default {
  name: 'HfForm',
  functional: true,
  render(h, self) {
    return h('Form', self.data, self.children)
  }
}
