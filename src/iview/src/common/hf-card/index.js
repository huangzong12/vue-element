export default {
  name: 'HfCard',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Card', self.data, self.children)
  }
}
