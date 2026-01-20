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

interface ConfirmCreateAccountDialogProps {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
  productType: string
}

export function ConfirmCreateAccountDialog({
  isOpen,
  onConfirm,
  onCancel,
  isLoading,
  productType,
}: ConfirmCreateAccountDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[640px] h-[250px] flex flex-col items-center justify-center bg-[#18181B] border-[#27272A]">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <DialogTitle className="text-white text-lg" style={{ fontSize: "24px", fontWeight: "700" }}>Confirmar criação de conta</DialogTitle>
          <DialogDescription className="text-gray-400">
            Tem certeza que deseja criar uma nova conta no segmento de {productType}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-3 flex flex-col items-center justify-center">
          <Button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: "#27272A",
              color: "white",
              border: "1px solid #3f3f46",
              borderRadius: "100px",
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
              borderRadius: "100px",
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
