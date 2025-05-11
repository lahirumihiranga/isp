"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const viewCountOptions = [
  { value: "1", label: "1 view" },
  { value: "2", label: "2 views" },
  { value: "3", label: "3 views" },
  { value: "4", label: "4 views" },
  { value: "5", label: "5 views" },
  { value: "6", label: "6 views" },
  { value: "7", label: "7 views" },
  { value: "8", label: "8 views" },
  { value: "9", label: "9 views" },
  { value: "10", label: "10 views" },
]

interface ViewCountComboboxProps {
  value: string
  onChange: (value: string) => void
}

export function ViewCountCombobox({ value, onChange }: ViewCountComboboxProps) {
  const [open, setOpen] = useState(false)

  const selectedOption = viewCountOptions.find((option) => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedOption?.label || "Select maximum views"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search view count..." />
          <CommandList>
            <CommandEmpty>No view count found.</CommandEmpty>
            <CommandGroup>
              {viewCountOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}