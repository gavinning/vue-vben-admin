import { defineComponent, ref } from 'vue'

export const useDemo = () => {
  const text = ref('hello world')

  const changeText = () => {
    text.value = `hello vue3 ${Math.random()}`
  }

  const Demo = defineComponent({
    props: ['prefix'],
    setup(props) {
      return () => (
        <div>
          {props.prefix}-{text.value}
        </div>
      )
    },
  })

  return {
    changeText,
    Demo,
  }
}
