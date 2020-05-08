import * as Bowser from 'bowser'

const bowser = Bowser.parse(window.navigator.userAgent)

export const { browser, engine, os, platform } = bowser
