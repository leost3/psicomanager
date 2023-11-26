import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { ID } from "~/types";
import { Table } from "./Table/Table";
import { addKeyToAppointments } from "./Table/helpers";


export type AppointmentModal = Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
  patientId?: ID
}
export function AppointmentModal({ isOpen, onOpenChange, patientId }: AppointmentModal) {
  if (!patientId) {
    return undefined
  }
  const { data, isLoading } = api.appointment.fetchAll.useQuery(patientId)
  const appointments = data?.appointments ?? []

  const appointmentsWithKey = addKeyToAppointments(appointments)

  return (
    <Modal className="bg-gray-500" size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent className="p-2 h-3/4 overflow-y-scroll">
        <ModalHeader>Sessoes Novembro</ModalHeader>
        <ModalBody>
          <Table isLoading={isLoading} appointments={appointmentsWithKey} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

