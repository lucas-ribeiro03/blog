"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { ToastContainer } from "react-toastify";
import createPostAction from "@/actions/postActions/create-post-action";

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(5, "Título deve ter pelo menos 5 caracteres")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  excerpt: z
    .string()
    .min(1, "Resumo é obrigatório")
    .min(10, "Resumo deve ter pelo menos 10 caracteres")
    .max(300, "Resumo deve ter no máximo 300 caracteres"),
  content: z
    .string()
    .min(1, "Conteúdo é obrigatório")
    .min(50, "Conteúdo deve ter pelo menos 50 caracteres"),
  coverImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Imagem deve ter no máximo 5MB"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(
          file.type
        ),
      "Formato de imagem inválido. Use JPEG, PNG, GIF ou WebP"
    ),
  category: z.string().min(1, "Categoria é obrigatória"),
  coverImageUrl: z.string(),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

// Adicionar IDs únicos às categorias para uso no formulário
const categoriesWithIds = categories.map((cat) => ({
  ...cat, // Gerar ID único para cada categoria
}));

export const CreatePostForm = () => {
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const form = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      coverImageUrl: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setValue,
  } = form;

  const onSubmit = async (data: CreatePostFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("coverImageUrl", data.coverImageUrl);
    formData.append("excerpt", data.excerpt);
    formData.append("category", data.category);
    const result = await createPostAction(formData);
    console.log(result);

    // Aqui seria onde você enviaria os dados para uma API
    // Por enquanto, apenas um placeholder
    alert("Post criado com sucesso! (dados apenas logados no console)");
  };

  const handleImageChange = (file: File | null) => {
    setValue("coverImage", file as File, { shouldValidate: true });
  };

  const handleImageUrl = (url: string) => {
    setValue("coverImageUrl", url, { shouldValidate: true });
  };

  const handleImageRemove = () => {
    setCoverImageUrl("");
  };

  return (
    <>
      <ToastContainer position="top-center" pauseOnHover={false} />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título do Post</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o título do seu post"
                    {...field}
                    disabled={isSubmitting}
                    name="title"
                    aria-describedby="title-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resumo</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite um breve resumo do seu post (máx. 300 caracteres)"
                    className="min-h-[80px] resize-none"
                    {...field}
                    disabled={isSubmitting}
                    name="excerpt"
                    aria-describedby="excerpt-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                  name="category"
                >
                  <FormControl>
                    <SelectTrigger aria-describedby="category-description">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesWithIds.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImageUrl"
            render={() => (
              <FormItem>
                <FormLabel>Imagem de Capa</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={coverImageUrl}
                    onChange={handleImageChange}
                    onRemove={handleImageRemove}
                    onImageUrl={handleImageUrl}
                    maxSize={5}
                    accept="image/*"
                    aria-describedby="cover-image-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conteúdo (Markdown)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite o conteúdo do seu post em Markdown..."
                    className="min-h-[300px] resize-y font-mono text-sm"
                    {...field}
                    disabled={isSubmitting}
                    aria-describedby="content-description"
                  />
                </FormControl>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  Use Markdown para formatar seu texto. Suportado: **negrito**,
                  *itálico*, `código`, listas, links, etc.
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium"
            aria-label="Criar post"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Criando post...
              </div>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                Criar Post
              </>
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};
