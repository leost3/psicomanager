
'use client'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Tooltip } from "@nextui-org/react";
import { CheckCircledIcon, CrossCircledIcon, ExternalLinkIcon } from "@radix-ui/react-icons";
import { Mail, Phone } from "lucide-react";


export type PatientCardProps = {
  info: any,
  className?: string
}

export function PacientCard({ info, ...props }: PatientCardProps) {
  return (
    <Card className="p-1" {...props}>
      <CardHeader className="flex gap-2 items-start justify-between ">
        <div className="flex bg-red-50 items-start justify-between gap-2">
          <Avatar name="LS" size="lg" />
          <div className="flex-col">
            <h1 className="text-md font-semibold">
              {info.firstName} {info.lastName}
            </h1>
            <div className="flex gap-1">
              <p className="text-xs text-default-500">35 anos,</p>
              <p className="text-xs text-default-500">solteiro</p>
            </div>
            <p className="text-xs text-default-500">Engenheiro</p>
          </div>
        </div>
        <Button>Editar</Button>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-2">
        {/* Saldo e frequencia client */}
        <div className="flex  justify-between">
          <Tooltip showArrow content="Saldo do cliente">
            <Chip size="sm" startContent={false ? <CheckCircledIcon color="white" /> : <CrossCircledIcon color="white" />} color={false ? "success" : "danger"} className="p-2" >
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