import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchFieldProps {
    searchKey: string;
    onChange: (event: any) => void;
    className?: string;
    parentClass?: string;
}
export function SearchField(props: SearchFieldProps) {
    return (
        <div className={`relative w-full ${props.parentClass ? props.parentClass : "max-w-lg"} `}>
            <div className={`relative ${props.className}`}>
                <Search className="absolute left-3 top-2 text-gray-400" size={18} />
                <Input
                    type="text"
                    placeholder="Rechercher"
                    value={props.searchKey}
                    onChange={props.onChange}
                    className="w-3/4 pl-10 pr-4 py-2 border-2 rounded-full bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
            </div>
        </div>
    )
}