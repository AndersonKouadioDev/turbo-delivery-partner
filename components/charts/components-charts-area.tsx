'use client';
import PanelCodeHighlight from '@/components/panel-code-highlight';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const TwoAreasChart = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Options du graphique de type zone
    const graphiqueZone: any = {
        series: [
            {
                name: 'Revenus locatifs',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialisation à 0
            },
        ],
        options: {
            chart: {
                type: 'area',
                height: 300,
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca'], // Couleur personnalisée pour l'immobilier
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            xaxis: {
                axisBorder: {
                    color: isDark ? '#191e3a' : '#e0e6ed',
                },
            },
            yaxis: {
                opposite: isRtl ? true : false,
                labels: {
                    offsetX: isRtl ? -40 : 0,
                },
            },
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'], // Mois en français
            legend: {
                horizontalAlign: 'left',
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
            },
        },
    };

    return (
        isMounted && (
            <ReactApexChart
                series={graphiqueZone.series}
                options={graphiqueZone.options}
                className="rounded-lg bg-white dark:bg-black"
                type="area"
                height={300}
                width={'100%'}
            />
        )
//         <PanelCodeHighlight
//             title="Graphique des Revenus Locatifs"
//             codeHighlight={`import ReactApexChart from 'react-apexcharts';

// {isMounted && <ReactApexChart series={graphiqueZone.series} options={graphiqueZone.options} className="rounded-lg bg-white dark:bg-black" type="area" height={300} width={'100%'} />}

// // Options du graphique de type zone
// const graphiqueZone: any = {
//     series: [
//         {
//             name: 'Revenus locatifs',
//             data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialisation à 0
//         },
//     ],
//     options: {
//         chart: {
//             type: 'area',
//             height: 300,
//             zoom: {
//                 enabled: false,
//             },
//             toolbar: {
//                 show: false,
//             },
//         },
//         colors: ['#805dca'], // Couleur personnalisée pour l'immobilier
//         dataLabels: {
//             enabled: false,
//         },
//         stroke: {
//             width: 2,
//             curve: 'smooth',
//         },
//         xaxis: {
//             axisBorder: {
//                 color: isDark ? '#191e3a' : '#e0e6ed',
//             },
//         },
//         yaxis: {
//             opposite: isRtl ? true : false,
//             labels: {
//                 offsetX: isRtl ? -40 : 0,
//             },
//         },
//         labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'], // Mois en français
//         legend: {
//             horizontalAlign: 'left',
//         },
//         grid: {
//             borderColor: isDark ? '#191E3A' : '#E0E6ED',
//         },
//         tooltip: {
//             theme: isDark ? 'dark' : 'light',
//         },
//     },
// };`}
//         >
//             <div className="mb-5">
//                 {isMounted && (
//                     <ReactApexChart
//                         series={graphiqueZone.series}
//                         options={graphiqueZone.options}
//                         className="rounded-lg bg-white dark:bg-black"
//                         type="area"
//                         height={300}
//                         width={'100%'}
//                     />
//                 )}
//             </div>
//         </PanelCodeHighlight>
    );
};

export default TwoAreasChart;
