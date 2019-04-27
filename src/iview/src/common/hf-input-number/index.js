export default {
  name: 'HfInputNumber',
  functional: true,
  render(h, self) {
    return h('InputNumber', self.data, self.children)
  }
}
