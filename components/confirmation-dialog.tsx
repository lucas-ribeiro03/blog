import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { deletePostAction } from "@/actions/postActions/delete-post-action";

type ConfirmationDialogProps = {
  isDialogOpen: boolean;
  closeDialog: () => void;
  id: string;
};

export const ConfirmationDialog = ({
  isDialogOpen,
  closeDialog,
  id,
}: ConfirmationDialogProps) => {
  const [isPending, startTransition] = useTransition();
  console.log(id);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        console.log("oii");
        await deletePostAction(id);
        closeDialog();
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Apagar Post?</DialogTitle>
            <DialogDescription>
              Ao excluir o post todas as informações dele serão removidas
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-4 mt-5">
            <Button
              className="bg-red-500 text-amber-50 hover:bg-red-500/70 min-w-35"
              type="submit"
            >
              Apagar post
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} className="w-35">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
