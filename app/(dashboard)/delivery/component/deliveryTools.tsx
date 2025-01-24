'use client';

import { CourseExterne, Restaurant } from '@/types/models';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from '@nextui-org/react';
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons-react';
import { STATUSES } from '@/data';
import { Check, X } from 'lucide-react';
import DeliveryValidate from './delivery-validate';
import DeliveryCancel from './delivery-cancel';

const DeliveryTools = ({ restaurant, delivery }: { restaurant: Restaurant; delivery: CourseExterne }) => {
    const [openValider, setOpenValider] = useState<boolean>(false);
    const [openCancel, setOpenCancel] = useState<boolean>(false);

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="light" isIconOnly>
                        <IconDotsVertical />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownSection showDivider title="Actions">
                        {delivery.statut === STATUSES.EN_ATTENTE ? (
                            <>
                                <DropdownItem startContent={<X />} color="danger" key="edit" onClick={() => setOpenCancel(true)}>
                                    Annuler
                                </DropdownItem>
                                <DropdownItem startContent={<Check />} color="success" key="edit" onClick={() => setOpenValider(true)}>
                                    Valider
                                </DropdownItem>
                            </>
                        ) : (
                            <></>
                        )}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

            <DeliveryValidate restaurant={restaurant} delivery={delivery} open={openValider} setOpen={setOpenValider} />
            <DeliveryCancel restaurant={restaurant} delivery={delivery} open={openCancel} setOpen={setOpenCancel} />
        </>
    );
};

export default DeliveryTools;
