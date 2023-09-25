import { useEffect, useState } from 'react';
import { createContext } from "./base";
import { getToken } from '@/utils/config';
import { queryUserInfo } from '@/service/login';
import { useHistory } from 'react-router-dom';

export const UserModelContext = createContext(() => {
    const history = useHistory();
    const [userInfo, setInfoData] = useState({});

    const getUserInfo = async () => {
        try {
            const { data, code }: any = await queryUserInfo();
            if (code === 1) {
                setInfoData(data);
            } else {
                history.push('/login')
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [getToken("token")]);

    return {
        userInfo,
        setUserInfo(data: {}) {
            setInfoData(data);
        },
    };
});
