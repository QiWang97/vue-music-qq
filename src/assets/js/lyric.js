export function parseLyric(lyric) {
  let lines = lyric.split('\n');
  let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
  let result = [];
  while (!pattern.test(lines[0])) {
    lines = lines.slice(1);
  }
  lines[lines.length - 1].length === 0 && lines.pop();
  for (let data of lines) {
    let index = data.indexOf(']');
    let time = data.substring(0, index + 1);
    let value = data.substring(index + 1);
    let timeString = time.substring(1, time.length - 2);
    let timeArr = timeString.split(':');
    result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);
  }
  result.sort(function (a, b) {
    return a[0] - b[0];
  });
  return result;
}