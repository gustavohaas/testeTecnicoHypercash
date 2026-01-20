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
  const { mutateAsync, isPending } = useDeleteUser()

  const [globalFilter, setGlobalFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <span className="text-white font-medium">{row.original.name}</span>
    },
    {
      accessorKey: "email",
      header: "E-mail",
      cell: ({ row }) => <span className="text-gray-400">{row.original.email}</span>
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ",
      cell: ({ row }) => <span className="text-gray-400">{row.original.cnpj}</span>
    },
    {
      accessorKey: "monthly_revenue",
      header: "Faturamento Médio",
      cell: ({ row }) => (
        <div className="text-center text-gray-400">
          {row.original.monthly_revenue}
        </div>
      ),
    },
    {
      accessorKey: "project_type",
      header: "Tipo de Projeto",
      cell: ({ row }) => <span className="text-gray-400">{row.original.project_type}</span>
    },
    {
      accessorKey: "whatsapp_admin",
      header: "WhatsApp Admin",
      cell: ({ row }) => <span className="text-gray-400">{row.original.whatsapp_admin}</span>
    },
    {
      accessorKey: "whatsapp_suport",
      header: "WhatsApp Suporte",
      cell: ({ row }) => <span className="text-gray-400">{row.original.whatsapp_suport}</span>
    },
    {
      accessorKey: "created_at",
      header: "Criado em",
      cell: ({ row }) => (
        <span className="text-gray-400">
          {new Date(row.original.created_at).toLocaleDateString("pt-BR")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
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
    state: { globalFilter },
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
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#121616] text-white">
        <p className="animate-pulse">Carregando usuários...</p>
      </main>
    )
  }

return (
    <main className="min-h-screen p-8 bg-[#121616]">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h1 className="text-white font-bold text-3xl">Listagem</h1>
            <h1 className="text-white font-thin text-3xl text-gray-500">Usuários</h1>
          </div>
          
          <Input
            placeholder="Buscar por nome ou e-mail..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm bg-[#27272A] border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-[#CDEA80]"
          />
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#121616] overflow-x-auto">
          <Table className="w-full">
            <TableHeader className="bg-[#27272A]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-gray-800 hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-300 font-bold uppercase text-[10px] tracking-wider py-4">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className="border-gray-800 hover:bg-[#27272A]/30 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="text-center py-10 text-gray-500">
                    Nenhum usuário encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => !isPending && setSelectedUser(null)}>
        <DialogContent className="bg-[#121616] border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-400">
            Tem certeza que deseja excluir <strong className="text-[#CDEA80]">{selectedUser?.name}</strong>?
          </p>
          <DialogFooter className="mt-6 gap-3">
            <Button variant="outline" onClick={() => setSelectedUser(null)} className="bg-transparent border-gray-700 text-white hover:bg-gray-800 rounded-full px-6">
              Cancelar
            </Button>
            <Button disabled={isPending} onClick={() => mutateAsync(selectedUser!.id).then(() => setSelectedUser(null))} style={{ backgroundColor: "#CDEA80", color: "black" }} className="hover:opacity-80 rounded-full px-6 font-bold">
              {isPending ? "Excluindo..." : "Confirmar Exclusão"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}