export default {
  name: 'HfButton',
  functional: true,
  render(h, self) {
    return h('Button', self.data, self.children)
  }
}
