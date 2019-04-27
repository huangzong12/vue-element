export default {
  name: 'HfPanel',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Panel', self.data, self.children)
  }
}
