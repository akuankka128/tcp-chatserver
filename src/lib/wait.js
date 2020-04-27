/**
 * Waits for <b>howlong</b> milliseconds
 * @async
 * @param {Number} howlong How long to wait, in milliseconds
 * @returns {Promise<void>}
 */
async function wait(howlong) {
    return new Promise((res, rej) => {
        setTimeout(function(){
            res();
        }, howlong);
    });
}

module.exports = wait;
