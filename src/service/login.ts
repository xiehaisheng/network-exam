import request from "@/utils/request";

export const login = (params: any) => {
    return request.post("/user/xy/login", params);
};

export const userInfo = () => {
    return request.post("/user/xy/xy_info");
};

export const noLoginCount = () => {
    return request.post("/user/xy/wdl_st_count");
};