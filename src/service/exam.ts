import request from "@/utils/request";

export const queryExamQuestions = () => {
    return request.post("/user/xy/jxst");
};

export const getExamAnswers = (params: any) => {
    return request.post("/user/xy/tjda", params);
};

export const queryAnswers = (params: any) => {
    return request.post("/user/xy/dtxx", params);
};

export const getAnswersSheet = (params: any) => {
    return request.post("/user/xy/dtk_zq", params);
};

