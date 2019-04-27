import config from '@/config'

export default {
  name: 'HfPage',
  functional: true,
  render(h, self) {
    if (!self.props.hasOwnProperty('page-size-opts')) {
      self.props['page-size'] = config.pageSize
    }
    if (!self.props.hasOwnProperty('page-size-opts')) {
      self.props['page-size-opts'] = config.pageSizeOpts
    }
    if (!self.props.hasOwnProperty('show-elevator')) {
      self.props['show-elevator'] = true
    }
    if (!self.props.hasOwnProperty('show-sizer')) {
      self.props['show-sizer'] = true
    }
    self.data.attrs = {...self.data.attrs, ...self.props}
    return h('Page', self.data, self.children)
  }
}
