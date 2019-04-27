export default {
  name: 'HfSteps',
  functional: true,
  render(h, self) {
    return h('Steps', self.data, self.children)
  }
}
