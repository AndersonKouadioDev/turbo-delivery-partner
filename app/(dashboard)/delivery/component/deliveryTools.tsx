'use client';

import { CourseExterne, Restaurant } from '@/types/models';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button } from "@heroui/react";
import { useState } from 'react';
import { IconDotsVertical } from '@tabler/icons-react';
import { COURSES_STATUSES } from '@/data';
import { Check, QrCode, X } from 'lucide-react';
import DeliveryValidate from './delivery-validate';
import DeliveryCancel from './delivery-cancel';
import DeliveryQRCode from './delivery-qr-code';

const DeliveryTools = ({ restaurant, delivery }: { restaurant: Restaurant; delivery: CourseExterne }) => {
    const [openValider, setOpenValider] = useState<boolean>(false);
    const [openCancel, setOpenCancel] = useState<boolean>(false);
    const [openQrCode, setOpenQrCode] = useState<boolean>(false);

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
                        {delivery.statut === COURSES_STATUSES.EN_ATTENTE ? (
                            <DropdownItem startContent={<X />} color="danger" key="edit" onClick={() => setOpenCancel(true)}>
                                Annuler
                            </DropdownItem>
                        ) : (
                            <></>
                        )}
                        <DropdownItem startContent={<QrCode />} color="default" key="code" onClick={() => setOpenQrCode(true)}>
                            Code de la course
                        </DropdownItem>
                        {delivery.statut === COURSES_STATUSES.EN_COURS ? (
                            <DropdownItem startContent={<Check />} color="success" key="edit" onClick={() => setOpenValider(true)}>
                                Terminer
                            </DropdownItem>
                        ) : (
                            <></>
                        )}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

            <DeliveryValidate restaurant={restaurant} delivery={delivery} open={openValider} setOpen={setOpenValider} />
            <DeliveryCancel restaurant={restaurant} delivery={delivery} open={openCancel} setOpen={setOpenCancel} />
            <DeliveryQRCode restaurant={restaurant} delivery={delivery} open={openQrCode} setOpen={setOpenQrCode} />
        </>
    );
};

export default DeliveryTools;
