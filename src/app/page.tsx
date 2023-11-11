import { PacientCard } from "./_components/PatientCard";

const pacients = [
  {
    firstName: "Leonardo",
    lastName: "Studart",
    age: 35,
    from: "Canada"
  },
  {
    firstName: "Gui",
    lastName: "Palmeiras",
    age: 24,
    from: "Canada"
  },
  {
    firstName: "Andre",
    lastName: "Studart",
    age: 17,
    from: "Brasil"
  },
  {
    firstName: "Lia",
    lastName: "Studart",
    age: 33,
    from: "Portugal"
  },
  {
    firstName: "Saullo",
    lastName: "Carneiro",
    age: 40,
    from: "Brasil"
  }
]

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col  bg-gradient-to-b bg-white text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          PsicoManager
        </h1>
        <div className="w-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          {pacients.map(pacient => <PacientCard info={pacient} />)}
        </div>
      </div>
    </main>
  );
}

