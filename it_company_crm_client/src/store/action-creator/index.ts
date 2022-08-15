import * as UserActionCreators from './user'
import * as ChatActionCreators from './chat'
import * as KanbanActionCreators from './kanban'


export default {
    ...UserActionCreators,
    ...ChatActionCreators,
    ...KanbanActionCreators
}