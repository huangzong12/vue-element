//iview Modal带遮罩层拖动
import {on, off, setStyle, addClass} from '@/utils/dom'

export default {
  name: 'dragmodal',
  bind: (el) => {
    let first = {};
    let state = true;
    let init = true;
    let mask = el.querySelector('.ivu-modal-mask');
    let animationEndEvent = 'animationend';
    if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
      animationEndEvent = 'webkitAnimationEnd';
    }
    let modal = el.querySelector('.ivu-modal');
    let triggerDom = el.querySelector('.ivu-modal-header');
    triggerDom.style.cursor = 'move';
    let bodyDom = el.querySelector('.ivu-modal-content');
    bodyDom.style.width = modal.style.width;
    addClass(bodyDom, 'ivu-modal-content-drag');
    const dragData = {
      x: null,
      y: null,
      dragX: null,
      dragY: null,
      dragging: false
    };
    const handleMousedown = (event) => {
      const rect = bodyDom.getBoundingClientRect();
      if (state) {
        first = {x: rect.x || rect.left, y: rect.y || rect.top};
        state = false;
      }
      dragData.x = rect.x || rect.left;
      dragData.y = rect.y || rect.top;
      const distance = {
        x: event.clientX,
        y: event.clientY
      };
      dragData.dragX = distance.x;
      dragData.dragY = distance.y;
      dragData.dragging = true;
      on(window, 'mousemove', handleMousemove);
      on(window, 'mouseup', handleMouseup);
    };
    const handleMousemove = (event) => {
      if (!dragData.dragging) return false;
      const distance = {
        x: event.clientX,
        y: event.clientY
      };
      const diff_distance = {
        x: distance.x - dragData.dragX,
        y: distance.y - dragData.dragY
      };
      dragData.x += diff_distance.x;
      dragData.y += diff_distance.y;
      dragData.dragX = distance.x;
      dragData.dragY = distance.y;
      let style = {};
      if (dragData.x !== null) style.left = `${dragData.x}px`;
      if (dragData.y !== null) style.top = `${dragData.y}px`;
      if (init) {
        modal.style.top = '0px';
        modal.style.width = 'auto';
        init = false
      }
      setStyle(bodyDom, style)
    };
    const handleMouseup = () => {
      dragData.dragging = false;
      off(window, 'mousemove', handleMousemove);
      off(window, 'mouseup', handleMouseup);
    };
    on(triggerDom, 'mousedown', handleMousedown);
    on(mask, animationEndEvent, function () {
      if (first.x !== null && first.y !== null) {
        let style = {};
        style.left = `${first.x}px`;
        style.top = `${first.y}px`;
        setStyle(bodyDom, style)
      }
    });

    // let mask = el.querySelector('.ivu-modal-mask');
    // let animationEndEvent = 'animationend';
    // if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    //   animationEndEvent = 'webkitAnimationEnd';
    // }
    // let triggerDom = el.querySelector('.ivu-modal-header');
    // triggerDom.style.cursor = 'move';
    // let bodyDom = el.querySelector('.ivu-modal-content');
    // let pageX = 0;
    // let pageY = 0;
    // let transformX = 0;
    // let transformY = 0;
    // let canMove = false;
    // const handleMousedown = e => {
    //   let transform = /\(.*\)/.exec(bodyDom.style.transform);
    //   if (transform) {
    //     transform = transform[0].slice(1, transform[0].length - 1);
    //     let splitxy = transform.split('px, ');
    //     transformX = parseFloat(splitxy[0]);
    //     transformY = parseFloat(splitxy[1].split('px')[0])
    //   }
    //   pageX = e.pageX;
    //   pageY = e.pageY;
    //   canMove = true
    // };
    // const handleMousemove = e => {
    //   let xOffset = e.pageX - pageX + transformX;
    //   let yOffset = e.pageY - pageY + transformY;
    //   if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
    // };
    // const handleMouseup = () => {
    //   canMove = false
    // };
    // on(mask, animationEndEvent, function () {
    //   if (bodyDom.style.transform) bodyDom.style.transform = '';
    // });
    // on(triggerDom, 'mousedown', handleMousedown);
    // on(document, 'mousemove', handleMousemove);
    // on(document, 'mouseup', handleMouseup)
  }
}
