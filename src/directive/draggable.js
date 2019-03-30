import {on, off} from '../utils/dom'

export default {
  name: 'draggable',
  bind: (el) => {
    let parentDom = el.querySelector('.el-select__tags');
    let childDom = el.querySelector('.el-select__tags>span');
    let pageX = 0;
    let transformX = 0;
    let canMove = false;
    let max = 0;
    const handleMousedown = e => {
      pageX = transformX = max = 0;
      let parentWidth = parentDom.offsetWidth;
      let childWidth = childDom.scrollWidth;
      if (parentWidth >= childWidth) return;
      document.body.style.cursor = 'move';
      parentDom.style.cursor = 'move';
      pageX = e.pageX;
      max = childWidth - parentWidth;
      let transform = /\(.*\)/.exec(childDom.style.transform);
      if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1);
        let splitxy = transform.split('px, ');
        transformX = parseFloat(splitxy[0]);
      }
      on(document, 'mousemove', handleMousemove);
      canMove = true
    };
    const handleMousemove = e => {
      let xOffset = e.pageX - pageX + transformX;
      if (xOffset <= 0 && Math.abs(xOffset) <= max && canMove) {
        childDom.style.transform = `translate(${xOffset}px, 0px)`;
      }
    };
    const handleMouseup = () => {
      canMove = false;
      off(document, 'mousemove', handleMousemove);
      document.body.style.cursor = '';
      parentDom.style.cursor = '';
    };
    on(parentDom, 'mousedown', handleMousedown);
    on(document, 'mouseup', handleMouseup);
  },
  update(el) {
    let childDom = el.querySelector('.el-select .el-select__tags>span');
    if (childDom) {
      childDom.style.transform = ''
    }
  }
}
