export default {
  name: 'HfPoptip',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Poptip', self.data, self.children)
  }
}
