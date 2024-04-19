import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface JoinProps {
  name: string;
  email: string;
}

const Enter: NextPage = () => {
  const [join, { loading, error, data }] = useMutation("/api/user/join");
  const { register, handleSubmit } = useForm<JoinProps>();

  const onValid = (data: JoinProps) => {
    if (loading) return;
    join(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok && !loading) {
      alert("Account created successfully! Please log in.");
      router.push("/enter");
    }
  }, [data, router]);
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Join to Carrot</h3>
      <div className="mt-12">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mt-8 space-y-4"
        >
          <Input
            register={register("name")}
            name="name"
            label="Name"
            type="text"
            required
          />
          <Input
            register={register("email")}
            name="email"
            label="Email address"
            type="email"
            required
          />
          <Button text={"Join us"} />
        </form>
      </div>
    </div>
  );
};
export default Enter;
