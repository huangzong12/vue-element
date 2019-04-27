export default {
  name: 'HfRow',
  functional: true,
  render(h, self) {
    return h('Row', self.data, self.children)
  }
}
