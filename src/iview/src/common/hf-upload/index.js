export default {
  name: 'HfUpload',
  functional: true,
  render(h, self) {
    return self.parent.$createElement('Upload', self.data, self.children)
  }
}
