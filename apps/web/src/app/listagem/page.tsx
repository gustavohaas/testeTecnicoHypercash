"use client"

import { useState } from "react"
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table"

import { useUsers, useDeleteUser } from "@/hooks/use-users"
import { User } from "@/types/user"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function Listagem() {
  const { data = [], isLoading } = useUsers()
  const { mutateAsync } = useDeleteUser()

  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "E-mail",
    },
    {
      accessorKey: "created_at",
      header: "Criado em",
      cell: ({ row }) =>
        new Date(row.original.created_at).toLocaleDateString("pt-BR"),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setSelectedUser(row.original)}
        >
          Excluir
        </Button>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

async function confirmDelete() {
  if (!selectedUser) return

  try {
    await mutateAsync(selectedUser.id)

    toast.success("Usuário excluído com sucesso")

    setSelectedUser(null)
  } catch {
    toast.error("Erro ao excluir usuário")
  }
}


  if (isLoading) {
    return <p className="p-6">Carregando usuários...</p>
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Listagem de Usuários</h1>

      <Input
        placeholder="Buscar por nome ou e-mail..."
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  Nenhum usuário encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal de confirmação */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
          </DialogHeader>

          <p>
            Tem certeza que deseja excluir{" "}
            <strong>{selectedUser?.name}</strong>?
          </p>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
