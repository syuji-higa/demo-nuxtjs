<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'nuxt-composition-api'

// Create Component

export default defineComponent({
  props: {
    value: {
      type: String as PropType<'A' | 'B' | 'C'>,
      required: true
    }
  },
  setup(props) {
    const message = computed(() => {
      return `This is ${props.value}.`
    })

    return {
      message
    }
  }
})
</script>
