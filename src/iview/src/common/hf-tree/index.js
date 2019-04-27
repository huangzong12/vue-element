export default {
  name: 'HfTree',
  functional: true,
  render(h, self) {
    return h('Tree', self.data, self.children)
  }
}
