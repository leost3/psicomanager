'use client'
import { Button, useDisclosure } from "@nextui-org/react";
import { ID } from "~/types";
import { AddPatientModal } from "./_components/patients/AddPatientModal";
import { PacientGridList } from "./_components/patients/PatientsGridList";

export type Patient = {
  id: ID,
  name: string,
}

const patients: Patient[] = [
  {
    id: "1",
    name: "Leonardo",
  },
  {
    id: "2",
    name: "Gui",
  },
  {
    id: "3",
    name: "Andre",
  },
  {
    id: "4",
    name: "Lia",
  },
  {
    id: "5",
    name: "Saullo",
  }
]

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b bg-white text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          PsicoManager
        </h1>
        <Button className="p-2" onClick={onOpen}><span className="text-xs">Adicionar paciente</span></Button>
        <AddPatientModal onOpenChange={onOpenChange} isOpen={isOpen} />
        <PacientGridList patients={patients} />
      </div>
    </main>
  );
}

