'use client'

import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/utils/cn'

type Option = {
  value: string
  label: string
}

type ComboboxProps = {
  defaultValue: string
  onSelect: (value: string) => void
  options: Option[]
  placeholder: string
  value: string
}

function List({
  onSelect,
  options,
  placeholder,
  value,
}: {
  onSelect: (currentValue: string) => void
  options: Option[]
  placeholder: string
  value: string
}) {
  return (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem key={option.value} value={option.value} onSelect={onSelect}>
              {option.label}

              <CheckIcon
                className={cn('ml-auto', value === option.value ? 'opacity-100' : 'opacity-0')}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

export function Combobox({ defaultValue, onSelect, options, placeholder, value }: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleSelect = (currentValue: string) => {
    onSelect(currentValue === value ? '' : currentValue)
    setOpen(false)
  }

  const selectedValue = options.find((option) => option.value === value)?.label ?? defaultValue

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="w-full justify-start md:h-11 md:max-w-72" variant="secondary">
            {selectedValue}
            <ChevronsUpDownIcon
              className={cn(
                'ml-auto size-5 text-neutral-300 transition-colors',
                open && 'text-neutral-50'
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="p-0 md:max-w-72">
          <List options={options} placeholder={placeholder} value={value} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full justify-start md:h-11 md:max-w-72" variant="secondary">
          {selectedValue}
          <ChevronsUpDownIcon
            className={cn(
              'ml-auto size-5 text-neutral-300 transition-colors',
              open && 'text-neutral-50'
            )}
          />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="sr-only">Drawer</DrawerTitle>
        <div className="overflow-hidden">
          <List options={options} placeholder={placeholder} value={value} onSelect={handleSelect} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
