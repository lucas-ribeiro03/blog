import { User } from "@/model/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { getUserAction } from "@/actions/userActions/getUserAction";
import { DialogClose } from "./ui/dialog";
import { Spinner } from "./ui/spinner";
import { updateUserAction } from "@/actions/userActions/updateUserAction";

type EditProfileFormProps = {
  onCloseDialog: () => void;
};

const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .min(3, "Nome precisa ter pelo menos 3 caractéres")
    .max(50, "Nome pode ter no máximo 50 caractéres"),
  lastName: z
    .string()
    .min(1, "Sobrenome é obrigatório")
    .min(3, "Sobrenome precisa ter pelo menos 3 caractéres")
    .max(50, "Sobrenome pode ter no máximo 50 caractéres"),
  username: z
    .string()
    .min(1, "Username é obrigatório")
    .min(6, "Username precisa ter no mínimo 6 caractéres")
    .max(50, "Username pode ter no máximo 50 caractéres"),
});

type UpdateUserFormData = z.infer<typeof updateProfileSchema>;
export const EditProfileForm = ({ onCloseDialog }: EditProfileFormProps) => {
  const [user, setUser] = useState<User>({} as User);
  useEffect(() => {
    const getUser = async () => {
      try {
        const userToUpdate = await getUserAction();
        if (typeof userToUpdate !== "string") return setUser(userToUpdate);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  const form = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name,
      lastName: user.lastName,
      username: user.username,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateUserFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("last_name", data.lastName);
    formData.append("username", data.username);

    await updateUserAction(formData);
    onCloseDialog();
  };

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        lastName: user.lastName || "",
        username: user.username || "",
      });
    }
  }, [user, reset]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu sobrenome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Seu username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <Spinner /> Salvando...
                </div>
              ) : (
                "Salvar"
              )}
            </Button>
            <DialogClose asChild>
              <Button variant={"secondary"} type="button">
                Cancelar
              </Button>
            </DialogClose>
          </div>
        </form>
      </Form>
    </>
  );
};
