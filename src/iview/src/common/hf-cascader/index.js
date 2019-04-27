export default {
  name: 'HfCascader',
  functional: true,
  render(h, self) {
    return h('Cascader', self.data, self.children)
  }
}
