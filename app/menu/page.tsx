import Link from "next/link";
import { meals } from "@/lib/data/meals";
import MealCard from "@/components/MealCard";

const tags = [
  { key: "all", label: "Tất cả" },
  { key: "keto", label: "Keto" },
  { key: "low-carb", label: "Low-carb" },
  { key: "vegan", label: "Vegan" },
  { key: "balanced", label: "Cân bằng" },
] as const;

type TagKey = (typeof tags)[number]["key"];

export default function MenuPage({ searchParams }: { searchParams?: { tag?: TagKey } }) {
  const tag = searchParams?.tag ?? "all";
  const filtered = tag === "all" ? meals : meals.filter((meal) => meal.tag === tag);

  return (
    <div className="py-10 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold">Thực đơn FitFoodish</h1>
        <p className="text-gray-600">
          Chọn chế độ ăn bạn muốn và xem thông tin dinh dưỡng chi tiết của từng món. Đặt nhiều món cùng lúc để
          tối ưu chi phí giao hàng.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {tags.map((item) => {
          const isActive = tag === item.key;
          const href = item.key === "all" ? "/menu" : `/menu?tag=${item.key}`;
          return (
            <Link
              key={item.key}
              href={href}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                isActive ? "border-brand-600 bg-brand-600 text-white" : "hover:border-brand-200"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((meal) => (
          <MealCard key={meal.slug} meal={meal} />
        ))}
      </div>
    </div>
  );
}
