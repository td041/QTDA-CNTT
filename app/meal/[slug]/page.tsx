import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import { getMeal, meals } from "@/lib/data/meals";

type PageParams = { slug: string };

export function generateStaticParams() {
  return meals.map((meal) => ({ slug: meal.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const meal = getMeal(params.slug);
  if (!meal) return { title: "Món ăn" };
  return {
    title: `${meal.name} | FitFoodish`,
    description: meal.desc,
  };
}

export default function MealDetailPage({ params }: { params: PageParams }) {
  const meal = getMeal(params.slug);
  if (!meal) notFound();

  const macros = [
    { label: "Calories", value: `${meal.cals} kcal` },
    { label: "Protein", value: `${meal.protein} g` },
    { label: "Carb", value: `${meal.carbs} g` },
    { label: "Fat", value: `${meal.fat} g` },
  ];

  const tagLabels: Record<"keto" | "low-carb" | "vegan" | "balanced", string> = {
    keto: "Keto",
    "low-carb": "Low-carb",
    vegan: "Vegan",
    balanced: "Cân bằng",
  };

  return (
    <article className="py-10">
      <Link href="/menu" className="text-sm font-medium text-brand-700 hover:underline">
        ← Quay lại thực đơn
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-3xl border shadow-sm">
          <Image
            src={
              meal.image ??
              "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80"
            }
            alt={meal.name}
            width={1200}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-6 lg:py-4">
          <header className="space-y-2">
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
              {tagLabels[meal.tag]}
            </span>
            <h1 className="text-3xl font-semibold">{meal.name}</h1>
            <p className="text-gray-600">{meal.desc}</p>
          </header>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:grid-cols-4">
            {macros.map((macro) => (
              <div key={macro.label} className="text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{macro.label}</p>
                <p className="mt-1 text-lg font-semibold text-brand-700">{macro.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-brand-700">
                {meal.price.toLocaleString("vi-VN")} ₫
              </span>
              <span className="text-sm text-gray-500">Đã bao gồm phí đóng gói</span>
            </div>
            <AddToCartButton meal={meal} />
          </div>

          <section className="space-y-3 rounded-2xl bg-gray-50 p-5">
            <h2 className="text-base font-semibold">Thành phần nổi bật</h2>
            <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
              <li>Nguyên liệu tươi mỗi ngày, đã kiểm tra nguồn gốc.</li>
              <li>Gia vị giảm muối, không sử dụng dầu chiên lại.</li>
              <li>Có bàn giao theo suất 5-10 phần dành cho đội nhóm văn phòng.</li>
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
