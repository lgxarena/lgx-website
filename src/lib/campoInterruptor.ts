/**
 * Campo de sim/não do painel (Keystatic) com interruptor no lugar da caixinha de marcar. Grava
 * `true`/`false` igual ao `fields.checkbox`, então o arquivo e o site não mudam.
 */
import { Flex } from '@keystar/ui/layout'
import { Switch } from '@keystar/ui/switch'
import { Text } from '@keystar/ui/typography'
import type { BasicFormField } from '@keystatic/core'
import { createElement } from 'react'

export function interruptor({
  label,
  description,
  defaultValue = false,
}: {
  label: string
  description?: string
  defaultValue?: boolean
}): BasicFormField<boolean> {
  const lerValor = (valor: unknown) => {
    if (valor === undefined) return defaultValue
    if (typeof valor !== 'boolean') throw new Error('O valor precisa ser verdadeiro ou falso')
    return valor
  }

  return {
    kind: 'form',
    label,
    Input({ value, onChange, autoFocus }) {
      return createElement(
        Flex,
        { direction: 'column', gap: 'regular' },
        createElement(Switch, { isSelected: value, onChange, autoFocus }, label),
        description &&
          createElement(Text, { size: 'small', color: 'neutralSecondary' }, description)
      )
    },
    defaultValue: () => defaultValue,
    parse: lerValor,
    serialize: (valor) => ({ value: valor }),
    validate: (valor) => valor,
    reader: { parse: lerValor },
  }
}
