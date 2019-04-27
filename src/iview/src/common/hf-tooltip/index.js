export default {
  name: 'HfTooltip',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Tooltip', self.data, self.children)
  }
}
