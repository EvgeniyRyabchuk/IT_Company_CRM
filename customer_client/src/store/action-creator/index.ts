import * as UserActionCreators from './user'
import * as ChatActionCreators from './chat'
import * as CardActionCreators from './card'

import * as NavigationActionCreators from './matx/NavigationAction'
import * as EcommerceActionsCreators from './matx/EcommerceActions'
import * as NotificationActionsCreators from './matx/NotificationActions'

export default {
    ...CardActionCreators,
    ...UserActionCreators,
    ...ChatActionCreators,


    ...NavigationActionCreators,
    ...EcommerceActionsCreators,
    ...NotificationActionsCreators
}

