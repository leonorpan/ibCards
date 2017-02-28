
require('./scss/bootstrap.scss')
require('./scss/main.scss')

import Vue from 'vue'
import App from 'components/App.vue'
import Card from 'components/Card.vue'
import Swipe from 'directives/swipe.directive'

new Vue({
    el: '#app',
    components: { App }
})