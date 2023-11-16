'use client'
import { Patient } from "~/app/page";
import { PacientCard } from "./PatientCard";

export type PacientGridListProps = {
  patients: Patient[]
}

export function PacientGridList({ patients }: PacientGridListProps) {
  return (
    <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
      {patients.map(patient => <PacientCard patient={patient} />)}
    </div>
  )
}


