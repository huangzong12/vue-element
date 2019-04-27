export default {
  name: 'HfAutoComplete',
  functional: true,
  render(h, self) {
    return h('AutoComplete', self.data, self.children)
  }
}
