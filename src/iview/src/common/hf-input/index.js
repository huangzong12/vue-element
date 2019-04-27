export default {
  name: 'HfInput',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Input', self.data, self.children)
  }
}
