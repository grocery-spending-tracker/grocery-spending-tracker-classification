import fs from 'fs';

/**
 * logs error
 * @param {String} error logging error message
 */
function logError(error) {
    fs.appendFile('errorLog.txt', `${new Date().toISOString()} - ${error}\n`, err => {
        if (err) console.error('Error logging to file:', err);
    });
}

export default { logError };
