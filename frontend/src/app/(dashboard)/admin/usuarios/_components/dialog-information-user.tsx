'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsUser from './form-fields-user'
import { userType } from '@/types/user'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'

interface DialogInformationUserProps {
  id: string
  children: React.ReactNode
  isInformation?: boolean
}

export function DialogInformationUser({
  id,
  children,
}: DialogInformationUserProps) {
  const [user, setUser] = useState<userType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<userType>('GET', `/users/${id}`)

      if (response) {
        setUser(response)
      } else {
        setUser(null)
        toast({
          title: 'Usuário não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => setUser(null)
  }, [id, open, toast])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do usuário</DialogTitle>
          <DialogDescription>
            Visualize as informações detalhadas do usuário abaixo.
          </DialogDescription>
        </DialogHeader>
        <FormFieldsUser user={user} readOnly />
      </DialogContent>
    </Dialog>
  )
}
