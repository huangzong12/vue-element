import Main from '@/view/layout'

const getRoutes = (context) => {
  const children = []
  context.keys().forEach(key => {
    let module = context(key).default
    Object.keys(module).forEach(name => {
      children.push({
        path: `/${name}`,
        name: name,
        meta: {icon: 'logo-buffer', title: '系统管理'},
        component: Main,
        children: module[name]
      })
    })
  })
  return children
}

let childrenRoutes = getRoutes(require.context("@/", true, /^\.\/components\/((?!\/)[\s\S])+\/route\.js$/))

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/home')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      title: '外链',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  ...childrenRoutes
]
