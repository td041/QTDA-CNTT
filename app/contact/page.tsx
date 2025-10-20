export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-2xl space-y-6">
        <header>
          <h1 className="text-3xl font-semibold">Liên hệ</h1>
          <p className="mt-2 text-gray-600">
            Bạn muốn hợp tác, đặt bữa theo tuần hoặc đóng góp ý kiến cho FitFoodish? Điền thông tin bên dưới,
            chúng tôi sẽ phản hồi trong 24 giờ làm việc.
          </p>
        </header>

        <form className="space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-gray-700">Họ và tên</span>
              <input className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none" />
            </label>
            <label className="space-y-1 text-sm">
              <span className="font-semibold text-gray-700">Email</span>
              <input
                type="email"
                className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
              />
            </label>
          </div>
          <label className="space-y-1 text-sm">
            <span className="font-semibold text-gray-700">Nội dung</span>
            <textarea
              rows={5}
              className="w-full rounded-xl border px-4 py-2 focus:border-brand-500 focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="rounded-xl bg-brand-600 px-5 py-2 font-semibold text-white transition hover:bg-brand-700"
          >
            Gửi tin nhắn
          </button>
        </form>
      </div>
    </div>
  );
}
