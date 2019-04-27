let router = [];
router.push(
  {
    path: "log1",
    name: "log1",
    component: () => import('./log.vue'),
    meta: {
      title: "操作日志",
      keepAlive: true,
      moduleName: "ocs",
      permissionName: "consumptionAnalysis"
    }
  },
  {
    path: "log2",
    name: "log2",
    component: () => import('./log2.vue'),
    meta: {
      title: "数据字典",
      keepAlive: true,
      moduleName: "ocs",
      permissionName: "consumptionAnalysis"
    }
  }
);

export {router};
