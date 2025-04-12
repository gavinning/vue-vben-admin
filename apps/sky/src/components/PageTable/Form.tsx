// https://doc.vben.pro/components/common-ui/vben-form.html
import { useVbenForm, VbenFormProps } from '#/adapter/form'

export interface FormProps {
  values: Item
  schema: VbenFormProps
  handleSubmit?: VbenFormProps['handleSubmit']
  handleReset?: VbenFormProps['handleReset']
  handleValuesChange?: VbenFormProps['handleValuesChange']
}

// 可根据外部需要，开放更多的字段到props
export const Form = defineComponent<FormProps>({
  props: [
    'schema',
    'values',
    'handleSubmit',
    'handleReset',
    'handleValuesChange',
  ],
  setup(props) {
    const [Form, FormApi] = useVbenForm(props.schema)

    watch(props.values, (val) => {
      FormApi.setValues(val)
    })

    FormApi.setValues(props.values)

    return () => (
      <Form
        handleReset={props.handleReset}
        handleSubmit={props.handleSubmit}
        handleValuesChange={props.handleValuesChange}
      />
    )
  },
})
