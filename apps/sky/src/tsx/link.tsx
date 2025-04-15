// Links表的标签渲染
export const renderApp = (appMap: Item) => ({
  app: ({ row }) => appMap[row.app]?.name ?? row.app,
})
