export default {
  name: 'HfTabs',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Tabs', self.data, self.children)
  }
}
