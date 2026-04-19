"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FormInterface {
  name: string;
  location: string;
  image: File | null;
  languages: string[];
};

const NewTeacher = () => {
  const [languageInput, setLanguageInput] = useState("");
  
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      image: null as File | null,
      languages: []
    } as FormInterface,
    onSubmit: async (value) => {
      console.log(value);
    },
  });
  
  const addLanguage = () => {
    if (!languageInput.trim()) return;
    const current = form.getFieldValue("languages") || [];
  
    form.setFieldValue("languages", [
      ...current,
      languageInput.trim(),
    ]);
  
    setLanguageInput("");
  };
  return (
    <div className="w-full min-h-screen bg-white p-5 lg:p-15 flex flex-col gap-15">
      <h1 className="text-4xl lg:text-5xl">Kreiraj novog predavača</h1>
      <form onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }} className="max-w-md flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Ime i Prezime</label>
          <form.Field name="name">
            {(field) => (
              <Input
                placeholder="Ime i Prezime"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="focus-visible:ring-0"
              />
            )}
          </form.Field>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="location">Lokacija</label>
          <form.Field name="location">
            {(field) => (
              <Input
                placeholder="Beograd, Srbija"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="focus-visible:ring-0"
              />
            )}
          </form.Field>
        </div>
        <div className="flex gap-2  flex-col">
          <label htmlFor="language">Jezik</label>
          <div className="flex gap-2">
            <Input
            name="language"
              placeholder="Jezik (npr. Engleski)"
              value={languageInput}
              onChange={(e) => setLanguageInput(e.target.value)}
            />
            <Button type="button" className="rounded-full p-3 cursor-pointer" onClick={addLanguage}>Dodaj</Button>
          </div>
        </div>
        <form.Field name="languages">
          {(field) => (
            <div className="flex flex-wrap gap-2">
              {field.state.value?.map((lang: string, index: number) => (
                <div key={`${lang}-${index}`} className="flex items-center gap-1 px-3 py-1 bg-white rounded-full text-sm" >
                  <span>{lang}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const current = field.state.value || [];
                      field.setValue(current.filter((_, i) => i !== index));
                    }}
                    className="text-red-500 hover:text-red-700 font-bold ml-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </form.Field>
        <Button type="submit" className="cursor-pointer pt-5 pb-5 max-w-45 rounded-full">Kreiraj</Button>
      </form>
    </div>
  );
};

export default NewTeacher;