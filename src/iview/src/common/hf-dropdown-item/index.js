export default {
  name: 'HfDropdownItem',
  functional: true,
  render(h, self) {
    return h('DropdownItem', self.data, self.children)
  }
}
