let Commands;
(function() {
    let commands = new Map();
    Commands = {
        /**
         * Adds a command to the commands list.
         * @param {String} command Command to be added
         * @param {Function} callback Whatever is called upon execution.
         */
        addCommand: function (command, callback) {
            commands.set(command, callback);
        },
        /**
         * Gets a command from the commands list.
         * @param {String} command Command to be fetched
         * @returns {Function|null} The callback function or null if not found
         */
        getCommand: function (command) {
            return commands.get(command);
        },
        /**
         * Removes a command from the commands list.
         * @param {String} command Command to be removed
         * @returns {Boolean} True or false if the deletion was successful or not, respectively
         */
        removeCommand: function (command) {
            return commands.delete(command);
        },
        runCommand: function (command, ...arguments) {
            command = Commands.getCommand(command);

            try {
                command(...arguments);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
})();

module.exports = Commands;
