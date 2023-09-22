export const stringToDate = (str: string) => {
  return new Date(str.replace(/-/g, "/"));
};

export function dateFormat(date: Date, fmt: string) {
  const o = {
    "Y+": date.getFullYear().toString(), //年    YYYY YY
    "M+": date.getMonth() + 1, //月份  MM  M
    "D+": date.getDate(), //日    DD  D
    "H+": date.getHours(), //小时  HH H   0-23
    "m+": date.getMinutes(), //分    mm m
    "s+": date.getSeconds(), //秒    ss  s
    d: date.getDay(), //周    d  0-6
  } as any;
  for (let k in o) {
    fmt = fmt.replace(new RegExp(k, "g"), (word) => {
      if (k === "Y+") {
        return word.length === 2 ? o[k].substring(2) : o[k];
      }
      if (word.length === 1) {
        return o[k];
      }

      const content = "0" + o[k];

      return content.substring(content.length - 2);
    });
  }
  return fmt;
}
