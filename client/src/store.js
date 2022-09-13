import { legacy_createStore as createStore} from 'redux'
import reducers from './state/reducers/index'

const store = createStore(reducers)
export default store;