import * as UserActionCreators from './user'
import * as ChatActionCreators from './chat'
import * as KanbanActionCreators from './kanban'

import * as NavigationActionCreators from './NavigationAction'
import * as EcommerceActionsCreators from './EcommerceActions'
import * as NotificationActionsCreators from './NotificationActions'

export default {
    ...UserActionCreators,
    ...ChatActionCreators,
    ...KanbanActionCreators,

    // ...NavigationActionCreators,
    ...EcommerceActionsCreators,
    ...NotificationActionsCreators
}

