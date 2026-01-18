"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/query-client"
import { Toaster } from "sonner"
import "@/styles/globals.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Oakes+Grotesk&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body {
            font-family: 'Oakes Grotesk', sans-serif;
          }
        `}</style>
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  )
}