import { CalendarDate, RangeValue } from "@nextui-org/react";
import { useState } from "react";

interface PeriodOption {
    key: string;
    label: string;
}

export const periods: PeriodOption[] = [
    { key: 'customized', label: 'Personnalisée' },
    { key: 'week', label: 'Par semaine' },
    { key: '2week', label: 'Par quinzaine' },
    { key: 'month', label: 'Par mois' },
];

export function useContentController() {
    const [period, setPeriod] = useState('customized');
    const [content, setContent] = useState('');

    const [dates, setDates] = useState<RangeValue<Date | null>>({
        start: null,
        end: null,
    });

    const handleDateChange = (value: RangeValue<CalendarDate>) => {
        setDates({
            start: value.start ? new Date(value.start.toString()) : null,
            end: value.end ? new Date(value.end.toString()) : null,
        });
    };
    return {
        period,
        setPeriod,
        content,
        setContent,
        dates,
        handleDateChange,
        periods,
    }
}