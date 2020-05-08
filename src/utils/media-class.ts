import { platform } from '~/utils/bowser'

export const addMediaClass = () => {
  const className = `is-${platform.type}`
  document.documentElement.classList.add(className)
}
