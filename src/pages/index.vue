<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        nuxt-demo
      </h1>
      <h2 class="subtitle">
        Nuxt Demo
      </h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
      <ul>
        <li>Origin: {{ origin }}</li>
        <li>URL: {{ url }}</li>
      </ul>
      <Child value="A" />
      <ul>
        <li>
          <nuxt-link to="/input/">to Input</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useMeta } from 'nuxt-composition-api'
import { META } from '~/data/const'
import Logo from '~/components/Logo.vue'
import Child from '~/components/Child.vue'
import { fetchApi } from '~/utils/fetchHandler'

// asyncSiteData

type SiteDataState = {
  args: Record<string, any>
  headers: Record<string, any>
  origin: string
  url: string
}

type FetchSiteDataParams = {
  timestamp: number
  arr: string[]
}

const asyncSiteData = async (
  error: Function
): Promise<SiteDataState | null> => {
  const params: FetchSiteDataParams = {
    timestamp: Date.now(),
    arr: ['a', 'b', 'c']
  }

  const { data, err } = await fetchApi('get', { params })

  if (err || !data) {
    error({
      statusCode: err?.status,
      message: err?.error?.message
    })
    return null
  }

  return {
    args: data.args,
    headers: data.headers,
    origin: data.origin,
    url: data.url
  }
}

// Create Component

export default defineComponent({
  head: {},
  components: {
    Logo,
    Child
  },
  async asyncData(context: any) {
    const siteDataState = await asyncSiteData(context.error)
    return { ...siteDataState }
  },
  setup() {
    useMeta({
      title: META.SITE_NAME,
      titleTemplate: ''
    })
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
