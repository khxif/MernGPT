"use client";

import { useAppStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Enter a proper username!",
  }),
  email: z.string().min(6, {
    message: "Enter a proper email!",
  }),
  password: z.string().min(6, {
    message: "Password should contain minimum 6 characters!",
  }),
});

export default function RegisterForm() {
  const router = useRouter();
  const setUser = useAppStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();

    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);

      if (data.username) {
        setUser({
          _id: data?._id,
          username: data?.username,
          email: data?.email,
        });
        toast.success("Sign up success!");
        router.push("/");
        router.refresh();
      } else toast.error(data.message || "Failed to authenticate");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="flex flex-col space-y-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 max-w-4xl flex flex-col items-center justify-center"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="w-80 border-gray-300 py-6"
                  />
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
                  <Input
                    type="email"
                    placeholder="johndoe@gmail.com"
                    {...field}
                    className="w-80 border-gray-300 py-6"
                  />
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
                  <Input
                    type="password"
                    placeholder="johndoe@gmail.com"
                    {...field}
                    className="w-80 border-gray-300 py-6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full py-4">
            Login
          </Button>
        </form>
      </Form>
      <span className="flex items-center space-x-1 text-sm">
        <p>Already have an account?</p>
        <Link href="/login" className="text-red-500 hover:underline">
          Login
        </Link>
      </span>
    </div>
  );
}
