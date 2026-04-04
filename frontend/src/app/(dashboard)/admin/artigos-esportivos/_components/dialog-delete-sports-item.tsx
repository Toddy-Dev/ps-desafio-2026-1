'use client'

import { destroySportsItem } from '@/actions/sportsItem'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateSportsItemProps {
  id: string
  children: React.ReactNode
}

export function DialogSportsItemDelete({ id, children }: DialogCreateSportsItemProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroySportsItem(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir o artigo esportivo!',
      })
    } else {
      toast({
        title: 'Artigo esportivo deletado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão do artigo esportivo</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este artigo esportivo? Esta ação é
            irreversível e removerá permanentemente o artigo esportivo do sistema. Deseja
            continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
