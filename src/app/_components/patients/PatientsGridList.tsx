'use client'
import { useDisclosure } from "@nextui-org/react";
import { useCallback, useState } from "react";
import { Patient } from "~/app/page";
import { ID } from "~/types";
import { EditPatientModal } from "./EditPacientModal";
import { PacientCard } from "./PatientCard";

export type PacientGridListProps = {
  patients: Patient[]
}

export function PacientGridList({ patients }: PacientGridListProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingPatient, setPatient] = useState<Patient | undefined>(undefined)

  const onEdit = useCallback((patientId: ID) => {
    // TODO: Fetch selected pacient
    setPatient({
      id: "1",
      name: "Leonardo",
    })
    onOpen()
  }, [])

  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      <EditPatientModal onOpenChange={onOpenChange} isOpen={isOpen} patient={editingPatient} />
      {patients.map(patient => <PacientCard patient={patient} onEdit={onEdit} />)}
    </div>
  )
}


