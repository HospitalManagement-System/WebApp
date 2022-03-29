export const CookieManager = (
  type: string,
  name: string,
  value?: boolean
): any => {
  const days: number = 1;
  if (type == 'set') {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toUTCString();
  } else if (type == 'get') {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  } else if (type == 'delete') {
    //setCookie(name, '', -1);
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
};
