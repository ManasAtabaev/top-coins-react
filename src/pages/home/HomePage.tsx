import React, { Fragment, useState, useContext } from 'react';
import MainMenu from './../../components/MainMenu';
import CoinsTable from './../../components/CoinsTable';
import Loader from './../../components/Loader';
import useDataApi from './../../hooks/useDataApi';

export default function HomePage() {
    const [limit, setLimit] = useState('10');
    const [state, doFetch] = useDataApi(
        {
            limit: limit,
        },
        {
            data: [],
        }
    );

    function changeLimitAndRefeshData(value: string) {
        setLimit(value);
        doFetch({ limit: value });
    }

    return (
        <Fragment>
            <div className="min-h-full">
                <MainMenu />

                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Dashboard
                                </h1>
                            </div>
                            <div>
                                <div className="relative inline-block w-full text-gray-700 mb-4">
                                    <select
                                        value={limit}
                                        onChange={(e) =>
                                            changeLimitAndRefeshData(
                                                e.target.value
                                            )
                                        }
                                        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
                                    >
                                        <option value="10">10</option>
                                        <option value="50">50</option>
                                        <option value="100">All</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {state.isError && <div>Something went wrong ...</div>}

                        {state.isLoading && <Loader />}

                        {!state.isError && !state.isLoading && (
                            <CoinsTable data={state.data.data} />
                        )}
                    </div>
                </main>
            </div>
        </Fragment>
    );
}
