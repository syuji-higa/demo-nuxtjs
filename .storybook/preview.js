import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
// import { addParameters } from '@storybook/vue'
import '@storybook/addon-console'
// import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import 'sanitize.css'
import '~/assets/css/global.scss'
import '~/assets/css/utils/show.scss'
import Bowser from 'bowser'

Vue.use(VueCompositionApi)

// addParameters({
//   viewport: {
//     viewports: INITIAL_VIEWPORTS
//   }
// })

// add dcument class
const bowser = Bowser.getParser(window.navigator.userAgent)
const { platform } = bowser.parsedResult
const className = `is-${platform.type}`
document.documentElement.classList.add(className)
