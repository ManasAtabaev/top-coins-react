import React, { useState, useEffect } from 'react';
import MainMenu from './../../components/MainMenu';
import Loader from './../../components/Loader';
import useDataApi from './../../hooks/useDataApi';
import { Scatter } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

type ChartData = {
    datasets: any;
};

export default function LiquidityPage() {
    const [chartData, setChartData] = useState<ChartData>({ datasets: {} });
    const [showChart, setShowChart] = useState(false);
    const [limit, setLimit] = useState('10');
    const [state, doFetch] = useDataApi(
        {
            limit: limit,
        },
        {
            data: [],
        }
    );

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (context: any) {
                        console.log(state.data.data[context[0].dataIndex]);
                        return state.data.data[context[0].dataIndex].name;
                    },
                    label: function (context: any) {
                        let item = state.data.data[context.dataIndex];
                        return [
                            'Market Cap: ' +
                                formatter.format(item.quote['USD'].market_cap),
                            'Volume (24h): ' +
                                formatter.format(item.quote['USD'].volume_24h),
                            'Price Change (24h): ' +
                                item.quote['USD'].percent_change_24h +
                                '%',
                        ];
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        if (!state.isError && !state.isLoading) {
            let dataset = [];
            for (let item of state.data.data) {
                dataset.push({
                    x: item.quote['USD'].market_cap,
                    y: item.quote['USD'].volume_24h,
                });
            }
            console.log(dataset);

            let value = {
                datasets: [
                    {
                        label: 'Top Coins',
                        data: dataset,
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                    },
                ],
            };
            setChartData(value);
            setShowChart(true);
        }
    }, [state]);

    function changeLimitAndRefeshData(value: string) {
        setLimit(value);
        doFetch({ limit: value });
    }

    return (
        <>
            <div className="min-h-full">
                <MainMenu />

                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Liquidity
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

                        {showChart && (
                            <Scatter data={chartData} options={options} />
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
