'use client'
import { useDisclosure } from "@nextui-org/react";
import { Patient } from "@prisma/client";
import { useState } from "react";
import type { ID } from "~/types";
import { AppointmentModal } from "./AppointmentModal";
import { PacientCard } from "./PatientCard";
export type PacientGridListProps = {
  patients: Patient[]
}

export function PacientGridList({ patients }: PacientGridListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [patientId, setPatientId] = useState<ID>()
  function onOpenModal(id: ID) {
    setPatientId(id)
    onOpen()
  }

  return (
    <>
      <AppointmentModal
        patientId={patientId}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
        {patients.map(patient => (
          <PacientCard
            onClick={onOpenModal}
            key={patient.id}
            patient={patient}
          />))}
      </div>
    </>
  )
}



