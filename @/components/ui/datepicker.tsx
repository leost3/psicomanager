
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export type DatePickerProps = {
  label?: string
  onChange: (...event: any[]) => void
  initialDate?: Date,
  disabled?: boolean
}

export function DatePicker({ onChange, initialDate, disabled, label = 'Selecione uma data' }: DatePickerProps) {
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    setDate(initialDate)
  }, [date])

  function handleSelect(date?: Date) {
    setDate(date)
    onChange(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          disabled={disabled}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto bg-white p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
