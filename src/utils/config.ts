import Cookies from 'js-cookie'

const configs = {
  common: {
    name: "test",
    basePath: __PATH__,
  },
  local: {},
  test: {},
  production: {},
};

const _config = configs[__ENV__];

if (!_config) {
  throw new Error("配置不正确");
}

export const config = {
  ...configs.common,
  ..._config,
};


export function getToken(TokenKey: any) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey: any, token: any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey: any) {
  return Cookies.remove(TokenKey)
}