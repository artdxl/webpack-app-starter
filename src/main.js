import Vue from 'vue'
import React from 'react'
import App from './App.vue'
import ReactDOM from "react-dom";
import RApp from './RApp'

ReactDOM.render(<RApp />, document.querySelector('#react'))

import './style.less'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#vue')
