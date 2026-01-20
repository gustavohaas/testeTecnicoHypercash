import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface CreateAccountSuccessDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
  productType: string
}

export function CreateAccountSuccessDialog({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
  productType,
}: CreateAccountSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[640px] h-[250px] flex flex-col items-center justify-center bg-[#18181B] border-[#27272A]">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <DialogTitle className="text-white text-lg">Conta criada com sucesso!</DialogTitle>
          <DialogDescription className="text-gray-400">
            Sua conta no segmento {productType} foi criada com sucesso.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 flex flex-col items-center justify-center">
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
