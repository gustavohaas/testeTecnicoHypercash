"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { createUserSchema, CreateUserInput } from "@/validators/user.schema"
import { useCreateUser } from "@/hooks/use-users"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { PasswordRequirements } from "@/components/password-requirements"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<"infoProduto" | "dropshipping" | "ecommerce">("infoProduto")
  const { mutateAsync, isPending } = useCreateUser()

  const tabs = [
    { id: "infoProduto", label: "InfoProduto" },
    { id: "dropshipping", label: "Dropshipping" },
    { id: "ecommerce", label: "E-commerce" },
  ]

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      cnpj: "",
      monthlyRevenue: "",
      whatsappAdmin: "",
      whatsappSuport: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: CreateUserInput) {
    try {
      const dataWithTab = { ...data, tipo: selectedTab }
      await mutateAsync(dataWithTab)
      toast.success("Usuário cadastrado com sucesso")
      form.reset()
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error)
      toast.error(error?.message || "Erro ao cadastrar usuário")
    }
  }

  return (
    <main className="flex items-center justify-center" style={{ backgroundColor: "#121616" }}>
      <div className="flex" style={{ width: "1440px" }}>
        <div className="w-1/2 flex items-center justify-center p-8 h-screen">
          <img
            src="/images/KV01.jpg"
            alt="Cadastro"
            className="w-full h-96 object-cover"
            style={{ height: "960px", width: "676px", borderRadius: "40px" }}
          />
        </div>

        <div className="w-1/2 flex items-center justify-center p-8 h-screen" style={{ height: "960px" }}>
          <div className="flex flex-col items-center justify-center" style={{ width:"400px" }}>
            <div className="flex items-center justify-center mb-16" >
              <img
                src="/images/Symbol.png"
                alt="Cadastro"
                className="w-full h-96 object-cover rounded-lg"
                style={{ height: "40px", width: "38px" }}
              />
              <h1 className="text-white font-bold ml-2" style={{ fontSize: "30px" }}>Hyper</h1>
              <h1 className="text-white font-thin" style={{ fontSize: "30px" }}>Cash</h1>
            </div>
            <div className="flex flex-col items-center justify-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-8" style={{ fontSize: "40px", fontWeight: 700 }}>Criar conta</h1>

              <div className="flex mb-8 w-full justify-center rounded-lg" style={{ backgroundColor: "#27272A", width: "400px", gap: "4px", height: "36px" }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id as typeof selectedTab)}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      selectedTab === tab.id
                        ? "text-black"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                    style={{
                      backgroundColor: selectedTab === tab.id ? "#CDEA80" : "#27272A",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Nome completo *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite o seu nome" 
                            {...field} 
                            className="custom-bg text-white border-gray-700 placeholder-gray-500"
                            style={{ width: "400px" }}
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
                        <FormLabel className="text-white">E-mail *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite o seu e-mail" 
                            {...field}
                            className="custom-bg text-white border-gray-700 placeholder-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">CNPJ *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Digite o seu CNPJ" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="monthlyRevenue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Faturamento médio mensal *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="R$" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name="whatsappAdmin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">WhatsApp(Admin) *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Digite o seu telefone" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="whatsappSuport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">WhatsApp(Suporte) *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Digite o seu telefone" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Senha *</FormLabel>
                            <FormControl>
                              <PasswordInput 
                                placeholder="Digite sua senha" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Confirmar Senha *</FormLabel>
                            <FormControl>
                              <PasswordInput 
                                placeholder="Digite sua senha" 
                                {...field}
                                className="custom-bg text-white border-gray-700 placeholder-gray-500"
                              />
                            </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {(form.watch("password") || form.watch("confirmPassword")) && (
                    <PasswordRequirements 
                      password={form.watch("password")}
                      confirmPassword={form.watch("confirmPassword")}
                    />
                  )}

                  <Button 
                    type="submit" 
                    disabled={isPending}
                    style={{
                      backgroundColor: "#CDEA80",
                      color: "black",
                    }}
                    className="w-full text-black font-semibold mt-4 hover:opacity-70"
                  >
                    {isPending ? "Salvando..." : "Cadastrar"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
