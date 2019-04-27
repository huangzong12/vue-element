export default {
  name: 'HfModal',
  functional: true,
  render(h, self) {
    self.props.width = self.props.width || 446
    if (!self.props.hasOwnProperty('mask-closable')) {
      self.props['mask-closable'] = false
    }
    self.data.attrs = {...self.data.attrs, ...self.props}
    return self.parent.$createElement('Modal', self.data, self.children)
    // return h('Modal', self.data, self.children && self.children.map(t => {
    //   // if (t.data && t.data.attrs) {
    //   //   t.data.attrs = {...t.data.attrs, ...(t.componentOptions && t.componentOptions.propsData)}
    //   // }
    //   // if (t.data && t.data.on === undefined) {
    //   //   t.data.on = t.data.on || (t.componentOptions && t.componentOptions.listeners)
    //   // }
    //   return h(
    //     (t.componentOptions && t.componentOptions.tag) || t.tag,
    //     t.data,
    //     t.children || (t.componentOptions && t.componentOptions.children)
    //   )
    // })
    // )
  }
}
