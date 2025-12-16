import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] overflow-auto">
      <div className="container-responsive py-10">
        <div className="max-w-[720px] mx-auto bg-white rounded-lg shadow p-6 md:p-8">
          <div className="text-2xl md:text-3xl font-bold">404 - ไม่พบหน้านี้</div>
          <div className="mt-2 text-sm md:text-base text-gray-600 overflow-wrap-break">
            ลิงก์ที่คุณเปิดอาจถูกย้าย ลบ หรือพิมพ์ URL ไม่ถูกต้อง
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-primary h-[45px] px-5 flex items-center justify-center text-base">
              กลับหน้าหลัก
            </Link>
            <Link
              href="/category"
              className="btn-outline-primary h-[45px] px-5 flex items-center justify-center text-base"
            >
              ดูหมวดหมู่สินค้า
            </Link>
          </div>

          <div className="mt-6 text-xs text-gray-500 overflow-wrap-break">
            หากคุณคิดว่านี่คือปัญหาจากระบบ ลองรีเฟรชหน้า หรือกลับไปยังหน้าหลักแล้วลองอีกครั้ง
          </div>
        </div>
      </div>
    </main>
  );
}
