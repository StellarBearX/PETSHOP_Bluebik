"use client"
import ProfileSidebar from '@/Components/ProfileSidebar'
import styles from './page.module.css'

export default function OrdersPage() {
  const orders = [
    {
      shop: "90s.shop",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      quantity: 1,
      status: "อยู่ในระหว่างการจัดส่ง",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/791772d1f1e3670b80fe9634be235e2a38c2a773"
    },
    {
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "อยู่ในระหว่างการจัดส่ง",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6cff6e21643dde16bec0d41e0a22d4d08c451617"
    },
    {
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "สำเร็จ",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/6cff6e21643dde16bec0d41e0a22d4d08c451617"
    }
  ]

  return (
    <main className={styles.main}>
      <div className="container-responsive">
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>My Profile</h1>
          </div>

          <div className={styles.flexContainer}>
            {/* Sidebar */}
            <ProfileSidebar />

            {/* Main Content */}
            <div className={styles.mainContent}>
              <div className={styles.infoCard}>
                <h2 className={styles.sectionTitle}>การสั่งซื้อล่าสุด</h2>
                <p className={styles.sectionDescription}>
                  จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้
                </p>
              </div>

              {/* Orders List */}
              <div className={styles.orderList}>
                {orders.map((order, index) => (
                  <div key={index} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.shopInfo}>
                        <img 
                          src="https://api.builder.io/api/v1/image/assets/TEMP/c3abd80db39f1b20acb82d72dbcd93aebb3d37b5"
                          alt="Store"
                          className={styles.shopIcon}
                        />
                        <span className={styles.shopName}>{order.shop}</span>
                      </div>
                      <span className={styles.orderStatus}>{order.status}</span>
                    </div>

                    <div className={styles.orderBody}>
                      <div className={styles.productImage}>
                        <img 
                          src={order.image}
                          alt={order.name}
                          className={styles.productImageImg}
                        />
                      </div>

                      <div className={styles.productDetails}>
                        <h3 className={styles.productName}>{order.name}</h3>
                        <div className={styles.variantBadge}>
                          <span className={styles.variantText}>{order.variant}</span>
                          <img 
                            src="https://api.builder.io/api/v1/image/assets/TEMP/2927c1b01de55ac95bcf80662e9b50d6e3507b1c"
                            alt=""
                            className={styles.variantIcon}
                          />
                        </div>
                        <p className={styles.productPrice}>฿{order.price.toLocaleString()}</p>
                      </div>

                      <div className={styles.orderSummary}>
                        <p className={styles.orderTotal}>
                          {order.quantity} รายการ ฿{(order.price * order.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Successful Orders Section */}
              <div className={styles.historySection}>
                <h3 className={styles.historyTitle}>การประวัติสั่งซื้อสำเร็จ</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
