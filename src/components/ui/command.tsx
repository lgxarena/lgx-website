'use client'

import { type DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'
import { ComponentProps } from 'react'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/utils/cn'

function Command({ className, ...props }: ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn('flex h-full w-full flex-col bg-neutral text-neutral-50', className)}
      {...props}
    />
  )
}
Command.displayName = CommandPrimitive.displayName

function CommandDialog({ children, ...props }: DialogProps) {
  return (
    <Dialog {...props}>
      <DialogContent className="p-0 shadow-lg">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium
            [&_[cmdk-group-heading]]:text-neutral-50 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0
            [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2
            [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5"
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({ className, ...props }: ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      cmdk-input-wrapper=""
      className="order-1 mx-auto mb-2.5 flex w-[calc(100%-20px)] items-center rounded-md border border-neutral-300
        bg-neutral-900 px-3 md:order-1 md:mb-0 md:w-full md:rounded-none md:border-x-0 md:border-b
        md:border-t-0 md:border-neutral-700"
    >
      <Search className="mr-2 size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        className={cn(
          `flex h-11 w-full bg-transparent py-3 text-sm outline-none placeholder:text-neutral-300
          disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        autoFocus
        {...props}
      />
    </div>
  )
}

CommandInput.displayName = CommandPrimitive.Input.displayName

function CommandList({ className, ...props }: ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn('overflow-y-auto overflow-x-hidden md:order-2 md:max-h-[300px]', className)}
      {...props}
    />
  )
}

CommandList.displayName = CommandPrimitive.List.displayName

function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  return <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
}

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

function CommandGroup({ className, ...props }: ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        `overflow-hidden p-2.5 text-neutral-50 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
        [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium
        [&_[cmdk-group-heading]]:text-neutral-50`,
        className
      )}
      {...props}
    />
  )
}

CommandGroup.displayName = CommandPrimitive.Group.displayName

function CommandSeparator({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator className={cn('-mx-1 h-px bg-neutral-300', className)} {...props} />
  )
}
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

function CommandItem({ className, ...props }: ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        `relative flex h-10 cursor-pointer select-none items-center gap-2 rounded-md px-4 py-1.5 text-sm
        outline-none data-[disabled=true]:pointer-events-none data-[selected='true']:bg-neutral-900/90
        data-[selected=true]:text-neutral-50 data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none
        [&_svg]:size-4 [&_svg]:shrink-0`,
        className
      )}
      {...props}
    />
  )
}

CommandItem.displayName = CommandPrimitive.Item.displayName

function CommandShortcut({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span className={cn('ml-auto text-xs tracking-widest text-neutral-50', className)} {...props} />
  )
}
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
