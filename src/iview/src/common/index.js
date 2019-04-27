import {version} from 'iview'
import config from '@/config'
//全局指令
import directives from '@/directive'

//全局组件
// import HfCharts from './hf-charts'
import HfAlert from './hf-alert'
import HfAutoComplete from './hf-auto-complete'
import HfAvatar from './hf-avatar'
import HfBadge from './hf-badge'
import HfButton from './hf-button'
import HfCard from './hf-card'
import HfCascader from './hf-cascader'
import HfCheckbox from './hf-checkbox'
import HfCheckboxGroup from './hf-checkbox-group'
import HfCol from './hf-col'
import HfCollapse from './hf-collapse'
import HfDatePicker from './hf-date-picker'
import HfDrawer from './hf-drawer'
import HfDropdown from './hf-dropdown'
import HfDropdownItem from './hf-dropdown-item'
import HfDropdownMenu from './hf-dropdown-menu'
import HfForm from './hf-form'
import HfFormItem from './hf-form-item'
import HfIcon from './hf-icon'
import HfInput from './hf-input'
import HfInputNumber from './hf-input-number'
import HfModal from './hf-modal'
import HfOption from './hf-option'
import HfOptionGroup from './hf-option-group'
import HfPage from './hf-page'
import HfPanel from './hf-panel'
import HfPoptip from './hf-Poptip'
import HfRadio from './hf-radio'
import HfRadioGroup from './hf-radio-group'
import HfRow from './hf-row'
import HfSelect from './hf-select'
import HfStep from './hf-step'
import HfSteps from './hf-steps'
import HfSwitch from './hf-switch'
import HfTabPane from './hf-tab-pane'
import HfTable from './hf-table'
import HfTabs from './hf-tabs'
import HfTag from './hf-tag'
import HfTimePicker from './hf-time-picker'
import HfTooltip from './hf-tooltip'
import HfTree from './hf-tree'
import HfTreeSelect from './hf-tree-select'
import HfUpload from './hf-upload'

const components = [
  HfAlert,
  HfAutoComplete,
  HfAvatar,
  HfBadge,
  HfButton,
  HfCard,
  HfCascader,
  HfCheckbox,
  HfCheckboxGroup,
  HfCol,
  HfCollapse,
  HfDatePicker,
  HfDrawer,
  HfDropdown,
  HfDropdownItem,
  HfDropdownMenu,
  HfForm,
  HfFormItem,
  HfIcon,
  HfInput,
  HfInputNumber,
  HfModal,
  HfOption,
  HfOptionGroup,
  HfPage,
  HfPanel,
  HfPoptip,
  HfRadio,
  HfRadioGroup,
  HfRow,
  HfSelect,
  HfStep,
  HfSteps,
  HfSwitch,
  HfTabPane,
  HfTable,
  HfTabs,
  HfTag,
  HfTimePicker,
  HfTooltip,
  HfTree,
  HfTreeSelect,
  HfUpload
]

const setPrototype = (Vue) => {
  Vue.prototype.$config = config
  Vue.prototype.$bus = new Vue()
}

const setDirective = (Vue) => {
  directives.forEach(directive => Vue.directive(directive.name, directive))
}

const install = function (Vue) {
  window.$version = {vue: Vue.version, iview: version}
  components.forEach(com => Vue.component(com.name, com))
  setPrototype(Vue)
  setDirective(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
