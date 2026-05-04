"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAuthentication from "../app/stores/auth";
import useUser from "@/app/stores/user";

const LoginComponent = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { updateAccessToken, setExpiresAt } = useAuthentication();
  const { setEmail } = useUser();

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: value.email,
            password: value.password
          })
        });
        const data = await res.json();
        updateAccessToken(data.accessToken);
        setExpiresAt(data.expiresAt);
        setEmail(value.email);
        toast.success("Uspešan login");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Neočekivana greška");
      }
    },
  });
  return (
    <section>
      <Toaster />
      <Card className="p-7">
        <CardHeader>
          <CardTitle>Uloguj se na svoj nalog</CardTitle>
          <CardDescription>Unesi email i lozinku da nastaviš</CardDescription>
        </CardHeader>
        <div className="w-full h-full mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="flex flex-col gap-6"
          >
            <form.Field name="email">
              {(field) => (
                <Input
                  placeholder="Email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="focus-visible:ring-0"
                />
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <Input
                  type="password"
                  placeholder="Lozinka"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="focus-visible:ring-0"
                />
              )}
            </form.Field>
            <Button type="submit" className="p-3 cursor-pointer" >
              Nastavi dalje
            </Button>
            {error && (
              <p className="bg-red-200 pt-3 pb-3 pl-2 pr-2 rounded-md">{error}</p>
            )}
          </form>
        </div>
      </Card>
    </section>
  );
};

export default LoginComponent;