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

export function LoginForm() {
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
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="providers grid grid-cols-2 gap-6">
                  <Button variant="outline">
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
                  <Input id="name" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="">
            <Button className="w-full">Login</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
