"use client";
import Form from "@components/Book/Form";
import Validator from "validatorjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import {keys} from 'lodash'
export default function CreateBook() {
  const router = useRouter();
  const [form, setForm] = useState<any>({
    title: "",
    totalPage: "",
    rating: 1,
    publishDate: "",
  });
  const [errors, setErrors] = useState({});
  const rule = {
    title: "required",
    totalPage: "required",
    rating: "required",
    publishDate: "required",
  };
  const validator = new Validator(form, rule);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validator.fails()) {
      let message: any = validator.errors.all();
      message=keys(message).reduce((result:any,key)=>{
          result[key]=message[key][0]
          return result
      },{})
      setErrors(() => {
        return {
          ...message
        };
      });
      return;
    }

    await axios.post("/api/book", form);
    router.push("/book");
  }

  const handleChange = (e: any) => {
    let { name, value } = e.target;
    const typeNumber = ["totalPage", "rating"];
    if (typeNumber.includes(name)) value = Number(value);
    setForm((state: any) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <Form
        errors={errors}
        title="Create Book"
        value={form}
        onHandleChanged={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
