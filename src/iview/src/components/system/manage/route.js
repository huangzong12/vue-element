let router = [];
router.push(
  {
    path: "manage1",
    name: "manage1",
    component: () => import('./log.vue'),
    meta: {
      title: "系统资源",
      keepAlive: true,
      moduleName: "ocs",
      permissionName: "consumptionAnalysis"
    }
  },
  {
    path: "manage2",
    name: "manage2",
    component: () => import('./log2.vue'),
    meta: {
      title: "系统集成",
      keepAlive: true,
      moduleName: "ocs",
      permissionName: "consumptionAnalysis"
    }
  }
);

export {router};
