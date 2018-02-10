import Vue from 'vue'
import { Spinner, Loadmore, Lazyload, InfiniteScroll } from 'mint-ui'

Vue.use(Lazyload)
Vue.use(InfiniteScroll)

Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
