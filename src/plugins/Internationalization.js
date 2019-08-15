import _ from 'lodash'

let locales = {
  fr: require('./../json/locale-fr'),
  en: require('./../json/locale-en')
}

export default {
  install(Vue) {
    Vue.$_dsLocale = (value) => {
      return (locales[_.get(window, `dsLang`, 'fr')] || locales['fr'])[value]
    }

    Vue.filter('dsTranslate', (value) => Vue.$_dsLocale(value) || value)

    Vue.mixin({
      methods: {
        dsTranslate: Vue.$_dsLocale,
        dsTranslateComplex: (strings, args, startArgs) => {
          let result = ''
          let argsIndex = 0

          if (startArgs) {
            result += args[argsIndex]
            argsIndex++
          }

          for (let i = 0; i < strings.length; i++) {
            result += Vue.$_dsLocale(strings[i])

            if (args[argsIndex]) {
              result += args[argsIndex]
              argsIndex++
            }
          }

          return result
        }
      }
    })
  }
}
