export default {
  name: 'HfRadio',
  functional: true,
  render(h, self) {
    return h('Radio', self.data, self.children)
  }
}
