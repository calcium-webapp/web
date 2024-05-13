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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

export function RegisterForm() {
  const handleSignIn = (e: React.MouseEvent, provider: string) => {
    e.preventDefault();
    signIn("google");
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
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="providers grid grid-cols-2 gap-6">
                  <Button
                    variant="outline"
                    onClick={(e) => handleSignIn(e, "google")}
                  >
                    <FaGoogle className="mr-2 h-4 w-4" /> Google
                  </Button>
                  <Button variant="outline">
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
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Username</Label>
                  <Input id="name" placeholder="" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="user@calcium.dev"
                    type="email"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="">
            <Button className="w-full">Register</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
