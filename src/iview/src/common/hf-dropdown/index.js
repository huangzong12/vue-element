export default {
  name: 'HfDropdown',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Dropdown', self.data, self.children)
  }
}
