import Image from "next/image";
import { Trending } from "./interfaces";
import Link from "next/link";

async function getData() {
  const url = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      headers: {
        accept: "application/json",
        Authorization: process.env.THEMOVIEDATABASE_API as string,
      },
      next: {
        revalidate: 10,
      },
    }
  );

  return url.json();
}

export default async function Home() {
  const data: Trending = await getData();

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Top Trending Movies
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {data.results.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-white"
            >
              <Link
                className="group relative block h-48 overflow-hidden bg-gray-100 md:h-64"
                href={`/movie/${movie.id}`}
              ></Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
