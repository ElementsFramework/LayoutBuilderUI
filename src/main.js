// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import UIElement from './components/UIElement'
Vue.component('ui-element', UIElement)
import UIElementThumbnail from './components/UIElementThumbnail'
Vue.component('ui-element-thumbnail', UIElementThumbnail)
import UIElementPicker from './components/UIElementPicker'
Vue.component('ui-element-picker', UIElementPicker)
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)
import VueFormGenerator from 'vue-form-generator'
Vue.component('vue-form-generator', VueFormGenerator.component)
import { SweetModal } from 'sweet-modal-vue'
Vue.component('sweet-modal', SweetModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
