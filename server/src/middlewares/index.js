const { AuthMiddleware } = require('./AuthMiddleware')
const { notFound, errorHandler } = require('./ErrorMiddleware')
const { GroupAdminMiddleware } = require('./Group/GroupAdminMiddleware')
const { NotGroupAdminMiddleware } = require('./Group/NotGroupAdminMiddleware')
const { ChatExistsMiddleware } = require('./Chat/ChatExistsMiddleware')
const {
    FriendRequestRecieverMiddleware,
} = require('./Friend Request/FriendRequestRecieverMiddleware')
const {
    FriendRequestStatusMiddleware,
} = require('./Friend Request/FriendRequestStatusMiddleware')
const {
    FriendExistsMiddleware,
} = require('./Friend Request/FriendExistsMiddleware')

module.exports = {
    AuthMiddleware,
    notFound,
    errorHandler,
    GroupAdminMiddleware,
    NotGroupAdminMiddleware,
    ChatExistsMiddleware,
    FriendRequestRecieverMiddleware,
    FriendRequestStatusMiddleware,
    FriendExistsMiddleware,
}
