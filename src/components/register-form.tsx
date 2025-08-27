"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient, getErrorMessage } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { convertImageToBase64 } from "@/utils/convert-image-to-base64";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "O primeiro nome deve ter pelo menos 2 caracteres.",
    }),
    lastName: z
      .string()
      .min(2, {
        message: "O último nome deve ter pelo menos 2 caracteres.",
      })
      .max(100),
    email: z.email("Email inválido"),
    password: z
      .string()
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres.",
      })
      .max(100),
    confirmPassword: z
      .string()
      .min(8, {
        message: "A confirmação da senha deve ter pelo menos 8 caracteres.",
      })
      .max(100),
    image: z.instanceof(File).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      form.setValue("image", file);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let toastId: string | number | undefined;

    await authClient.signUp.email({
      name: `${values.firstName.trim()} ${values.lastName.trim()}`,
      email: values.email.trim(),
      password: values.password.trim(),
      image: values.image
        ? await convertImageToBase64(values.image)
        : undefined,
      callbackURL: "/login",
      fetchOptions: {
        onRequest: () => {
          toastId = toast.loading("Criando conta...");
        },
        onError: (ctx) => {
          if (toastId) {
            toast.dismiss(toastId);
          }

          toast.error(
            getErrorMessage(ctx.error.code, "ptBr") || ctx.error.message,
          );
        },
        onSuccess: () => {
          if (toastId) {
            toast.dismiss(toastId);
          }

          toast.success("Conta criada com sucesso!");
        },
      },
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Crie sua conta</CardTitle>
          <CardDescription>
            Digite seus dados abaixo para criar uma nova conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primeiro nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu primeiro nome"
                          {...field}
                        />
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
                      <FormLabel>Último nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu último nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Digite sua senha"
                        {...field}
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
                    <FormLabel>Confirmar Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Imagem de Perfil (opcional)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Criar conta
              </Button>
            </form>
          </Form>
          <CardFooter className="flex-col gap-2">
            <div className="mt-4 text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Faça login
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
