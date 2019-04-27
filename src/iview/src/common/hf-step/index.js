export default {
  name: 'HfStep',
  functional: true,
  render(h, self) {
    return h('Step', self.data, self.children)
  }
}
