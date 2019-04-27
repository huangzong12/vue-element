export default {
  name: 'HfDrawer',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Drawer', self.data, self.children)
  }
}
