'use client'
import { ModalProps, useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { ID } from "~/types";
import { EditPatientModal } from "./EditPacientModal";
import { PacientCard } from "./PatientCard";

export type PacientGridListProps = {
  pacients: any[]
}

export function PacientGridList({ pacients }: PacientGridListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingPacient, setPacient] = useState({})

  const onEdit = useCallback((patientId: ID) => {
    // TODO: Fetch selected pacient
    setPacient({
      id: "1",
      firstName: "Leonardo",
      lastName: "Studart",
      age: 35,
      from: "Canada"
    })
    onOpen()
  }, [])

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      <EditPatientModal onOpenChange={onOpenChange} isOpen={isOpen} pacient={editingPacient} />
      {pacients.map(pacient => <PacientCard info={pacient} onEdit={onEdit} />)}
    </div>
  )
}
export type EditPatientModalProps = Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
  pacient: any
}


