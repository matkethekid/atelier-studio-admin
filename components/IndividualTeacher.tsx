"use client";

import { Input } from "./ui/input";
import { useForm } from "@tanstack/react-form-nextjs";
import { X } from "lucide-react";

interface Teacher {
  id: number;
  name: string;
  image: string;
  location: string;
  languages: string[];
};

interface Props {
  teacher: Teacher
};

const IndividualTeacher = ({ teacher }: Props) => {
  const form = useForm({
    defaultValues: { name: teacher.name, image: null as File | null, location: teacher.location, languages: teacher.languages },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();

        formData.append("name", value.name);
        formData.append("location", value.location);

        value.languages.forEach((languages) => {
          formData.append("languages", languages);
        });

        if (value.image) {
          formData.append("image", value.image);
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/your-endpoint`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
      } catch (error) {
        console.error(error);
      }
    }
  });
  return (
    <div className="w-full min-h-screen flex flex-col p-15 gap-10">
      <h1 className="text-3xl lg:text-5xl">Izmeni predavača</h1>
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
                placeholder="Lokacija"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="focus-visible:ring-0"
              />
            )}
          </form.Field>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="image">Slika</label>
          <form.Field name="image">
            {(field) => (
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  field.handleChange(file);
                }}
                className="focus-visible:ring-0"
              />
            )}
          </form.Field>
        </div>
        <form.Field name="languages">
          {(field) => (
            <div className="flex flex-wrap gap-3">
              {field.state.value.map((lang, index) => (
                <div
                  key={index}
                  className="pt-2 pb-2 pl-5 pr-5 bg-zinc-200 rounded-full flex items-center gap-3"
                >
                  <span>{lang}</span>
        
                  <X
                    size={16}
                    className="cursor-pointer"
                    onClick={() => {
                      field.handleChange(
                        field.state.value.filter((_, i) => i !== index)
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </form.Field>
        <button type="submit" className="rounded-full pt-2 pb-2 pl-5 pr-5 bg-black text-white cursor-pointer w-full lg:max-w-[200px]">Promeni</button>
      </form>
    </div>
  )
}

export default IndividualTeacher;