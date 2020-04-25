import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'

// base library
import Antd from 'ant-design-vue'
import VueCropper from 'vue-cropper'
// import 'ant-design-vue/dist/antd.less'
import '@/assets/css/antd.css'
// ext library
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '@/utils/helper/permission'
// import '@/components/use'


VueClipboard.config.autoSetContainer = true

Vue.use(Antd)

Vue.use(VueStorage, config.storageOptions)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)
