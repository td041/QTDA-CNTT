export default function AboutPage() {
  return (
    <div className="prose max-w-3xl py-12">
      <h1>Về FitFoodish</h1>
      <p>
        FitFoodish là dự án mẫu được xây dựng bằng Next.js 14 và Tailwind CSS, mô phỏng một thương hiệu giao đồ ăn
        lành mạnh. Mục tiêu là đem đến trải nghiệm đặt món mượt mà, thông tin dinh dưỡng rõ ràng và quy trình vận
        hành minh bạch cho cả khách hàng lẫn đội ngũ.
      </p>
      <h2>Lý do chúng tôi khác biệt</h2>
      <ul>
        <li>Thực đơn đa dạng cho nhiều chế độ ăn: Keto, Low-carb, Vegan, Balanced.</li>
        <li>Quy trình đóng gói và giao hàng khép kín, đảm bảo đúng giờ và giữ nhiệt độ.</li>
        <li>Ứng dụng web tối ưu hiệu năng, thân thiện với thiết bị di động.</li>
      </ul>
      <h2>Định hướng phát triển</h2>
      <p>
        Dự án sẵn sàng tích hợp CMS để quản lý nội dung, hệ thống thanh toán thực tế và dashboard dành cho bếp và
        shipper. Backend có thể mở rộng với Next.js API routes hoặc dịch vụ serverless bên ngoài.
      </p>
    </div>
  );
}
