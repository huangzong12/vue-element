export default {
  name: 'HfSwitch',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('i-switch', self.data, self.children)
  }
}
