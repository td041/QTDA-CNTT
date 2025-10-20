import Image from "next/image";
import Link from "next/link";
import type { Meal } from "@/lib/data/meals";
import AddToCartButton from "./buttons/AddToCartButton";

const tagLabels: Record<Meal["tag"], string> = {
  keto: "Keto",
  "low-carb": "Low-carb",
  vegan: "Vegan",
  balanced: "Cân bằng",
};

export default function MealCard({ meal }: { meal: Meal }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-44 w-full">
        <Image
          src={
            meal.image ??
            "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80"
          }
          alt={meal.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{meal.name}</h3>
          <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-semibold uppercase text-brand-700">
            {tagLabels[meal.tag]}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-600">{meal.desc}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-brand-700">
            {meal.price.toLocaleString("vi-VN")} ₫
          </span>
          <div className="flex items-center gap-3 text-sm">
            <Link href={`/meal/${meal.slug}`} className="font-semibold text-gray-700 hover:text-brand-700">
              Chi tiết
            </Link>
            <AddToCartButton meal={meal} />
          </div>
        </div>
      </div>
    </article>
  );
}
