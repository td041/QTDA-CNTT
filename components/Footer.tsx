export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 text-sm text-gray-600 md:flex-row">
        <p>(c) {new Date().getFullYear()} FitFoodish. Healthy meals, delivered with care.</p>
        <p className="text-gray-500">
          Dự án demo phục vụ học tập. Hãy thay thế bằng dữ liệu thật trước khi đưa vào sản xuất.
        </p>
      </div>
    </footer>
  );
}
