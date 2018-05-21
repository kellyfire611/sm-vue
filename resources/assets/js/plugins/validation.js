import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { i18n } from './vue-i18n'
import vi from 'vee-validate/dist/locale/vi';

const { locale, translations } = window.config

Vue.use(VeeValidate, { delay: 250, locale: locale, dictionary: {
  vi
}})

Vue.mixin({
  $_veeValidate: {
    validator: 'new'
  },
  methods: {
    async formHasErrors () {
      const valid = await this.$validator.validateAll()
      if (valid) {
        this.$validator.pause()
      }
      return !valid
    }
  }
})
