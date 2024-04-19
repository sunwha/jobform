import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EnterProps {
  email?: string;
  phone?: string;
}

const Enter: NextPage = () => {
  const [login, { loading, error, data }] = useMutation("/api/user/login");
  const { register, reset, handleSubmit } = useForm<EnterProps>();
  const onValid = (data: EnterProps) => {
    if (loading) return;
    login(data);
  };

  const router = useRouter();
  useEffect(() => {
    if (data?.ok && !loading) {
      alert("Login successfully!");
      router.push("/home");
    }
    if (data?.ok === false) {
      alert("Check your email address");
    }
  }, [data, loading]);
  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium">Enter using:</h5>
          <div className="grid  border-b  w-full mt-8 grid-cols-1 ">
            <h6
              className={cls(
                "pb-4 font-medium text-sm border-b-2 border-orange-500 text-orange-400 text-center"
              )}
            >
              Email
            </h6>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mt-8 space-y-4"
        >
          <Input
            register={register("email")}
            name="email"
            label="Email address"
            type="email"
            required
          />
          <Button text={"Login"} />
        </form>
      </div>
    </div>
  );
};
export default Enter;
