/**
 * 拖拽指令 v-draggable="options"
 * options = {
 *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
 *  body:    /这里传入需要移动容器的CSS选择器/,
 *  recover: /拖动结束之后是否恢复到原来的位置/
 * }
 */

import {on} from '@/utils/dom'

export default {
  name: 'draggable',
  bind: (el, binding) => {
    let triggerDom = document.querySelector(binding.value.trigger);
    triggerDom.style.cursor = 'move';
    let bodyDom = document.querySelector(binding.value.body);
    let pageX = 0;
    let pageY = 0;
    let transformX = 0;
    let transformY = 0;
    let canMove = false;
    const handleMousedown = e => {
      let transform = /\(.*\)/.exec(bodyDom.style.transform);
      if (transform) {
        transform = transform[0].slice(1, transform[0].length - 1);
        let splitxy = transform.split('px, ');
        transformX = parseFloat(splitxy[0]);
        transformY = parseFloat(splitxy[1].split('px')[0])
      }
      pageX = e.pageX;
      pageY = e.pageY;
      canMove = true
    };
    const handleMousemove = e => {
      let xOffset = e.pageX - pageX + transformX;
      let yOffset = e.pageY - pageY + transformY;
      if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    };
    const handleMouseup = () => {
      canMove = false
    };
    on(triggerDom, 'mousedown', handleMousedown);
    on(document, 'mousemove', handleMousemove);
    on(document, 'mouseup', handleMouseup)
  },
  update: (el, binding) => {
    if (!binding.value.recover) return;
    let bodyDom = document.querySelector(binding.value.body);
    bodyDom.style.transform = ''
  }
}
