import { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const LikeDogs: NextPage = () => {
  const [newDog, setNewDog] = useState("");
  const [isLike, setIsLike] = useState(false);
  const { data, error, mutate } = useSWR(
    "https://dogs-api.nomadcoders.workers.dev",
    fetcher
  );
  useEffect(() => {
    console.log(data);
    if (data) {
      setNewDog(data.url);
      setIsLike(data.isLiked);
    }
  }, [data]);
  return (
    <div className="flex h-screen items-center justify-center py-5">
      {!data ? (
        <div className="text-5xl font-bold">Loading...</div>
      ) : (
        <section className="p-5 bg-yellow-200 rounded-2xl shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <h1 className="pb-5 text-3xl font-bold">Woof.tv</h1>
          <div>
            <div>
              <video controls width="400" src={newDog} autoPlay />
            </div>
            <div className="pt-5 flex col gap-2">
              <button
                className="bg-white flex-1 font-bold py-2 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                onClick={() => {
                  mutate({ ...data }, { optimisticData: true });
                }}
              >
                New Dog!
              </button>
              <button
                className="bg-pink-200 flex-1 font-bold py-2 rounded-lg shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
                onClick={() =>
                  mutate(
                    { ...data, isLiked: !isLike },
                    {
                      revalidate: false,
                      optimisticData: false,
                      populateCache: true,
                    }
                  )
                }
              >
                {!isLike ? "Like" : "UnLike"}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default LikeDogs;
