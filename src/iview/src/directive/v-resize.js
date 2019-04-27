import {hasClass} from "@utils/dom";

//重写iview handleResize方法
function handleResize(dragIndex, dragWidth) {
  let tableWidth = this.$el.offsetWidth - 1;
  let columnsWidth = {};
  let sumMinWidth = 0;
  let hasWidthColumns = [];
  let noWidthColumns = [];
  let maxWidthColumns = [];
  let noMaxWidthColumns = [];
  this.cloneColumns.forEach((col, index) => {
    if (index === dragIndex) col.width = dragWidth; //改动处
    if (col.width) {
      hasWidthColumns.push(col);
    } else {
      noWidthColumns.push(col);
      if (col.minWidth) {
        sumMinWidth += col.minWidth;
      }
      if (col.maxWidth) {
        maxWidthColumns.push(col);
      } else {
        noMaxWidthColumns.push(col);
      }
    }
    col._width = null;
  });
  let unUsableWidth = hasWidthColumns.map(cell => cell.width).reduce((a, b) => a + b, 0);
  let usableWidth = tableWidth - unUsableWidth - sumMinWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0) - 1;
  let usableLength = noWidthColumns.length;
  let columnWidth = 0;
  if (usableWidth > 0 && usableLength > 0) {
    columnWidth = parseInt(usableWidth / usableLength);
  }
  for (let i = 0; i < this.cloneColumns.length; i++) {
    const column = this.cloneColumns[i];
    let width = columnWidth + (column.minWidth ? column.minWidth : 0);
    if (column.width) {
      width = column.width;
    } else {
      if (column._width) {
        width = column._width;
      } else {
        if (column.minWidth > width) {
          width = column.minWidth;
        } else if (column.maxWidth < width) {
          width = column.maxWidth;
        }
        if (usableWidth > 0) {
          usableWidth -= width - (column.minWidth ? column.minWidth : 0);
          usableLength--;
          if (usableLength > 0) {
            columnWidth = parseInt(usableWidth / usableLength);
          } else {
            columnWidth = 0;
          }
        } else {
          columnWidth = 0;
        }
      }
      column._width = width;
    }
    columnsWidth[column._index] = {
      width: width
    };
  }
  if (usableWidth > 0) {
    usableLength = noMaxWidthColumns.length;
    columnWidth = parseInt(usableWidth / usableLength);
    for (let i = 0; i < noMaxWidthColumns.length; i++) {
      const column = noMaxWidthColumns[i];
      let width = column._width + columnWidth;
      if (usableLength > 1) {
        usableLength--;
        usableWidth -= columnWidth;
        columnWidth = parseInt(usableWidth / usableLength);
      } else {
        columnWidth = 0;
      }
      column._width = width;
      columnsWidth[column._index] = {
        width: width
      };
    }
  }
  this.tableWidth = this.cloneColumns.map(cell => cell._width).reduce((a, b) => a + b, 0) + (this.showVerticalScrollBar ? this.scrollBarWidth : 0) + 1;
  this.columnsWidth = columnsWidth;
  this.fixedHeader();
}

//iview表格列通过拖动改变宽度指令
export default {
  name: 'resize',
  bind: (el, binding, vnode) => {
    const self = {
      draggingColumn: null,
      dragging: false,
      dragState: {},
      border: hasClass(el.firstChild, 'ivu-table-border')
    };
    if (!self.border) return;
    const resizeProxy = document.createElement('div');
    resizeProxy.className = 'ivu-table-column-resize-proxy';
    resizeProxy.style.display = 'none';
    el.appendChild(resizeProxy);
    const head = el.querySelector('.ivu-table-header tr');
    const ths = el.querySelectorAll('.ivu-table-header th');
    head.onmousedown = function (event) {
      if (self.draggingColumn && self.border) {
        self.dragging = true;
        resizeProxy.style.display = 'block';
        const tableLeft = el.getBoundingClientRect().left;
        let target = event.target;
        while (target && target.tagName !== 'TH') {
          target = target.parentNode;
        }
        const columnRect = target.getBoundingClientRect();
        const minLeft = columnRect.left - tableLeft + 30;
        self.dragState = {
          startMouseLeft: event.clientX,
          startLeft: columnRect.right - tableLeft,
          startColumnLeft: columnRect.left - tableLeft,
          tableLeft
        };
        resizeProxy.style.left = self.dragState.startLeft + 'px';
        document.onselectstart = function () {
          return false;
        };
        document.ondragstart = function () {
          return false;
        };
        const handleMouseMove = (event) => {
          const deltaLeft = event.clientX - self.dragState.startMouseLeft;
          const proxyLeft = self.dragState.startLeft + deltaLeft;
          resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
        };
        const handleMouseUp = () => {
          if (self.dragging) {
            const {startColumnLeft} = self.dragState;
            const finalLeft = parseInt(resizeProxy.style.left, 10);
            const columnWidth = finalLeft - startColumnLeft;
            handleResize.call(vnode.child, self.draggingColumn.index, columnWidth);
            document.body.style.cursor = '';
            self.dragging = false;
            self.draggingColumn = null;
            self.dragState = {};
            resizeProxy.style.display = 'none';
          }
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
          document.onselectstart = null;
          document.ondragstart = null;
        };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };
    head.onmousemove = (event) => {
      let target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }
      if (!target.children.length) return;
      if (!self.dragging && self.border) {
        let rect = target.getBoundingClientRect();
        const bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          if (target.querySelector('ivu-table-sort')) {
            target.style.cursor = 'col-resize';
          }
          let index = Array.from(ths).indexOf(target);
          if (index > -1) {
            self.draggingColumn = {index}
          }
        } else if (!self.dragging) {
          bodyStyle.cursor = '';
          if (target.querySelector('ivu-table-sort')) {
            target.style.cursor = 'pointer';
          }
          self.draggingColumn = null;
        }
      }
    };
    head.onmouseout = () => {
      document.body.style.cursor = '';
    }
  }
}
