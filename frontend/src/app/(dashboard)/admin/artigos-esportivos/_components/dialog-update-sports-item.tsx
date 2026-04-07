'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsSportsItem from './form-fields-sports-item'
import { sportsItemType } from '@/types/sportsItem'
import { api, ResponseErrorType } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { updateSportsItem } from '@/actions/sportsItem'
import { filterFormData } from '@/services/filter-form-data'

interface DialogUpdateSportsItemProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateSportsItem({
  id,
  children,
}: DialogUpdateSportsItemProps) {
  const [sportsItem, setSportsItem] = useState<sportsItemType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      if (!open) {
        setError(null)
        return
      }
      const { response, error } = await api('GET', `/articles/${id}`)

      if (response && !error) {
        setSportsItem(response as sportsItemType)
      } else {
        setSportsItem(null)
        toast({
          title: 'Artigo esportivo não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setSportsItem(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)
    const { error } = await JSON.parse(await updateSportsItem(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível atualizar o artigo esportivo!',
      })
    } else {
      toast({
        title: 'Artigo esportivo atualizado com sucesso!',
      })
      setOpen(false)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar artigo esportivo</DialogTitle>
          <DialogDescription>
            Edite as informações do artigo esportivo abaixo e clique em
            &rdquo;Salvar&rdquo; para atualizar o sistema.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsSportsItem sportsItem={sportsItem} error={error} />
        </form>
      </DialogContent>
    </Dialog>
  )
}