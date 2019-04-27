import {forEach, hasOneOf, objEqual} from '@/utils/tools'

export const setToken = (token) => {
  window.sessionStorage.setItem('token', token)
};

export const getToken = () => {
  const token = window.sessionStorage.getItem('token');
  return token || false
};

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
};

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true;
    else return false
  } else return true
};

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      };
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href;
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  });
  return res
};

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (route, homeRoute) => {
  let homeItem = {...homeRoute, icon: homeRoute.meta.icon};
  let routeMetched = route.matched;
  if (routeMetched.some(item => item.name === homeRoute.name)) return [homeItem];
  let res = routeMetched.filter(item => {
    return item.meta === undefined || !item.meta.hideInBread
  }).map(item => {
    let meta = {...item.meta}
    return {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: meta
    }
  });
  res = res.filter(item => {
    return !item.meta.hideInMenu
  });
  return [{...homeItem, to: homeRoute.path}, ...res]
};

export const showTitle = (item) => {
  let {title} = item.meta;
  if (!title) return;
  title = (item.meta && item.meta.title) || item.name;
  return title
};

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  window.sessionStorage.setItem('tagNaveList', JSON.stringify(list))
};

/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = window.sessionStorage.getItem('tagNaveList');
  return list ? JSON.parse(list) : []
};

/**
 * @param {Array} routers 路由列表数组
 * @param homeName
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = (routers, homeName = 'home') => {
  let i = -1;
  let len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children, homeName);
      if (res.name) return res
    } else {
      if (item.name === homeName) homeRoute = item
    }
  }
  return homeRoute
};

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  const {name, path, meta} = newRoute;
  let newList = [...list];
  if (newList.findIndex(item => item.name === name) >= 0) return newList;
  else newList.push({name, path, meta});
  return newList
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access);
  else return true
};

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const routePermissionJudge = (list) => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  };
  return routePermissionJudge(routes)
};

/**
 * @param {Array} list 标签列表
 * @param route
 */
export const getNextRoute = (list, route) => {
  let res = {};
  if (list.length === 2) {
    res = getHomeRoute(list)
  } else {
    const index = list.findIndex(item => routeEqual(item, route));
    if (index === list.length - 1) res = list[list.length - 2];
    else res = list[index + 1]
  }
  return res
}

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  while (++i < times) {
    callback(i)
  }
};

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
};

export const findNodeUpperByClasses = (ele, classes) => {
  let parentNode = ele.parentNode;
  if (parentNode) {
    let classList = parentNode.classList;
    if (classList && classes.every(className => classList.contains(className))) {
      return parentNode
    } else {
      return findNodeUpperByClasses(parentNode, classes)
    }
  }
};

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {};
  const params2 = route2.params || {};
  const query1 = route1.query || {};
  const query2 = route2.query || {};
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
};

/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 */
export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length;
  let res = false;
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  });
  return res
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&');
  let paramObj = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split('=');
    paramObj[keyValue[0]] = keyValue[1]
  });
  return paramObj
};

// scrollTop animation
export const scrollTop = (el, from = 0, to, duration = 500, endCallback) => {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil(difference / duration * 50);
  const scroll = (start, end, step) => {
    if (start === end) {
      endCallback && endCallback();
      return
    }
    let d = (start + step > end) ? end : start + step;
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }
    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  };
  scroll(from, to, step)
};

/**
 * @description 下载文件的方法
 * @param data  数据或链接
 * @param strFileName 文件名称
 * @param strMimeType 文件类型
 */
