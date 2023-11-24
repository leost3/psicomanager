import { api } from "~/trpc/server";
import { AddPatient } from "./_components/patients/AddPatients";
import { PacientGridList } from "./_components/patients/PatientsGridList";


export default async function Home() {

  const { patients } = await api.patient.fetchAll.query()

  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b bg-white text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          PsicoManager
        </h1>
        <AddPatient />
        <PacientGridList patients={patients} />
      </div>
    </main>
  );
}

