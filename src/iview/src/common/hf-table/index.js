export default {
  name: 'HfTable',
  functional: true,
  render(h, self) {
    let directives = self.data.directives || [];
    self.data.directives = [...directives, {name: 'resize'}];
    return h('Table', self.data, self.children)
  }
}
