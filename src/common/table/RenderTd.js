export default {
  name: "RenderTd",
  functional: true,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: Object,
    scopedSlots: Object,
    slotKey: String
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    };
    if (ctx.props.column) params.column = ctx.props.column;
    if (ctx.props.slotKey && ctx.props.scopedSlots && ctx.props.scopedSlots[ctx.props.slotKey]) {
      return ctx.props.scopedSlots[ctx.props.slotKey](params)
    }
    return ctx.props.render(h, params)
  }
};
