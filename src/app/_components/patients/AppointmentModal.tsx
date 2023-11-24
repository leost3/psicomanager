import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from "@nextui-org/react";
import { ID } from "~/types";
import { Table } from "./Table/Table";


export type AppointmentModal = Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
  patientId?: ID
}
export function AppointmentModal({ isOpen, onOpenChange, patientId }: AppointmentModal) {
  if (!patientId) {
    return undefined
  }

  return (
    <Modal className="bg-gray-500" size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent className="p-2 h-3/4 overflow-y-scroll">
        <ModalHeader>Sessoes Novembro</ModalHeader>
        <ModalBody>
          <Table patientId={patientId} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}