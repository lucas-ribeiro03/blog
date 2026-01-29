import { User } from "@/model/users";
import { EditProfileForm } from "./edit-profile-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type EditUserModalProps = {
  isDialogOpen: boolean;
  closeDialog: () => void;
};

export const EditUserModal = ({
  isDialogOpen,
  closeDialog,
}: EditUserModalProps) => {
  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(open) => {
        if (!open) closeDialog();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
          <DialogDescription>
            Atualizar as informações do seu usuário
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm onCloseDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
