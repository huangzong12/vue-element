export default {
  name: 'HfDropdownMenu',
  functional: true,
  render(h, self) {
    return h('DropdownMenu', self.data, self.children)
  }
}
