export default {
  name: 'HfTabPane',
  functional: true,
  render(h, self) {
    return h('TabPane', self.data, self.children)
  }
}
