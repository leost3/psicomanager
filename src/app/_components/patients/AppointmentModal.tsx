import { Modal, ModalBody, ModalContent, ModalHeader, ModalProps } from "@nextui-org/react";


export type AppointmentModal = Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
}

export function AppointmentModal({ isOpen, onOpenChange }: AppointmentModal) {

  return (
    <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent className="p-2 h-3/4 overflow-y-scroll">
        <ModalHeader>Sessoes Novembro</ModalHeader>
        <ModalBody>
          TABLE
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}