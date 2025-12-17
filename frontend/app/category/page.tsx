"use client"
import { useState } from 'react'
import styles from './page.module.css'

export default function CategoryDetailPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 12

  const products = Array(50).fill(null).map((_, i) => ({
    id: i + 1,
    name: i % 5 === 0 ? "Pet Paradise อาหารเปียก อาหารแมว กระสอบ 2kg" : 
         i % 5 === 1 ? "Regalos รีกาลอส อาหารแมว กระสอบ 5kg" :
         i % 5 === 2 ? "Kaniva คานิว่า อาหารแมว กระสอบ 8kg" :
         i % 5 === 3 ? "FURLOVE คานิว่า เหมาะสำหรับแมวทุกวัย ถุงละ 1kg" :
         "PURINA ONE เพียวริน่าวัน อาหารแมว",
    price: 1400 + (i * 50),
    image: i % 5 === 0 ? "https://api.builder.io/api/v1/image/assets/TEMP/7ffc7c948ff8e15233c19748f8bd3ef5ed63b14d" :
           i % 5 === 1 ? "https://api.builder.io/api/v1/image/assets/TEMP/0deb6464ba5ea0356f7edd023e441c04da01c575" :
           i % 5 === 2 ? "https://api.builder.io/api/v1/image/assets/TEMP/2c07e0be7e9f34de7d3a66ec6b07c399979a3f83" :
           i % 5 === 3 ? "https://api.builder.io/api/v1/image/assets/TEMP/2f57526bb1463607ea5e05a2f0b2148164758157" :
           "https://api.builder.io/api/v1/image/assets/TEMP/aae45ac0563278956fb9e425a0a469351743b70a",
    sold: "7",
    location: "กรุงเทพมหานคร",
    isBestSeller: i % 3 === 0
  }))

  return (
    <main className={styles.main}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.breadcrumbText}>
          Home &gt; อาหารสัตว์
        </div>
      </div>

      {/* Banner */}
      <div className={styles.bannerContainer}>
        <div style={{ position: 'relative', width: '100%' }}>
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0bd2893a763071d0018d40ec3fd0ec2534c33120"
            alt="Banner"
            className={styles.bannerImage}
          />
          <div className={styles.bannerIndicators}>
            <div className={styles.indicator}></div>
            <div className={styles.indicatorActive}></div>
            <div className={styles.indicator}></div>
          </div>
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.flexContainer}>
          {/* Left Sidebar - Filters */}
          <aside className={styles.sidebar}>
            {/* Recommended for you */}
            <div style={{ marginBottom: '1rem' }}>
              <h3 className={styles.sidebarTitle}>
                Recommended for you
              </h3>
            </div>

            {/* All Categories */}
            <div className={styles.categoryBox}>
              <div className={styles.categoryTitle}>
                หมวดหมู่ทั้งหมด
              </div>
            </div>

            {/* Food Category */}
            <div className={styles.categoryActive}>
              <span className={styles.categoryActiveText}>
                อาหารสัตว์
              </span>
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/4e4fbbbebc67c8ff6c1da4e0abdfec44e01fd966"
                alt=""
                className="w-[11px] h-2"
              />
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div className={styles.categoryItem}>อาหารชนิดเนื้อสัตว์</div>
              <div className={styles.categoryItem}>อาหารชนิดปลา</div>
              <div className={styles.categoryItem}>อาหารชนิดผัก</div>
              <div className={styles.categoryItem}>อาหารชนิดเม็ด</div>
              <div className={styles.categoryItem}>เสื้อผ้าและอุปกรณ์แต่งตัว</div>
              <div className={styles.categoryItem}>อุปกรณ์สำหรับสัตว์เลี้ยง</div>
              <div className={styles.categoryItem}>อุปกรณ์ทำความสะอาดและการอาบน้ำ</div>
              <div className={styles.viewMore}>
                <span>ดูเพิ่มเติม</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                  alt=""
                  className="w-2 h-2"
                />
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Brand */}
            <div className={styles.brandHeader}>
              <span className={styles.brandHeaderText}>ยี่ห้อ</span>
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div>Regalos (รีกาลอส)</div>
              <div>FURLOVE (คานิว่า)</div>
              <div>Buzz Netura บัซซ์</div>
              <div>Oliver (โอลิเวอร์)</div>
              <div>Kin-D กินดี</div>
              <div>All well (ออลเวลล์)</div>
              <div>PURINA ONE (เพียวริน่า วัน)</div>
              <div>Kaniva (คานิว่า)</div>
              <div className={styles.viewMore}>
                <span>ดูเพิ่มเติม</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                  alt=""
                  className="w-2 h-2"
                />
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Services & Promotions */}
            <div className={styles.serviceHeader}>
              <span className={styles.serviceHeaderText}>
                บริการสินค้าและโปรโมชั่น
              </span>
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div>ส่วนลด สมาชิกใหม่</div>
              <div>ส่วนลด ส่งฟรี</div>
              <div>ลดแรง ซื้อครั้งแรก</div>
              <div>ราคาดีที่สุด</div>
              <div>จ่ายผ่านบัตร สะสมแต้ม</div>
              <div>ส่วนลด 10%/15%/20%</div>
              <div>Flash Sale</div>
            </div>

            <div className={styles.divider}></div>

            {/* Cat Age */}
            <div className={styles.serviceHeader}>
              <span style={{ fontSize: '12px', fontFamily: 'Inter', color: '#FFFCF9' }}>
                วัยของแมว
              </span>
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div>ลูกแมว (แรกเกิด - 1 ปี)</div>
              <div>แมวผู้ใหญวัยรุ่น(1 ปี - 7 ปี)</div>
              <div>แมวผู้ใหญวัยผู้ใหญ่ ( 7 ปีขึ้นไป)</div>
              <div>แมวอาวุโส (11 ปีขึ้นไป)</div>
            </div>

            <div className={styles.divider}></div>

            {/* Food Properties */}
            <div className={styles.serviceHeader}>
              <span style={{ fontSize: '12px', fontFamily: 'Inter', color: '#FFFCF9' }}>
                คุณสมบัติอาหาร
              </span>
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div>ปราศจากธัญพืช</div>
              <div>ธรรมชาติ-โปรตีน</div>
              <div>แบบผสม</div>
            </div>

            <div className={styles.divider}></div>

            {/* Search by Category */}
            <div className={styles.serviceHeader}>
              <span style={{ fontSize: '12px', fontFamily: 'Inter', color: '#FFFCF9' }}>
                ค้นหาตามหมวดหมู่
              </span>
            </div>

            <div className={styles.categoryList} style={{ marginBottom: '0.75rem' }}>
              <div>อาหารสัตว์ ( 999 พัน+)</div>
              <div>เสื้อผ้าและอุปกรณ์สำหรับสัตว์เลี้ยง (233 พัน+)</div>
              <div>อุปกรณ์ทำความสะอาดและตกแต่งขน (190 พัน+)</div>
              <div>ชามและเครื่องให้อาหาร (87 พัน+)</div>
              <div>ของเล่น (ุ65 พัน+)</div>
              <div>ปอกคอ สายจูง และสายรัด (ุ35 พัน+)</div>
              <div className={styles.viewMore}>
                <span>ดูเพิ่มเติม</span>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/17ffef7275697e6b8cdcfe5ff2ef9c738fef43ad"
                  alt=""
                  className="w-2 h-2"
                />
              </div>
            </div>

            <div className={styles.divider}></div>

            {/* Rating */}
            <div style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '12px', fontFamily: 'Inter' }}>คะแนน</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {[
                { stars: 5, label: 'ดีเยี่ยม', color: '#FF4D00' },
                { stars: 4, label: 'ดี', color: '#FF4D00' },
                { stars: 3, label: 'ปานกลาง', color: '#FF4D00' },
                { stars: 2, label: 'พอใช้', color: '#FD560B' },
                { stars: 1, label: 'ปรับปรุง', color: '#F35C05' }
              ].map((rating, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className={styles.ratingStars}>
                    {Array(rating.stars).fill(0).map((_, j) => (
                      <svg key={j} className={styles.star} viewBox="0 0 16 13" fill={rating.color}>
                        <path d="M7.6084 0L9.40451 4.83688H15.2169L10.5146 7.82624L12.3107 12.6631L7.6084 9.67376L2.90612 12.6631L4.70223 7.82624L-5.38826e-05 4.83688H5.81229L7.6084 0Z"/>
                      </svg>
                    ))}
                    {Array(5 - rating.stars).fill(0).map((_, j) => (
                      <svg key={j + rating.stars} className={styles.star} viewBox="0 0 16 13" fill={i === 3 ? "#C4C4C4" : "#D9D9D9"}>
                        <path d="M7.6084 0L9.40451 4.83688H15.2169L10.5146 7.82624L12.3107 12.6631L7.6084 9.67376L2.90612 12.6631L4.70223 7.82624L-5.38826e-05 4.83688H5.81229L7.6084 0Z"/>
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: '12px', fontFamily: 'Inter' }}>{rating.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.divider}></div>
          </aside>

          {/* Main Content */}
          <div className={styles.mainContent}>
            {/* Header */}
            <div className={styles.header}>
              <h2 className={styles.headerTitle}>สินค้า</h2>
              <div className={styles.headerInfo}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', fontFamily: 'Inter', textAlign: 'center', letterSpacing: '-0.333px' }}>
                  <span>จำนวนรายการสินค้าทั้งหมด</span>
                  <span>15000</span>
                  <span>รายการ</span>
                </div>
                <button style={{ fontSize: '10px', fontFamily: 'Inter', textAlign: 'center', letterSpacing: '-0.333px' }}>
                  ดูทั้งหมด
                </button>
              </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filterBar}>
              <div className={styles.filterGroup}>
                <select className={styles.filterSelect}>
                  <option>หมวดหมู่: แมวโต</option>
                </select>
                <select className={styles.filterSelect}>
                  <option>กรุงเทพมหานคร</option>
                </select>
                <select className={styles.filterSelect}>
                  <option>ราคา : สูงไปต่ำ</option>
                </select>
                <select className={styles.filterSelect}>
                  <option>100 - 2,000</option>
                </select>
              </div>
              <div className={styles.viewOptions}>
                <div className={styles.viewBox}></div>
                <div style={{ width: '23px', height: '19px', border: '1px solid rgba(217, 217, 217, 0.31)', boxShadow: '0 1px 3px 1px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.30)' }}></div>
                <svg className="w-5 h-6 ml-2" viewBox="0 0 20 24" fill="#FA7D27">
                  <path d="M6.86934 19.3635L8.83201 20.6666V12.0794C8.83092 11.7375 8.72871 11.4099 8.54742 11.1672L2.18837 2.60612H17.4579L11.1087 11.1672C10.9274 11.4099 10.8252 11.7375 10.8241 12.0794L10.7947 22.1521L12.7573 23.4551V12.6136L19.2145 3.90919C19.4728 3.56122 19.6204 3.09464 19.6267 2.60612V1.30306C19.6267 0.957468 19.5233 0.62603 19.3393 0.381658C19.1552 0.137287 18.9056 0 18.6453 0H0.981334C0.721068 0 0.471462 0.137287 0.287426 0.381658C0.10339 0.62603 0 0.957468 0 1.30306V2.60612C0.00627809 3.09464 0.153859 3.56122 0.41216 3.90919L6.86934 12.6136V19.3635Z"/>
                </svg>
              </div>
            </div>

            {/* Total Count */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '10px', fontFamily: 'Inter', textAlign: 'center', letterSpacing: '-0.333px' }}>จำนวนสินค้าทั้งหมด</span>
              <span style={{ fontSize: '10px', fontFamily: 'Inter', textAlign: 'center', letterSpacing: '-0.333px' }}>1000</span>
            </div>

            {/* Product Grid */}
            <div className={styles.productGrid}>
              {products.slice((currentPage - 1) * 10, currentPage * 10).map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    {product.isBestSeller && (
                      <div className={styles.bestSellerBadge}>
                        สินค้าขายดี
                      </div>
                    )}
                    <button className={styles.favoriteBtn}>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/b5b05d0b81645500870018f47552cccbfd5fcbe1"
                        alt="Favorite"
                        className="w-3 h-3"
                      />
                    </button>
                  </div>

                  <div className={styles.productInfo}>
                    <p className={styles.productName}>
                      {product.name}
                    </p>
                    
                    <div className={styles.couponBadge}>
                      <span className={styles.couponText}>
                        โค้ดส่วนลด
                      </span>
                    </div>

                    <div className={styles.priceRow}>
                      <span className={styles.price}>
                        ฿{product.price}
                      </span>
                      <img
                        src="https://api.builder.io/api/v1/image/assets/TEMP/412b6c1c5473e480deaa8942dbfbbb11f4ebdfee"
                        alt="Rating"
                        className="w-5 h-5"
                      />
                    </div>

                    <div className={styles.productDetails}>
                      <div>ยอดขาย {product.sold} ชิ้น</div>
                      <div>{product.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={styles.pagination}>
              <button className={styles.pageBtn}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/afaa7d3fcc3e8a3cda6e577d5f1ca50ebe9277f8"
                  alt=""
                  className="w-3 h-2"
                />
              </button>
              
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={styles.pageBtn}
                >
                  {page}
                </button>
              ))}

              <span className={styles.pageDots}>...</span>

              <button
                onClick={() => setCurrentPage(12)}
                className={styles.pageBtn}
              >
                12
              </button>

              <button className={styles.pageBtn}>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/abaad69eaf40adfe8ecd1ce45ecbefd5ef39ea3c"
                  alt=""
                  className="w-3 h-2"
                />
              </button>
            </div>

            <div className={styles.pageInfo}>
              <span className={styles.pageInfoCurrent}>{currentPage}</span>
              <span>/12</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
