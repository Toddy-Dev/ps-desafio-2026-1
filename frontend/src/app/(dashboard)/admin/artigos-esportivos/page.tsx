import {
  DashboardHeader,
  DashboardHeaderDescription,
  DashboardHeaderTitle,
  DashboardMain,
} from '@/components/dashboard/dashboard-items'
import { MdOutlineSportsHandball } from "react-icons/md";
import ListSportsItems from './_components/list-sports-items';
import { Suspense } from 'react'

export default async function Page() {
  return (
    <>
      <DashboardHeader>
        <DashboardHeaderTitle>
        <MdOutlineSportsHandball />
          Artigos Esportivos
        </DashboardHeaderTitle>
        <DashboardHeaderDescription>
          Cadastre, edite, visualize e exclua artigos esportivos.
        </DashboardHeaderDescription>
      </DashboardHeader>
      <DashboardMain>
        <Suspense>
          <ListSportsItems />
        </Suspense>
      </DashboardMain>
    </>
  )
}
