export default {
  name: 'HfBadge',
  functional: true,
  render(h, self) {
    return h('Badge', self.data, self.children)
  }
}
