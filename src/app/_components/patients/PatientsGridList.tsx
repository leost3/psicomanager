'use client'
import { useDisclosure } from "@nextui-org/react";
import type { Patient } from "~/app/page";
import type { ID } from "~/types";
import { AppointmentModal } from "./AppointmentModal";
import { PacientCard } from "./PatientCard";
export type PacientGridListProps = {
  patients: Patient[]
}

export function PacientGridList({ patients }: PacientGridListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  function onOpenModal(id: ID) {
    console.log(id)
    onOpen()
  }

  return (
    <>
      <AppointmentModal isOpen={true} onOpenChange={onOpenChange} />
      <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {patients.map(patient => <PacientCard onClick={onOpenModal} key={patient.id} patient={patient} />)}
      </div>
    </>
  )
}



