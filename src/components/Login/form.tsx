"use client";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

// Following form guide: https://ui.shadcn.com/docs/components/form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  username: z.string().min(1, { message: "Write your username." }),
  password: z.string().min(1, { message: "Write your password." }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();

  // Control buttons
  const [btnsDisabled, setBtnsDisabled] = useState<boolean>(false);
  const [googleBtnDisabled, setGoogleBtnDisabled] = useState<boolean>(false);
  const [githubBtnDisabled, setGithubBtnDisabled] = useState<boolean>(false);
  const [credBtnDisabled, setCredBtnDisabled] = useState<boolean>(false);

  // Form definition
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Prevent submit on Enter
  function handleEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }

  // Credentials submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Deactivate buttons
    setBtnsDisabled(true);
    setCredBtnDisabled(true);

    try {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
      });

      if (response?.error) {
        // Reactive buttons
        setBtnsDisabled(false);
        setCredBtnDisabled(false);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Reactive buttons
      setBtnsDisabled(false);
      setCredBtnDisabled(false);
    }
  }

  const handleSSOSignIn = async (e: React.MouseEvent, provider: string) => {
    e.preventDefault();

    // Deactivate buttons
    setBtnsDisabled(true);
    provider === "google"
      ? setGoogleBtnDisabled(true)
      : setGithubBtnDisabled(true);

    try {
      const response = await signIn(provider);

      if (response?.error) {
        // Reactive buttons
        setBtnsDisabled(false);
        provider === "google"
          ? setGoogleBtnDisabled(true)
          : setGithubBtnDisabled(true);

        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Reactive buttons
      setBtnsDisabled(false);
      provider === "google"
        ? setGoogleBtnDisabled(false)
        : setGithubBtnDisabled(false);
    }
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
            <CardTitle>Access to your account</CardTitle>
            <CardDescription>
              Select an option below to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="providers grid grid-cols-2 gap-6">
                {btnsDisabled ? (
                  googleBtnDisabled ? (
                    <Button variant="outline" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Google
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <FaGoogle className="mr-2 h-4 w-4" /> Google
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outline"
                    onClick={(e) => handleSSOSignIn(e, "google")}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" /> Google
                  </Button>
                )}
                {btnsDisabled ? (
                  githubBtnDisabled ? (
                    <Button variant="outline" disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Github
                    </Button>
                  ) : (
                    <Button variant="outline" disabled>
                      <FaGithub className="mr-2 h-4 w-4" /> Github
                    </Button>
                  )
                ) : (
                  <Button
                    variant="outline"
                    onClick={(e) => handleSSOSignIn(e, "github")}
                  >
                    <FaGithub className="mr-2 h-4 w-4" /> Github
                  </Button>
                )}
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
              <Form {...form}>
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                  onKeyDown={handleEnter}
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
                  {btnsDisabled ? (
                    credBtnDisabled ? (
                      <Button className="w-full" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Login
                      </Button>
                    ) : (
                      <Button className="w-full" disabled>
                        Login
                      </Button>
                    )
                  ) : (
                    <Button className="w-full" type="submit">
                      Login
                    </Button>
                  )}
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
