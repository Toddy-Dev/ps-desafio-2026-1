"use client";

import { useEffect, useState } from "react";
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/dashboard/table'

import { categoryType } from '@/types/category'
import { Button } from '@/components/button'
import { LuInfo, LuPen, LuPlusCircle, LuTrash } from 'react-icons/lu'
import { DialogUpdateCategory } from './dialog-update-category'
import { DialogCategoryDelete } from './dialog-delete-category'
import { DialogInformationCategory } from './dialog-information-category'
import { DialogCreateCategory } from './dialog-create-category'
import { api } from '@/services/api'


export default function ListCategory() {
  const [categories, setCategories] = useState<categoryType[] | null>(null);

  useEffect(() => {
    async function getCategories() {
      try {
        const { response, error } = await api('GET', '/category')

        if (response) {
          setCategories(response as categoryType[])
        } else {
          console.error(error?.message)
          setCategories([])
        }
      } catch (err) {
        console.error("Erro inesperado:", err)
        setCategories([])
      }
    }

    getCategories()
  }, [])

  if (categories === null) {
    return (
      <DashboardContainer>
        Carregando categorias...
      </DashboardContainer>
    )
  }

  return (
    <>
      <DashboardContainer className="flex h-min justify-between space-x-0 gap-y-2.5 max-sm:flex-col">
        <DialogCreateCategory>
          <Button size="sm">
            <LuPlusCircle />
            Nova categoria
          </Button>
        </DialogCreateCategory>
      </DashboardContainer>
      <DashboardContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category: categoryType) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <DialogInformationCategory id={category.id}>
                    <Button variant="default-inverse" size="icon">
                      <LuInfo />
                    </Button>
                  </DialogInformationCategory>
                  <DialogUpdateCategory id={category.id}>
                    <Button variant="secondary-inverse" size="icon">
                      <LuPen />
                    </Button>
                  </DialogUpdateCategory>
                  <DialogCategoryDelete id={category.id}>
                    <Button variant="destructive-inverse" size="icon">
                      <LuTrash />
                    </Button>
                  </DialogCategoryDelete>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {!categories.length && (
            <TableCaption>Nenhuma categoria encontrada.</TableCaption>
          )}
        </Table>
      </DashboardContainer>
    </>
  )
}