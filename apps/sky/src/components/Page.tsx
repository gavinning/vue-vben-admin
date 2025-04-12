// Page
export const Page = (_: any, { slots }: any) => {
  return <div class="page">{slots.default?.()}</div>
}
