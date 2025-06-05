// Page
export const Page = (_: any, { slots }: any) => {
  return <div class="page p-5">{slots.default?.()}</div>
}
