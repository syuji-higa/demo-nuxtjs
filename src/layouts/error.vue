<template>
  <div class="wrapper">
    <p>{{ statusCode }}: {{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { addMediaClass } from '~/utils/media-class'

addMediaClass()

type Error = {
  statusCode: number
  message: string
}

export default defineComponent({
  props: {
    error: {
      type: Object as PropType<Error>,
      default: null
    }
  },
  setup(props) {
    return {
      statusCode: props.error.statusCode,
      message: props.error.message || 'Unknown Error'
    }
  }
})
</script>

<style lang="scss"></style>
