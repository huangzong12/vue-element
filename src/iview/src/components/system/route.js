export const getRoutes = (context) => {
  const children = []
  context.keys().forEach(key => {
    let arr = context(key).router
    if (Array.isArray(arr) && arr.length) {
      children.push(...arr)
    }
  })
  return children
}

const system = getRoutes(require.context('./', true, /(?!\/)\w+\/route\.js$/))

export default {
  system
}

