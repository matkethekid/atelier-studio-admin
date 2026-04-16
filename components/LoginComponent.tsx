"use client";

import { useForm } from "@tanstack/react-form-nextjs";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

const LoginComponent = () => {
  const { signIn, fetchStatus } = useSignIn();
  const [error, setError] = useState("");
  const [mfaActive, setMfaActive] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const router = useRouter();

  const finalize = async () => {
    await signIn.finalize({
      navigate: ({ session, decorateUrl }) => {
        if (session?.currentTask) return;
        const url = decorateUrl("/");
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    onSubmit: async ({ value }) => {
      try {
        const { error } = await signIn.password({
          emailAddress: value.email,
          password: value.password,
        });

        if (error) {
          setError(error.message || "Greška");
          return;
        }

        if (signIn.status === "complete") {
          await finalize();
        } else if (
          signIn.status === "needs_client_trust" ||
          signIn.status === "needs_second_factor"
        ) {
          const emailCodeFactor = signIn.supportedSecondFactors?.find(
            (f) => f.strategy === "email_code"
          );
          if (emailCodeFactor) {
            await signIn.mfa.sendEmailCode();
            setMfaActive(true);
            setError("");
          }
        } else {
          console.error("Unexpected status:", signIn.status);
        }
      } catch (err) {
        console.error(err);
        setError("Neočekivana greška");
      }
    },
  });

  const handleMFAVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn.mfa.verifyEmailCode({ code: mfaCode });

      if (signIn.status === "complete") {
        await finalize();
      } else {
        setError("Verifikacija nije uspela");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.errors?.[0]?.longMessage || "Pogrešan kod");
    }
  };
  return (
    <section>
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
            {mfaActive ? (
              <Input placeholder="Unesite verifikacioni kod" onChange={(e) => setMfaCode(e.target.value)} className="focus-visible:ring-0"/>
            ) : (
              <>
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
              </>
            )}

            {mfaActive ? (
              <Button
                type="button"
                onClick={handleMFAVerification}
                disabled={fetchStatus === "fetching"}
                className="p-3 cursor-pointer"
              >
                Potvrdi verifikaciju
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={fetchStatus === "fetching"}
                className="p-3 cursor-pointer"
              >
                Nastavi dalje
              </Button>
            )}

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