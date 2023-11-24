
'use client'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Tooltip } from "@nextui-org/react";
import { Patient } from "@prisma/client";
import { ArrowBottomRightIcon, CheckCircledIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Mail, Phone } from "lucide-react";
import type { ID } from "~/types";


export type PatientCardProps = {
  patient: Patient
  className?: string
  onClick: (id: ID) => void
}

export function PacientCard({ patient, onClick, ...props }: PatientCardProps) {
  const { dateOfBirth, profession, } = patient
  const age = new Date().getFullYear() - dateOfBirth.getFullYear()

  return (
    <Card className="p-1" {...props}>
      <CardHeader className="flex gap-2 items-start justify-between ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between gap-4">
            <div className="flex bg-red-50  gap-2">
              <Avatar name="LS" size="md" />
              <div className="flex-col">
                <h1 className="text-md font-semibold">
                  {patient.name}
                </h1>
                <p className="text-xs text-default-500">{age} anos</p>
                <p className="text-xs text-default-500">{profession}</p>
              </div>
            </div>
            <div>
              <Button size="sm" onClick={() => onClick(patient.id)}>
                Gerenciar Sessoes
              </Button>
            </div>
          </div>
          {/* Saldo / frequencia client / proxima consulta */}
          <div className="flex gap-2 items-center  justify-center flex-wrap">
            <Tooltip showArrow content="Saldo do cliente">
              <Chip size="sm" startContent={false ? <CheckCircledIcon color="white" /> : <ArrowBottomRightIcon color="white" />} color={false ? "success" : "danger"} className="p-2" >
                <span className="text-white">
                  R$: -100
                </span>
              </Chip>
            </Tooltip>
            <Tooltip showArrow content="Frequencia do paciente">
              <Chip size="sm" color={false ? "primary" : "primary"} className="p-2" >
                <span className="text-white">
                  Frequente
                </span>
              </Chip>
            </Tooltip>

          </div>
          <div className=" text-xs flex flex-col text-center border border-neutral-400 p-1 rounded-xl">
            <span className="text-default-500">Proxima consulta:</span>
            <span className=" text-black"> APPPOINTMENTEDATE</span>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        {/* Informacoes pessoais */}
        <div className="bg-red-50 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <Phone size={15} />
            <p className="text-xs text-default-500">
              +1-438-509-4272
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={15} />
            <p className="text-xs text-default-500">
              meuemaul@mail.com
            </p>
          </div>
        </div>
        {/* Sintomas */}
        <div className="flex flex-wrap gap-2 bg-red-50 ">
          <Chip variant="flat" size="sm">
            Depressivo
          </Chip>
          <Chip variant="flat" size="sm">Ansiedade</Chip>
          <Chip variant="flat" size="sm">Solidao</Chip>
        </div>
        {/* Historico */}
        <div className="bg-red-50 flex flex-col gap-2 ">
          <div className="flex flex-col  bg-red-100 ">
            <p className="text-md  border-b-3 w-fit">Queixa principal</p>
            <p className="text-sm text-default-500"> Ansiedade</p>
          </div>
          <div className="flex flex-col  bg-blue-100">
            <p className="text-md  border-b-3 w-fit">Historico psicossocial</p>
            <p className="text-sm text-default-500"> Ansiedade</p>
          </div>
        </div>
      </CardBody >
      <Divider />
      <CardFooter className="flex justify-center">
        <Button endContent={<ExternalLinkIcon />}>Ver ficha completa do cliente</Button>
      </CardFooter>
    </Card >
  )
}