<template>
  <div>
    <ValidationObserver v-slot="{ invalid }" tag="div">
      <div>
        <ValidationProvider
          v-slot="{ errors }"
          name="サンプル1"
          rules="required|max:8"
        >
          <input v-model="val1" type="text" placeholder="sample1" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <p>{{ val1 }}</p>
      </div>
      <div>
        <ValidationProvider
          v-slot="{ errors }"
          name="サンプル2"
          rules="required|max:4"
        >
          <input v-model="val2" type="text" placeholder="sample2" />
          <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <p>{{ val2 }}</p>
      </div>
      <div>
        <button type="button" :disabled="invalid" @click="submit">
          <template>Submit</template>
        </button>
      </div>
    </ValidationObserver>
    <ul>
      <li>
        <nuxt-link to="/">to Top</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import equal from 'fast-deep-equal'
import {
  defineComponent,
  useMeta,
  reactive,
  computed,
  toRefs
} from 'nuxt-composition-api'
import { META } from '~/data/const'

// useInput

type InputState = {
  val1: string
  val2: string
}

type UseInput = {
  inputState: InputState
  inputStateOrg: InputState
  updateValOrg: Function
}

const useInput = (): UseInput => {
  const state: InputState = reactive({
    val1: '',
    val2: ''
  })

  const stateOrg: InputState = reactive({ ...state })

  const updateValOrg = (): void => {
    for (const key of Object.keys(stateOrg) as (keyof InputState)[]) {
      stateOrg[key] = state[key]
    }
  }

  return {
    inputState: state,
    inputStateOrg: stateOrg,
    updateValOrg
  }
}

// useSubmit

type UseSubmit = {
  submit: Function
}

const useSubmit = (): UseSubmit => {
  const submit = (state: InputState): void => {
    alert(JSON.stringify(state))
  }

  return {
    submit
  }
}

// Create Component

export default defineComponent({
  head: {},
  beforeRouteLeave(_to: any, from: any, next: Function) {
    const result = from.matched[0].instances.default.isInputChanging
      ? window.confirm('Are you sure you want to change the page?')
      : true
    next(result)
  },
  setup() {
    useMeta({ title: `Input - ${META.SITE_NAME}` })

    const { inputState, inputStateOrg, updateValOrg } = useInput()
    const { submit } = useSubmit()

    updateValOrg()

    const isInputChanging = computed(() => {
      return !equal(inputStateOrg, inputState)
    })

    return {
      isInputChanging,
      ...toRefs(inputState),
      submit: () => submit(inputState)
    }
  }
})
</script>
