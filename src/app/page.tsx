import { PacientGridList } from "./_components/patients/PatientsGridList";

const patients = [
  {
    id: "1",
    firstName: "Leonardo",
    lastName: "Studart",
    age: 35,
    from: "Canada"
  },
  {
    id: "2",
    firstName: "Gui",
    lastName: "Palmeiras",
    age: 24,
    from: "Canada"
  },
  {
    id: "3",
    firstName: "Andre",
    lastName: "Studart",
    age: 17,
    from: "Brasil"
  },
  {
    id: "4",
    firstName: "Lia",
    lastName: "Studart",
    age: 33,
    from: "Portugal"
  },
  {
    id: "5",
    firstName: "Saullo",
    lastName: "Carneiro",
    age: 40,
    from: "Brasil"
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b bg-white text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          PsicoManager
        </h1>
        <PacientGridList patients={patients} />
      </div>
    </main>
  );
}