export function download(data, strFileName, strMimeType) {
  var self = window, // this script is only for browsers anyway...
    defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
    mimeType = strMimeType || defaultMime,
    payload = data,
    url = !strFileName && !strMimeType && payload,
    anchor = document.createElement("a"),
    toString = function (a) {
      return String(a);
    },
    myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
    fileName = strFileName || "download",
    blob,
    reader;
  myBlob = myBlob.call ? myBlob.bind(self) : Blob;

  if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
    payload = [payload, mimeType];
    mimeType = payload[0];
    payload = payload[1];
  }

  if (url && url.length < 2048) { // if no filename and no mime, assume a url was passed as the only argument
    fileName = url.split("/").pop().split("?")[0];
    anchor.href = url; // assign href prop to temp anchor
    if (anchor.href.indexOf(url) !== -1) { // if the browser determines that it's a potentially valid url path:
      var ajax = new XMLHttpRequest();
      ajax.open("GET", url, true);
      ajax.responseType = 'blob';
      ajax.onload = function (e) {
        download(e.target.response, fileName, defaultMime);
      };
      setTimeout(function () {
        ajax.send();
      }, 0); // allows setting custom ajax headers using the return:
      return ajax;
    } // end if valid url?
  } // end if url?

  //go ahead and download dataURLs right away
  if (/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)) {

    if (payload.length > (1024 * 1024 * 1.999) && myBlob !== toString) {
      payload = dataUrlToBlob(payload);
      mimeType = payload.type || defaultMime;
    } else {
      return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
        navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
        saver(payload); // everyone else can save dataURLs un-processed
    }

  } else {//not data url, is it a string with special needs?
    if (/([\x80-\xff])/.test(payload)) {
      var i = 0, tempUiArr = new Uint8Array(payload.length), mx = tempUiArr.length;
      for (i; i < mx; ++i) tempUiArr[i] = payload.charCodeAt(i);
      payload = new myBlob([tempUiArr], {type: mimeType});
    }
  }
  blob = payload instanceof myBlob ? payload : new myBlob([payload], {type: mimeType});

  function dataUrlToBlob(strUrl) {
    var parts = strUrl.split(/[:;,]/),
      type = parts[1],
      indexDecoder = strUrl.indexOf("charset") > 0 ? 3 : 2,
      decoder = parts[indexDecoder] === "base64" ? atob : decodeURIComponent,
      binData = decoder(parts.pop()),
      mx = binData.length,
      i = 0,
      uiArr = new Uint8Array(mx);
    for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
    return new myBlob([uiArr], {type: type});
  }

  function saver(url, winMode) {
    if ('download' in anchor) { //html5 A[download]
      anchor.href = url;
      anchor.setAttribute("download", fileName);
      anchor.className = "download-js-link";
      anchor.innerHTML = "downloading...";
      anchor.style.display = "none";
      anchor.addEventListener('click', function (e) {
        e.stopPropagation();
      });
      document.body.appendChild(anchor);
      setTimeout(function () {
        anchor.click();
        document.body.removeChild(anchor);
        if (winMode === true) {
          setTimeout(function () {
            self.URL.revokeObjectURL(anchor.href);
          }, 250);
        }
      }, 66);
      return true;
    }

    // handle non-a[download] safari as best we can:
    if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
      // eslint-disable-next-line no-useless-escape
      if (/^data:/.test(url)) url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
      if (!window.open(url)) { // popup blocked, offer direct download:
        if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
          location.href = url;
        }
      }
      return true;
    }
    //do iframe dataURL download (old ch+FF):
    var f = document.createElement("iframe");
    document.body.appendChild(f);

    if (!winMode && /^data:/.test(url)) { // force a mime that will download:
      // eslint-disable-next-line no-useless-escape
      url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
    }
    f.src = url;
    setTimeout(function () {
      document.body.removeChild(f);
    }, 333);
  }

  if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
    return navigator.msSaveBlob(blob, fileName);
  }

  if (self.URL) { // simple fast and modern way using Blob and URL:
    saver(self.URL.createObjectURL(blob), true);
  } else {
    // handle non-Blob()+non-URL browsers:
    if (typeof blob === "string" || blob.constructor === toString) {
      try {
        return saver("data:" + mimeType + ";base64," + self.btoa(blob));
      } catch (y) {
        return saver("data:" + mimeType + "," + encodeURIComponent(blob));
      }
    }
    // Blob but not URL support:
    reader = new FileReader();
    reader.onload = function () {
      saver(this.result);
    };
    reader.readAsDataURL(blob);
  }
  return true;
}
