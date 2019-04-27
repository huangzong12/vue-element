export default {
  name: 'HfCheckbox',
  functional: true,
  render(h, self) {
    return h('Checkbox', self.data, self.children)
  }
}
