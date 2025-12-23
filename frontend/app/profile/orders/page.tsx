"use client"
import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { IMAGES } from "@/lib/images";
import ProfileSidebar from '@/Components/Profile/ProfileSidebar/ProfileSidebar'
import styles from './page.module.css'

interface OrderItem {
  id?: string
  shop: string
  shopType?: string
  name: string
  variant: string
  price: number
  quantity: number
  image: string
}

interface SavedOrder {
  id: string
  items?: OrderItem[]  // New format from checkout
  shop?: string  // Old format
  name?: string  // Old format
  variant?: string  // Old format
  price?: number  // Old format
  quantity?: number  // Old format
  image?: string  // Old format
  status: 'pending' | 'shipping' | 'completed'
  orderDate?: string
  address?: any
  paymentMethod?: string
  total?: number
}

interface Order {
  id: string
  shop: string
  name: string
  variant: string
  price: number
  quantity: number
  status: 'pending' | 'shipping' | 'completed'
  image: string
  orderDate?: string
}

export default function OrdersPage() {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState<'all' | 'shipping' | 'completed'>('all')
  const [orders, setOrders] = useState<Order[]>([])

  // Convert saved order format to display format
  const convertOrder = (savedOrder: SavedOrder): Order[] => {
    // If order has items array (new format from checkout)
    if (savedOrder.items && Array.isArray(savedOrder.items) && savedOrder.items.length > 0) {
      return savedOrder.items.map((item, index) => ({
        id: `${savedOrder.id}-${index}`,
        shop: item.shop || 'Unknown Shop',
        name: item.name,
        variant: item.variant || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
        status: savedOrder.status,
        image: item.image || '',
        orderDate: savedOrder.orderDate
      }))
    }
    
    // Old format (single item order)
    if (savedOrder.price !== undefined && savedOrder.name) {
      return [{
        id: savedOrder.id,
        shop: savedOrder.shop || 'Unknown Shop',
        name: savedOrder.name,
        variant: savedOrder.variant || '',
        price: savedOrder.price,
        quantity: savedOrder.quantity || 1,
        status: savedOrder.status,
        image: savedOrder.image || '',
        orderDate: savedOrder.orderDate
      }]
    }
    
    return []
  }

  // Load orders from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('petshop_orders')
    if (saved) {
      try {
        const parsed: SavedOrder[] = JSON.parse(saved)
        // Convert all saved orders to display format
        const convertedOrders: Order[] = []
        parsed.forEach(savedOrder => {
          const converted = convertOrder(savedOrder)
          convertedOrders.push(...converted)
        })
        
        if (convertedOrders.length > 0) {
          setOrders(convertedOrders)
        } else {
          // Use default mock data if no valid orders
          setOrders(getDefaultOrders())
        }
      } catch (e) {
        console.error('Error loading orders:', e)
        // Use default mock data if error
        setOrders(getDefaultOrders())
      }
    } else {
      // Use default mock data
      setOrders(getDefaultOrders())
    }
  }, [])

  // Default mock orders
  const getDefaultOrders = (): Order[] => [
    {
      id: '1',
      shop: "90s.shop",
      name: "Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก",
      variant: "Urinary 8kg, แถมไม้แหย่แมว",
      price: 1190,
      quantity: 1,
      status: "shipping",
      image: IMAGES.products.product1,
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "shipping",
      image: IMAGES.products.product2,
      orderDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      shop: "90s.shop",
      name: "Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดราย 3 ชนิด",
      variant: "5 กก. + 1 *ขนมรสปลา",
      price: 1789,
      quantity: 1,
      status: "completed",
      image: IMAGES.products.product2,
      orderDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]

  // Filter orders by status
  const filteredOrders = useMemo(() => {
    if (filterStatus === 'all') return orders
    return orders.filter(order => order.status === filterStatus)
  }, [orders, filterStatus])

  // Get status text in Thai
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'รอการชำระเงิน',
      'shipping': 'อยู่ในระหว่างการจัดส่ง',
      'completed': 'สำเร็จ'
    }
    return statusMap[status] || status
  }

  // Handle view order details
  const handleViewDetails = (orderId: string) => {
    // Navigate to order detail page (mock)
    console.log('View order details:', orderId)
    // In real app: router.push(`/profile-orders/${orderId}`)
    alert(`ดูรายละเอียดคำสั่งซื้อ #${orderId}`)
  }

  // Handle track order
  const handleTrackOrder = (orderId: string) => {
    // Navigate to tracking page (mock)
    console.log('Track order:', orderId)
    alert(`ติดตามการจัดส่งคำสั่งซื้อ #${orderId}`)
  }

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

              {/* Filter Tabs */}
              <div style={{ 
                display: 'flex', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                borderBottom: '2px solid #e5e5e5',
                paddingBottom: '0.5rem'
              }}>
                <button
                  onClick={() => setFilterStatus('all')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: filterStatus === 'all' ? '#FF4D00' : 'transparent',
                    color: filterStatus === 'all' ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: filterStatus === 'all' ? 'bold' : 'normal'
                  }}
                >
                  ทั้งหมด ({orders.length})
                </button>
                <button
                  onClick={() => setFilterStatus('shipping')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: filterStatus === 'shipping' ? '#FF4D00' : 'transparent',
                    color: filterStatus === 'shipping' ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: filterStatus === 'shipping' ? 'bold' : 'normal'
                  }}
                >
                  กำลังจัดส่ง ({orders.filter(order => order.status === 'shipping').length})
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  style={{
                    padding: '0.5rem 1rem',
                    background: filterStatus === 'completed' ? '#FF4D00' : 'transparent',
                    color: filterStatus === 'completed' ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: filterStatus === 'completed' ? 'bold' : 'normal'
                  }}
                >
                  สำเร็จ ({orders.filter(order => order.status === 'completed').length})
                </button>
              </div>

              {/* Orders List or Empty State */}
              {filteredOrders.length === 0 ? (
                <div style={{
                  background: 'white',
                  padding: '3rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #e5e5e5'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '1rem' }}>📦</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>
                    ยังไม่มีคำสั่งซื้อ
                  </h3>
                  <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                    {filterStatus === 'all' 
                      ? 'คุณยังไม่ได้สั่งซื้อสินค้า' 
                      : filterStatus === 'shipping'
                      ? 'ไม่มีคำสั่งซื้อที่กำลังจัดส่ง'
                      : 'ไม่มีคำสั่งซื้อที่สำเร็จ'}
                  </p>
                  <button
                    onClick={() => router.push('/')}
                    style={{
                      padding: '0.75rem 2rem',
                      background: '#FF4D00',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    ไปช้อปปิ้ง
                  </button>
                </div>
              ) : (
                <div className={styles.orderList}>
                  {filteredOrders.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div className={styles.shopInfo}>
                          <img 
                            src={IMAGES.reviewIcon}
                            alt="Store"
                            className={styles.shopIcon}
                          />
                          <span className={styles.shopName}>{order.shop}</span>
                        </div>
                        <span className={`${styles.orderStatus} ${order.status === 'completed' ? styles.success : styles.shipping}`}>
                          {getStatusText(order.status)}
                        </span>
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
                              src={IMAGES.chatIcon}
                              alt=""
                              className={styles.variantIcon}
                            />
                          </div>
                          <p className={styles.productPrice}>฿{(order.price || 0).toLocaleString()}</p>
                        </div>

                        <div className={styles.orderSummary}>
                          <p className={styles.orderTotal}>
                            {order.quantity || 1} รายการ ฿{((order.price || 0) * (order.quantity || 1)).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #e5e5e5'
                      }}>
                        <button
                          onClick={() => handleViewDetails(order.id)}
                          style={{
                            flex: 1,
                            padding: '0.5rem 1rem',
                            background: 'white',
                            color: '#FF4D00',
                            border: '1px solid #FF4D00',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }}
                        >
                          ดูรายละเอียด
                        </button>
                        {order.status === 'shipping' && (
                          <button
                            onClick={() => handleTrackOrder(order.id)}
                            style={{
                              flex: 1,
                              padding: '0.5rem 1rem',
                              background: '#FF4D00',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px'
                            }}
                          >
                            ติดตามการจัดส่ง
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Successful Orders Section */}
              {orders.filter(o => o.status === 'completed').length > 0 && (
                <div className={styles.historySection}>
                  <h3 className={styles.historyTitle}>การประวัติสั่งซื้อสำเร็จ</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '0.5rem' }}>
                    คุณมีคำสั่งซื้อที่สำเร็จแล้ว {orders.filter(o => o.status === 'completed').length} รายการ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
