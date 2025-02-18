import { Select, SelectItem } from "@heroui/select";


interface Props {
    size?: "sm" | "md" | "lg";
    options?: any[];
    label?: string;
    selectValue?: string;
    setSelectValue?: (event?: any) => void;

}

export function SelectField(props: Props) {

    return (
        <div className="w-full flex flex-col gap-4">

            <div key={props.size} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                <Select className="min-w-[120px]" label={props.label || ""} size={props.size} aria-labelledby=" ">
                    {(props.options || []).map((option) => (
                        <SelectItem key={option.key} onPress={() => props.setSelectValue && props.setSelectValue(option.key)}>{option.label}</SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}
