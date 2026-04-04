import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  TabbleCellImage,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'
import { api } from '@/services/api'
import { userType } from '@/types/user'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateUser } from './dialog-update-user'
import { DialogUserDelete } from './dialog-delete-user'
import { DialogInformationUser } from './dialog-information-user'
import { DialogCreateUser } from './dialog-create-user'

export default async function ListUsers() {
  const { response } = await api<userType[]>('GET', '/users')

  if (!response) {
    return (
      <DashboardContainer className="text-destructive">
        Não foi possível obter os usuários.
      </DashboardContainer>
    )
  }

  const users: userType[] = response

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateUser>
          <Button size="sm">
            <LuPlusCircle />
            Novo usuário
          </Button>
        </DialogCreateUser>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imagem</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user: userType) => (
              <TableRow key={user.id}>
                <TableCell>
                  <TabbleCellImage src={user.image} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationUser id={user.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationUser>
                  <DialogUpdateUser id={user.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateUser>
                  <DialogUserDelete id={user.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogUserDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!users.length && (
            <TableCaption>Nenhum usuário encontrado.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}
