"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

// Following form guide: https://ui.shadcn.com/docs/components/form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." })
    .max(20, { message: "Username must be at most 20 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(12, { message: "Password must be at most 12 characters." }),
});

export function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Credentials submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Register successful.",
          description: "Proceding to login page...",
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Sign in with SSO options (google, github)
  const handleSSOSignIn = (e: React.MouseEvent, provider: string) => {
    e.preventDefault();
    signIn(provider);
  };

  return (
    <div className="grid h-screen place-items-center">
      <motion.div
        className="box"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 200,
            restDelta: 0.001,
          },
        }}
      >
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Select an option below to create your account
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="providers grid grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    onClick={(e) => handleSSOSignIn(e, "google")}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" /> Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={(e) => handleSSOSignIn(e, "github")}
                  >
                    <FaGithub className="mr-2 h-4 w-4" /> Github
                  </Button>
                </div>
                {/* outline */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                {/* end outline */}
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} type="password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">
                    Register
                  </Button>
                </form>
              </div>
            </CardContent>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}
