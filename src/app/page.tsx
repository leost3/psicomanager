import { AddPatient } from "./_components/patients/AddPatients";
import { PacientGridList } from "./_components/patients/PatientsGridList";

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

export default async function Home() {


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


