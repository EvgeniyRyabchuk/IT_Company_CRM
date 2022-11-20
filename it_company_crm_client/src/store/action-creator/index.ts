import * as UserActionCreators from './user'
import * as ChatActionCreators from './chat'
import * as KanbanActionCreators from './kanban'

import * as NavigationActionCreators from './matx/NavigationAction'
import * as EcommerceActionsCreators from './matx/EcommerceActions'
import * as NotificationActionsCreators from './matx/NotificationActions'

export default {
    ...UserActionCreators,
    ...ChatActionCreators,
    ...KanbanActionCreators,

    ...NavigationActionCreators,
    ...EcommerceActionsCreators,
    ...NotificationActionsCreators
}

