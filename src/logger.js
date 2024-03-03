import fs from 'fs';

function logError(error) {
    fs.appendFile('errorLog.txt', `${new Date().toISOString()} - ${error}\n`, err => {
        if (err) console.error('Error logging to file:', err);
    });
}

export { 
    logError 
};
