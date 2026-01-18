"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createUserSchema, CreateUserInput } from "@/validators/user.schema"
import { useCreateUser } from "@/hooks/use-users"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function Home() {
  const { mutateAsync, isPending } = useCreateUser()

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  })

  async function onSubmit(data: CreateUserInput) {
    try {
      await mutateAsync(data)
      toast.success("Usuário cadastrado com sucesso")
      form.reset()
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error)
      toast.error(error?.message || "Erro ao cadastrar usuário")
    }
  }

  return (
    <main className="bg-black flex">
      <div className="w-1/2 flex items-center justify-center p-8 h-screen">
        <img
          src="/images/KV01.jpg"
          alt="Cadastro"
          className="w-full h-96 object-cover rounded-lg"
          style={{ height: "960px", width: "676px" }}
        />
      </div>

      <div className="w-1/2 bg-black flex items-center justify-center p-8 h-screen" style={{ height: "960px" }}>
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center" >
            <img
              src="/images/Symbol.png"
              alt="Cadastro"
              className="w-full h-96 object-cover rounded-lg"
              style={{ height: "40px", width: "38px" }}
            />
            <h1 className="text-white ml-2">HyperCash</h1>
          </div>
          <h1 className="text-3xl font-bold text-white mb-8">Cadastro de Usuário</h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Nome</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite o nome" 
                        {...field} 
                        className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite o email" 
                        {...field}
                        className="bg-gray-800 text-white border-gray-700 placeholder-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={isPending} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
              >
                {isPending ? "Salvando..." : "Cadastrar"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  )
}
