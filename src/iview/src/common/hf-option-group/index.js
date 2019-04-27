export default {
  name: 'HfOptionGroup',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('OptionGroup', self.data, self.children)
  }
}
