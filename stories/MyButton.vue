<template>
  <button :style="buttonStyles" @click="onClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive } from '@vue/composition-api'

type Props = {}

export default defineComponent({
  setup(_props: Props, context: SetupContext) {
    const buttonStyles = reactive({
      border: '1px solid #eee',
      borderRadius: 3,
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
      fontSize: 15,
      padding: '3px 10px',
      margin: 10
    })

    const onClick = (): void => {
      context.emit('click')
    }

    return {
      buttonStyles,
      onClick
    }
  }
})
</script>
