import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import LimitContext from './../components/MainMenu';

import { FETCH_INIT, FETCH_SUCCESS, FETCH_FAILURE } from './types';

const dataFetchReducer = (state: any, action: any) => {
    switch (action.type) {
        case FETCH_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            };
        case FETCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error();
    }
};

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
// if (process.env.REACT_APP_API_TOKEN) {
//     instance.defaults.headers.common['X-CMC_PRO_API_KEY'] =
//         process.env.REACT_APP_API_TOKEN;
// }

type paramsObj = {
    limit: string;
};

const useDataApi = (initialParams: paramsObj, initialData: any) => {
    const [params, setParams] = useState(initialParams);

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: FETCH_INIT });

            try {
                // const result = await instance.get('listings/latest', query);
                // const result = await instance.get('search', query);
                let url: string = process.env.REACT_APP_API_URL_GET_COINS_DATA
                    ? process.env.REACT_APP_API_URL_GET_COINS_DATA
                    : '';
                const result = await instance.get(url, { params });

                if (!didCancel) {
                    dispatch({ type: FETCH_SUCCESS, payload: result.data });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: FETCH_FAILURE });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [params]);

    return [state, setParams];
};

export default useDataApi;
