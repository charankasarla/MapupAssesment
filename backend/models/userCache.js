class UserCache {
    constructor() {
        this.cache = {};
    }

    getUserCredentials(username) {
        return this.cache[username] || null;
    }

    initUserCredentials() {
        const users = require('../config/config').users;
        this.cache[users.admin.username] = {
            username: users.admin.username,
            password: users.admin.password,
            role: users.admin.role,
        };
        this.cache[users.manager.username] = {
            username: users.manager.username,
            password: users.manager.password,
            role: users.manager.role,
        };
        this.cache[users.user.username] = {
            username: users.user.username,
            password: users.user.password,
            role: users.user.role,
        };
    }

    setJWTToken(username, token) {
        if (this.cache[username]) {
            this.cache[username].token = token;
        }
    }
}

module.exports = new UserCache();
