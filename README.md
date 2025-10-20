# FitFoodish - demo web bán món ăn lành mạnh

FitFoodish là dự án mẫu xây dựng với Next.js 14 (App Router) + TypeScript. Mục tiêu: mô phỏng trải nghiệm đặt món dinh dưỡng, quản lý giỏ hàng, đăng nhập, thanh toán thử nghiệm và theo dõi trạng thái giao hàng.

> Đây là dự án phục vụ học tập. Tất cả nội dung, hình ảnh, thương hiệu đều do người học tự tạo và cần được thay thế bằng dữ liệu thật nếu triển khai thương mại.

## Tính năng chính
- Trang chủ, menu, chi tiết món, giới thiệu, liên hệ.
- Giỏ hàng client-side, lưu localStorage, tùy chỉnh số lượng, drawer UI.
- Đặt món demo: form thanh toán, tạo đơn hàng, tóm tắt đơn sau khi gửi.
- Đăng nhập giả lập (tên + email), lưu phiên bằng localStorage.
- Trang tài khoản với dashboard, danh sách đơn, chi tiết đơn và dòng thời gian giao hàng; có thể cập nhật trạng thái demo.

## Công nghệ
- Next.js 14 App Router + React 18
- TypeScript
- Tailwind CSS 3

## Chạy dự án
```bash
npm install
npm run dev
```

Truy cập `http://localhost:3000`.

## Build & chạy production
```bash
npm run build
npm start
```

## Gợi ý mở rộng
- Kết nối backend thật (Next.js API routes, NestJS, hoặc serverless) để xử lý đơn.
- Tích hợp cổng thanh toán (Stripe, ZaloPay...) và tính phí vận chuyển động.
- Tách dữ liệu món sang CMS (Sanity, Strapi) hoặc Google Sheets.
- Bổ sung quản trị nội bộ: dashboard cho bếp/shipper, cập nhật trạng thái theo thời gian thực.
- Hoàn thiện SEO (metadata động, OG image) và đa ngôn ngữ (vi/en).

---

Made for learning - hãy tùy biến theo nhu cầu riêng của bạn.
