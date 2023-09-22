import request from "@/utils/request";

export const queryExamQuestions = () => {
    return request.post("/user/xy/jxst");
};
