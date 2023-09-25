import request from "@/utils/request";

export const queryCertificate = () => {
    return request.post("/user/xy/zs_zs_list");
}