import { RouterOutputs } from "~/trpc/shared"


export type Appointment = RouterOutputs['appointment']['fetchAll']['appointments'][number]

export function addKeyToAppointments(appointments: Appointment[]) {
  return appointments.map((appointment, i) => ({
    ...appointment,
    key: i.toString()
  }))
}