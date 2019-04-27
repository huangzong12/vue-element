export default {
  name: 'HfAlert',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Alert', self.data, self.children)
  }
}
