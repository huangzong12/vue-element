export default {
  name: 'HfIcon',
  functional: true,
  render(h, self) {
    return h('Icon', self.data, self.children)
  }
}
