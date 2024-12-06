'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SimpleBarChart = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // barChartOptions avec valeurs à 0
    const barChart: any = {
        series: [
            {
                name: 'Sales',
                data: [0, 0, 0, 0, 0, 0, 0, 0],
            },
        ],
        options: {
            chart: {
                height: 0,
                type: 'bar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 0,
            },
            colors: ['#000000'],
            xaxis: {
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                reversed: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                },
            },
            fill: {
                opacity: 0,
            },
        },
    };

    return (
        isMounted && <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black" type="bar" height={0} width={'100%'} />

//         <PanelCodeHighlight
//             title="Simple Bar"
//             codeHighlight={`import ReactApexChart from 'react-apexcharts';

// {isMounted && <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black" type="bar" height={300} width={'100%'} />}

// // barChartOptions
// const barChart: any = {
//     series: [
//         {
//             name: 'Sales',
//             data: [0, 0, 0, 0, 0, 0, 0, 0],
//         },
//     ],
//     options: {
//         chart: {
//             height: 0,
//             type: 'bar',
//             zoom: {
//                 enabled: false,
//             },
//             toolbar: {
//                 show: false,
//             },
//         },
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             show: true,
//             width: 0,
//         },
//         colors: ['#000000'],
//         xaxis: {
//             categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
//             axisBorder: {
//                 color: isDark ? '#191e3a' : '#e0e6ed',
//             },
//         },
//         yaxis: {
//             opposite: isRtl ? true : false,
//             reversed: isRtl ? true : false,
//         },
//         grid: {
//             borderColor: isDark ? '#191e3a' : '#e0e6ed',
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: true,
//             },
//         },
//         fill: {
//             opacity: 0,
//         },
//     },
// };`}
//         >
//             <div className="mb-5">
//                 {isMounted && <ReactApexChart series={barChart.series} options={barChart.options} className="rounded-lg bg-white dark:bg-black" type="bar" height={0} width={'100%'} />}
//             </div>
//         </PanelCodeHighlight>
    );
};

export default SimpleBarChart;
