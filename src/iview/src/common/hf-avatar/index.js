export default {
  name: 'HfAvatar',
  functional: true,
  render(h, self) {
    return h('Avatar', self.data, self.children)
  }
}
