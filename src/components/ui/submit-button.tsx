import { Loader2Icon } from 'lucide-react'
import { ComponentProps } from 'react'

import { Button } from './button'

type SubmitButtonProps = Omit<ComponentProps<typeof Button>, 'type'> & {
  isLoading?: boolean
}

export function SubmitButton({
  children,
  disabled,
  isLoading = false,
  ...props
}: SubmitButtonProps) {
  return (
    <Button disabled={isLoading || disabled} type="submit" {...props}>
      {isLoading && <Loader2Icon className="animate-spin duration-700" />}
      {!isLoading && children}
    </Button>
  )
}
