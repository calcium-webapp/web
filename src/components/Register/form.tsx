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

export function RegisterForm() {
  return (
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
              <Input id="name" placeholder="Name for your account" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="user@calcium.dev" type="email" />
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
  );
}
