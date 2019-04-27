export default {
  name: 'HfTag',
  functional: true,
  render(h, self) {
    return h('Tag', self.data, self.children)
  }
}
