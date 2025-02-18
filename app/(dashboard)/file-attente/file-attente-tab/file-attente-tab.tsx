import { Tab, Tabs } from "@nextui-org/react"
import { CoursiersDiaponible } from "../coursiers-disponibles/coursiers-disponible"
import { CoursisersPasActivite } from "../coursiers-pas-activites/coursiers-pas-activite"

interface Props {
    data: any[];
    searchKey?: string
    setRowData?: (position: string) => void;
    rowData?: any
}
export function FileAttenteTab({ data, searchKey, setRowData, rowData }: Props) {
    const items = [
        { title: "Disponible maintenant", kay: "disponible" },
        { title: "Pas en activité", kay: "indisponible" }
    ]
    return (
        <div className="mt-4">
            <Tabs items={items || []} className="w-full">
                {(item) => (
                    <Tab key={item.kay} title={<span className="ml-10 pl-5 pr-5">{item.title}</span>}>
                        {
                            item.kay === "disponible" ?
                                <CoursiersDiaponible data={data} searchKey={searchKey} setRowData={setRowData} rowData={rowData} />
                                :
                                <CoursisersPasActivite data={data} searchKey={searchKey} />
                        }
                    </Tab>
                )}
            </Tabs>
        </div>
    )
}