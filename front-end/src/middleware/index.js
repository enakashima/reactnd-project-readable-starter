import thunk from 'redux-thunk'
import logger from './logger'
import {middleware as flash} from 'redux-flash'
import { applyMiddleware } from 'redux'

export default applyMiddleware(thunk, flash({ timeout: 5000 }), logger)