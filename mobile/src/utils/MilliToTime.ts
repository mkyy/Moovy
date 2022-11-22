export function millisecondsToTime(milli: number) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n: number, z?: number) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var milliseconds = milli % 1000;
  var seconds = Math.floor((milli / 1000) % 60);
  var minutes = Math.floor((milli / (60 * 1000)) % 60);

  return pad(minutes) + ':' + pad(seconds);
}
