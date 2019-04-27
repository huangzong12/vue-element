export default {
  name: 'HfCol',
  functional: true,
  render(h, self) {
    return h('Col', self.data, self.children)
  }
}
