import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.title}>404 - ไม่พบหน้านี้</div>
          <div className={styles.description}>
            ลิงก์ที่คุณเปิดอาจถูกย้าย ลบ หรือพิมพ์ URL ไม่ถูกต้อง
          </div>

          <div className={styles.buttonGroup}>
            <Link href="/" className={styles.primaryButton}>
              กลับหน้าหลัก
            </Link>
            <Link href="/category" className={styles.secondaryButton}>
              ดูหมวดหมู่สินค้า
            </Link>
          </div>

          <div className={styles.footer}>
            หากคุณคิดว่านี่คือปัญหาจากระบบ ลองรีเฟรชหน้า หรือกลับไปยังหน้าหลักแล้วลองอีกครั้ง
          </div>
        </div>
      </div>
    </main>
  );
}
