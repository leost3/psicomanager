'use client'
import { DatePicker } from "@/components/ui/datepicker";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalProps, Select, SelectItem, Textarea } from "@nextui-org/react";
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { z } from "zod";
import { Patient } from "~/app/page";

export type EditPatientModalProps = Pick<ModalProps, 'isOpen' | 'onOpenChange'> & {
  patient?: Patient
}

const civilStatusList = [{
  label: "Solteiro(a)",
  value: "Single"
},
{
  label: "Casado(a)",
  value: "Married"
},
{
  label: "Divorciado(a)",
  value: "Divorced"
},
{
  label: "Viuvo(a)",
  value: "Widower"
}
]

const frequencySelect = [{
  label: "Semanal",
  value: "Weekly"
},
{
  label: "Bisemanal",
  value: "Biweekly"
},
{
  label: "Mensal",
  value: "Monthly"
},
]

const createFormSchema = z.object({
  name: z.string()
    .transform(name => {
      return name.trim().split(' ').map(word => {
        return word[0]?.toLocaleLowerCase().concat(word.substring(1))
      }).join(' ')
    }),
  phoneNumber: z.string(),
  email: z.string()
    .email('forato invalido'),
  bornDate: z.date(),
  civilStatus: z.string(),
  symptoms: z.array(z.object({
    symptom: z.string().min(1, 'Nao pode estar vazio')
  })).min(1, 'MINIMO 1'),
  firstAppointmentDate: z.date(),
  frequency: z.string(),
  observations: z.string(),
  cost: z.string(),
  profession: z.string(),
  duration: z.number()
})

type CreateFormData = z.infer<typeof createFormSchema>


export function EditPatientModal({ isOpen, onOpenChange, patient }: EditPatientModalProps) {

  const { control, formState, handleSubmit } = useForm<CreateFormData>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      bornDate: new Date(),
      firstAppointmentDate: new Date(),
      name: "Leo",
      civilStatus: "Single",
      email: "eu@gmail.com",
      frequency: "Weekly",
      observations: "general observations",
      phoneNumber: "2233",
      symptoms: [{
        symptom: 'axienty'
      }],
      cost: "150",
      profession: "Software Engineer",
      duration: 60
    }
  })

  const { fields, append, remove } = useFieldArray<CreateFormData>({
    control,
    name: 'symptoms'
  });

  function addNewSymptom() {
    append({ symptom: '' })
  }

  function removeSymptom(index: number) {
    remove(index)
  }


  const onSubmit = async (data: CreateFormData) => {
    console.log(data)
    await fetch("/api/patients", {
      method: 'POST',
      body: JSON.stringify({ data })
    })
  }

  const { errors } = formState

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
      <ModalContent className="p-2 h-3/4 overflow-y-scroll">
        {(onClose) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            {patient?.name}
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span>Ficha do paciente</span>
                <Button type="submit">Submit</Button>
              </div>
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input label="Nome do paciente" {...field} />}
              />
              {errors.name && <span className="text-xs text-red-500 text-center">{errors.name.message}</span>}
              <Controller
                name="profession"
                control={control}
                render={({ field }) => <Input label="Profissao do paciente" {...field} />}
              />
              {errors.profession && <span className="text-xs text-red-500 text-center">{errors.profession.message}</span>}

              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => <Input label="Numero do telefone"  {...field} />}
              />
              {errors.phoneNumber && <span className="text-xs text-red-500 text-center">{errors.phoneNumber.message}</span>}
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input label="E-mail"  {...field} />}
              />
              {errors.email && <span className="text-xs text-red-500 text-center">{errors.email.message}</span>}
              <Controller
                name="civilStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    label="Estado civil"
                  >
                    {civilStatusList.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.civilStatus && <span className="text-xs text-red-500 text-center">{errors.civilStatus.message}</span>}

              {/* TODO: select a Datepicker for better year selection */}
              <Controller
                name="bornDate"
                control={control}
                render={({ field }) => <DatePicker

                  {...field} onChange={(selectedDate: Date) => field.onChange(selectedDate)}
                  label="Data de nascimento"
                />}
              />
              {errors.bornDate && <span className="text-xs text-red-500 text-center">{errors.bornDate.message}</span>}

            </ModalHeader>
            <Divider />
            <ModalBody>
              <div className="flex flex-col gap-2">
                <Button onClick={addNewSymptom}>Adicionar sintoma</Button>
                {fields.map((field, index) => {
                  const fieldName = `symptoms.${index}.symptom` as `symptoms.${number}.symptom`
                  return (
                    <>
                      <div className="flex gap-2 items-center">
                        <Controller
                          key={field.id}
                          name={fieldName}
                          control={control}
                          render={({ field }) => <Input label="sintoma" {...field} />}
                        />
                        <Button className="p-6" onClick={() => removeSymptom(index)}>X</Button>
                      </div>
                      {errors.symptoms?.length && <span className="text-xs text-red-500 text-center">{errors.symptoms?.[index]?.symptom?.message}</span>}
                      {errors.symptoms && <span className="text-xs text-red-500 text-center">{errors.symptoms?.message}</span>}
                    </>
                  )
                })}
                <div>
                  {errors.symptoms?.root?.message && <span className="text-xs text-red-500 text-center">{errors.symptoms?.root?.message}</span>}
                  {errors.symptoms && <span className="text-xs text-red-500 text-center">{errors.symptoms.message}</span>}
                </div>
                <Controller
                  name="observations"
                  control={control}
                  render={({ field }) => <Textarea label="Observacoes gerais" {...field} />}
                />
                {errors.observations && <span className="text-xs text-red-500 text-center">{errors.observations.message}</span>}
              </div>
              <Divider />
              <Controller
                name="firstAppointmentDate"
                control={control}
                render={({ field }) => <DatePicker
                  {...field} onChange={(selectedDate: Date) => field.onChange(selectedDate)}
                  label="Data da primeira consulta"
                />}
              />
              {errors.firstAppointmentDate && <span className="text-xs text-red-500 text-center">{errors.firstAppointmentDate.message}</span>}

              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    label="Frequencia das consultas"
                  >
                    {frequencySelect.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.frequency && <span className="text-xs text-red-500 text-center">{errors.frequency.message}</span>}
              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onChange={(selectedOption) => field.onChange(selectedOption)}
                    label="Frequencia das consultas"
                  >
                    {frequencySelect.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
              {errors.frequency && <span className="text-xs text-red-500 text-center">{errors.frequency.message}</span>}
              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <Input
                    label="valor da consulta"
                    {...field} />
                )}
              />
              {errors.cost && <span className="text-xs text-red-500 text-center">{errors.cost.message}</span>}
              <Controller
                name="duration"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Input
                    onChange={onChange}
                    value={value.toString()}
                    fullWidth
                    label="Duracao da sessao"
                  />
                )}
              />
              {errors.duration && <span className="text-xs text-red-500 text-center">{errors.duration.message}</span>}
              <Divider />
            </ModalBody>
            {/* <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter> */}
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}

const allowOnlyNumber = (value: string) => {
  return value.replace(/[^0-9]/g, '')
}
