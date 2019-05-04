export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const writeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; Path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
