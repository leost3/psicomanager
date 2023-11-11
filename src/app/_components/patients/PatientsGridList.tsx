'use client'
import { useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { ID } from "~/types";
import { EditPatientModal } from "./EditPacientModal";
import { PacientCard } from "./PatientCard";

export type PacientGridListProps = {
  patients: any[]
}

export function PacientGridList({ patients }: PacientGridListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingPatient, setPatient] = useState({})

  const onEdit = useCallback((patientId: ID) => {
    // TODO: Fetch selected pacient
    setPatient({
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
      <EditPatientModal onOpenChange={onOpenChange} isOpen={isOpen} pacient={editingPatient} />
      {patients.map(patient => <PacientCard patient={patient} onEdit={onEdit} />)}
    </div>
  )
}


