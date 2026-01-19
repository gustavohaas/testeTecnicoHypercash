import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmCreateAccountDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export function ConfirmCreateAccountDialog({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmCreateAccountDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]" style={{ backgroundColor: "#1a1a1a", borderColor: "#27272A" }}>
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Confirmar criação de conta</DialogTitle>
          <DialogDescription className="text-gray-400">
            Você tem certeza que deseja criar sua conta? Verifique se todos os dados estão corretos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: "#27272A",
              color: "white",
              border: "1px solid #3f3f46",
            }}
            className="hover:bg-gray-700"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              backgroundColor: "#CDEA80",
              color: "black",
            }}
            className="font-semibold hover:opacity-90"
          >
            {isLoading ? "Criando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
