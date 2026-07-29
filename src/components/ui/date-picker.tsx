"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import dayjs from "dayjs"
import { CalendarIcon } from "lucide-react"

interface DatePickerProps {
  value?: Date | null
  onChange?: (date: Date | null) => void
  disabled?: boolean
  placeholder?: string
}

export function DatePicker({
  value,
  onChange,
  disabled,
  placeholder = "Pilih tanggal",
}: DatePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {value ? dayjs(value).format("DD-MM-YYYY") : placeholder}
          </Button>
        }
      />
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={(date) => {
            onChange?.(date ?? null)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
