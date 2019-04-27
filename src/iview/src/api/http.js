import Axios from "axios"
import {Message} from "iview"

let domain = JSON.parse(process.env.VUE_APP_DOMAIN);
let subPath = JSON.parse(process.env.VUE_APP_SUB_PATH);
domain = {
  mvc: `${domain.mvc}${subPath.mvc}`
};
const axiosConfig = {
  headers: {
    post: {
      "Content-Type": "application/json" //application/json;charset=UTF-8
    },
    get: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  },
  timeout: 10000
};
Object.assign(Axios.defaults, axiosConfig);
//拦截权限模块请求，携带token
Axios.interceptors.request.use(
  config => {
    // 所有的地方都带token
    config.headers.token = window.sessionStorage.getItem("token");
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
Axios.interceptors.response.use(
  config => {
    if (config.data && config.data.code === "V10004") {
      sessionStorage.clear();
      location.href = "#/login";
      showMessage('当前登录状态已失效，请重新登录！');
      return Promise.reject(config);
    }
    return config;
  },
  error => {
    if (error.status === 200) {
      return error;
    } else if (error.response && error.response.status === 403) {
      showMessage("你没有该功能权限，请先开通！");
      return error;
    }
    showMessage("请求超时, 请稍后再试！");
    return Promise.reject(error);
  }
);
let inspectToken = res => {
  if (res && res.status >= 200 && res.status < 400) {
    if (res.config && res.config.responseType === "arraybuffer") {
      //导出表格的直接返回所有数据，不过滤
      download(res);
      return res;
    }
    return res && res.data;
  }
  return Promise.reject({
    data: {
      err: true,
      message: res ? res.statusText : "请求超时！",
      data: res ? res.data : ""
    }
  });
};

function showMessage(msg) {
  Message.error({
    content: msg,
    closable: true
  });
}

// 下载文件
function download(res) {
  if (!res) {
    return;
  }
  let filename = "后台没有返回名字";
  if (res.headers["content-disposition"]) {
    filename = decodeURI(res.headers["content-disposition"]).split("=")[1];
  }
  let blob = new Blob([res.data], {
    type: "application/vnd.ms-excel"
  }); //blob 一定要加入type,不然导出的表格会是乱码，恶心的object object
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.style.display = "none";
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default {
  domain,
  get(url, params, headers) {
    let commonParam = {};
    let queryConfig = {
      method: "get",
      url: `${url}`,
      params: Object.assign({}, commonParam, params || {})
    };
    if (headers) {
      queryConfig["headers"] = {
        ...headers
      };
    }
    return Axios(queryConfig).then(inspectToken);
  },
  post(url, params, headers) {
    let queryConfig = {
      method: "post",
      url: `${url}`
    };
    if (params) {
      queryConfig["data"] = JSON.stringify(params);
    }
    if (headers) {
      if (headers.timeout) {
        queryConfig.timeout = headers.timeout;
        delete headers.timeout;
      }
      queryConfig["headers"] = {...headers};
    }
    return Axios(queryConfig).then(inspectToken);
  },
  export(url, params, headers) {
    let queryConfig = {
      method: "post",
      url: `${url}`
    };
    if (params) {
      queryConfig["data"] = JSON.stringify(params);
    }
    if (headers) {
      queryConfig["headers"] = {
        ...headers
      };
    }
    queryConfig["responseType"] = "arraybuffer";
    return Axios(queryConfig).then(inspectToken);
  }
};
