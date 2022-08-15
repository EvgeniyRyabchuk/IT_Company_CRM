import * as UserActionCreators from './user'
import * as TodoActionCreators from './todo'
import * as ChatActionCreators from './chat'


export default {
    ...TodoActionCreators, 
    ...UserActionCreators,
    ...ChatActionCreators

}