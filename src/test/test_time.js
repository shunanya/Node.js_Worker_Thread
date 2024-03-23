
/**
 * Format a timestamp into the form 'year/month/day-hh:mm:ss.ms'
 *
 * @param timestamp
 *            the timestamp in ms
 * @returns formatted string
 */
function toGMTTime(timestamp) {
    let time = timestamp;
    const ms = ~~(time % 1000);
    time /= 1000;
    const sec = ~~(time % 60);
    time = ~~(time/60);
    const min = ~~(time % 60);
    time = ~~(time/60);
    const hr = ~~(time % 24);
    time = ~~(time/24);
    const da = ~~(time % 30.433);
    time = ~~(time/30.433);
    const mo = ~~(time % 12)+1;
    time = ~~(time/12);
    const ye = 1970+time;
    return `${ye}/${mo}/${da}-${hr}:${min}:${sec}.${ms}`;
}

const timestamp = Date.now();
console.log(`${timestamp} => ${toGMTTime(timestamp)}`);
let dt = new Date();
dt.setTime(Date.now());
console.log(`${dt.toUTCString()}, ${dt.toLocaleTimeString("en-GB", { hour12: false })}`)
