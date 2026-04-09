'use client'

import { Button } from '@/components/button'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsCategoryProps {
  category?: categoryType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsCategory({
  category,
  readOnly,
  error,
}: FormFieldsCategoryProps) {
  const { pending } = useFormStatus()

  return (
    <>
      <FormFieldsGroup>
        {category && (
          <Input defaultValue={category.id} type="text" name="id" hidden />
        )}
        <FormField>
          <Label htmlFor="name">Nome da Categoria</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Insira o nome da Categoria"
            defaultValue={category?.name}
            readOnly={readOnly}
            required
          />
        </FormField>

      </FormFieldsGroup>

      {!readOnly && (
        <DialogFooter>
          <Button type="submit" pending={pending}>
            Salvar
          </Button>
        </DialogFooter>
      )}
    </>
  )
}
