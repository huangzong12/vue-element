export default {
  name: 'HfCollapse',
  functional: true,
  render(h, self) {
    return h('Collapse', self.data, self.children)
  }
}
