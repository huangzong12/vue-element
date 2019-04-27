export default {
  name: 'HfFormItem',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('FormItem', self.data, self.children)
  }
}
