export default {
  name: 'QhButton',
  functional: true,
  render(h, ctx) {
    const obj = {
      'search': '查询',
      'delete': '删除',
      'save': '保存',
      'cancel': '取消'
    };
    let text = '';
    if (ctx.props && ctx.props.type) {
      text = obj[ctx.props.type] || ''
    }
    return h('el-button', ctx.data, ctx.children || text)
  }
}
