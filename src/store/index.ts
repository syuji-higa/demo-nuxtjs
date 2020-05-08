import { reactive } from 'nuxt-composition-api'
import { ActionTree, MutationTree } from 'vuex'
import { RootState } from '~/store/types'
import { fetchApi } from '~/utils/fetchHandler'

type State = {
  sample: string
}

export const state = () => {
  return reactive<State>({
    sample: ''
  })
}

export const mutations: MutationTree<State> = {
  setSample(state: State, payload: string) {
    state.sample = payload
  }
}

export const actions: ActionTree<State, RootState> = {
  async fetchSample({ commit }) {
    const { data, err } = await fetchApi('sample/', { method: 'post' })

    if (err || !data) {
      return
    }

    commit('setSample', data.sample)
  }
}
