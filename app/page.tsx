import Link from "next/link";
import MealCard from "@/components/MealCard";
import { meals } from "@/lib/data/meals";

const featuredMeals = meals.slice(0, 3);

export default function HomePage() {
  return (
    <div className="space-y-16 pb-12">
      <section className="mt-8 rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 text-white px-6 py-12 md:px-12">
        <div className="max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            Giao trong 60 phút tại TP.HCM
          </span>
          <h1 className="text-3xl font-bold md:text-5xl">
            Ăn ngon chuẩn sạch, sống khỏe mỗi ngày cùng FitFoodish.
          </h1>
          <p className="text-lg text-white/80">
            Thực đơn dinh dưỡng được thiết kế bởi chuyên gia, phù hợp mục tiêu cân nặng và lịch bận rộn. Đặt
            món nhanh và nhận ngay trong ngày.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/menu"
              className="rounded-xl bg-white px-5 py-2 font-semibold text-brand-700 transition hover:bg-emerald-50"
            >
              Xem menu hôm nay
            </Link>
            <Link
              href="/about"
              className="rounded-xl border border-white/40 px-5 py-2 font-semibold text-white transition hover:border-white/80"
            >
              Lý do chọn FitFoodish
            </Link>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl font-semibold">Món nổi bật trong tuần</h2>
          <Link href="/menu" className="text-sm font-semibold text-brand-700 hover:underline">
            Xem toàn bộ thực đơn
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredMeals.map((meal) => (
            <MealCard key={meal.slug} meal={meal} />
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-3 md:p-10">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Chế độ ăn linh hoạt</h3>
          <p className="text-sm text-gray-600">
            Lựa chọn Keto, Low-carb, Vegan hoặc Balanced tùy mục tiêu. Thay đổi khẩu phần mỗi ngày khi cần.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Dinh dưỡng minh bạch</h3>
          <p className="text-sm text-gray-600">
            Mỗi món hiển thị chi tiết calories, protein, carb và fat. Dữ liệu được cập nhật bởi chuyên gia nội bộ.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Giao hàng đúng giờ</h3>
          <p className="text-sm text-gray-600">
            Đội ngũ giao hàng riêng đảm bảo món ăn đến tay bạn luôn tươi ngon và an toàn thực phẩm.
          </p>
        </div>
      </section>
    </div>
  );
}
