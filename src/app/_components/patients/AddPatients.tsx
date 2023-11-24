'use client'
import { Button, useDisclosure } from "@nextui-org/react";
import { AddPatientModal } from "./AddPatientModal";

export function AddPatient() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button className="p-2" onClick={onOpen}><span className="text-xs">Adicionar paciente</span></Button>
      <AddPatientModal onOpenChange={onOpenChange} isOpen={isOpen} />
    </>

  )
}
