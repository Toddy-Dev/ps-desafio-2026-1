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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/select'

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
  const [categories, setCategories] = useState<categoryType[]>([])
  const [updateImage, setUpdateImage] = useState<string | undefined>(sportsItem?.image || undefined)
  const [selectedCategory, setSelectedCategory] = useState<categoryType | null>(
    sportsItem?.category ?? null
  )

  useEffect(() => {
    async function getCategories() {
      const { response, error } = await api('GET', '/category')

      if (response) {
        setCategories(response as categoryType[])
      } else {
        console.error(error?.message)
      }
    }

    getCategories()
  }, [])

  return (
    <>
      <FormFieldsGroup>
        {sportsItem && <Input defaultValue={sportsItem.id} type="text" name="id" hidden />}

        <FormField>
          <Label htmlFor="image" required={!sportsItem}>
            Imagem
          </Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            disabled={pending}
            hidden={readOnly}
            className="w-full cursor-pointer text-transparent file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            onChange={(e) => handleImageChange(e, setUpdateImage)}
          />
          <ImageForm
            className="aspect-square size-40"
            src={updateImage || sportsItem?.image}
          />
        </FormField>

        <FormField>
          <Label htmlFor="name" required={!sportsItem}>
            Nome
          </Label>
          <Input
            name="name"
            id="name"
            placeholder="Insira o nome do artigo esportivo"
            defaultValue={sportsItem?.name}
            readOnly={readOnly}
            disabled={pending}
          />
        </FormField>

        <FormField>
          <Label htmlFor="brand" required={!sportsItem}>
            Marca
          </Label>
          <Input
            name="brand"
            id="brand"
            placeholder="Insira a marca do artigo esportivo"
            defaultValue={sportsItem?.brand}
            readOnly={readOnly}
            disabled={pending}
          />
        </FormField>

        <FormField>
          <Label htmlFor="price" required={!sportsItem}>
            Preço
          </Label>
          <Input
            name="price"
            id="price"
            placeholder="Insira o preço do artigo esportivo"
            defaultValue={sportsItem?.price ? sportsItem.price.toFixed(2) : undefined} // <-- A MÁGICA AQUI
            readOnly={readOnly}
            disabled={pending}
            error={error?.errors?.price}
            type="number"
            step="0.01"
            min="0"
            inputMode="decimal"
          />
        </FormField>

        <FormField>
          <Label htmlFor="year" required={!sportsItem}>
            Ano
          </Label>
          <Input
            name="year"
            id="year"
            maxLength={4}
            placeholder="Insira o ano do artigo esportivo"
            defaultValue={sportsItem?.year}
            readOnly={readOnly}
            disabled={pending}
          />
        </FormField>

        <FormField>
          <Label htmlFor="category_id" required={!sportsItem}>
            Categoria
          </Label>
          <Input
            id="category_id"
            name="category_id"
            type="hidden"
            value={selectedCategory?.id || sportsItem?.category?.id || ""}
          />
          <Select
            value={selectedCategory?.id || sportsItem?.category?.id}
            onValueChange={(value) => setSelectedCategory(categories.find((category) => category.id == value)!)}
            disabled={pending || readOnly}
          >
            <SelectTrigger id="category_id_select" className="col-span-3">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.errors?.category_id && (
            <p className="text-destructive text-xs mt-2 col-start-2 col-end-5">
              {error.errors.category_id}
            </p>
          )}
        </FormField>

        <FormField>
          <Label htmlFor="amount" required={!sportsItem}>
            Quantidade
          </Label>
          <Input
            name="amount"
            id="amount"
            type="number"
            min={sportsItem ? "0" : "1"}
            placeholder="Insira a quantidade do artigo esportivo"
            defaultValue={sportsItem?.amount}
            readOnly={readOnly}
            disabled={pending}
            error={error?.errors?.amount}
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