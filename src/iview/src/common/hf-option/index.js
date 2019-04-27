export default {
  name: 'HfOption',
  functional: true,
  render(h, self) {
    return h('Option', self.data, self.children)
  }
}
