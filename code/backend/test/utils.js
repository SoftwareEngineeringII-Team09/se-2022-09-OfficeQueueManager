const PersistentManager = require("../dao/PersistentManager");

/* Reset DB content */
module.exports.clearAll = async () => {
    return Promise.all([
        PersistentManager.deleteAll("Ticket"),
        PersistentManager.deleteAll("Service"),
        PersistentManager.deleteAll("Counter"),
        PersistentManager.deleteAll("sqlite_sequence")
    ]);
};
