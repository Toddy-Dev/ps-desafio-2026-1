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
import { ResponseErrorType, api } from '@/services/api'
import { sportsItemType } from '@/types/sportsItem'
import { categoryType } from '@/types/category'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsSportsItemProps {
  sportsItem?: sportsItemType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsSportsItem({
  sportsItem,
  readOnly,
  error,
}: FormFieldsSportsItemProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()

  const [categories, setCategories] = useState<categoryType[]>([])

  useEffect(() => {
    async function fetchCategories() {
      const { response } = await api('GET', '/category')
      if (response) {
        setCategories(response as categoryType[])
      }
    }
    fetchCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="image">Imagem do Artigo</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            disabled={readOnly}
            className="cursor-pointer"
          />
        </FormField>

        <FormField>
          <Label htmlFor="name">Nome do Artigo</Label>
          <Input
            id="name"
            name="name"
            defaultValue={sportsItem?.name}
            readOnly={readOnly}
            required
            placeholder="Ex: Tênis Nike Air Max"
          />
        </FormField>

        <FormField>
          <Label htmlFor="brand">Marca</Label>
          <Input
            id="brand"
            name="brand"
            defaultValue={sportsItem?.brand}
            readOnly={readOnly}
            required
            placeholder="Ex: Nike, Adidas, Puma..."
          />
        </FormField>

        <FormField>
          <Label htmlFor="category_id">Categoria</Label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={sportsItem?.category_id || ""}
            disabled={readOnly}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>Selecione uma categoria...</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField>
          <Label htmlFor="price">Preço (R$)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            defaultValue={sportsItem?.price}
            readOnly={readOnly}
            required
            placeholder="Ex: 299.90"
          />
        </FormField>

        <FormField>
          <Label htmlFor="amount">Quantidade em Estoque</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            defaultValue={sportsItem?.amount}
            readOnly={readOnly}
            required
            placeholder="Ex: 50"
          />
        </FormField>

        <FormField>
          <Label htmlFor="year">Ano de Lançamento</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={sportsItem?.year}
            readOnly={readOnly}
            required
            placeholder="Ex: 2024"
          />
        </FormField>

      </FormFieldsGroup>

      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}