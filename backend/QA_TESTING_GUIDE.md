# 📋 Pet Shop API - QA Testing Guide

## 📌 สารบัญ
1. [ข้อมูลทั่วไป](#ข้อมูลทั่วไป)
2. [การตั้งค่า](#การตั้งค่า)
3. [Authentication APIs](#authentication-apis)
4. [Product APIs](#product-apis)
5. [Cart APIs](#cart-apis)
6. [Order APIs](#order-apis)
7. [Coupon APIs](#coupon-apis)
8. [Address APIs](#address-apis)
9. [Test Cases](#test-cases)
10. [Error Codes](#error-codes)

---

## 📌 ข้อมูลทั่วไป

### Base URL
```
http://localhost:8080
```

### Content-Type
```
application/json
```

### Response Format
- **Success**: HTTP 200 with JSON body
- **Error**: HTTP 4xx/5xx with error message

---

## 📌 การตั้งค่า

### 1. เริ่มต้น Server
```bash
cd backend
./gradlew run
```

### 2. ตรวจสอบ Server ทำงาน
```bash
curl http://localhost:8080/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Pet Shop API is running"
}
```

---

## 📌 Authentication APIs

### 1. สมัครสมาชิก (Register)

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0812345678"
}
```

**Response (200 OK):**
```json
{
  "token": "user-id:timestamp:hash",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0812345678",
    "profileImageUrl": null
  }
}
```

**Test Cases:**
- ✅ สมัครสมาชิกสำเร็จด้วยข้อมูลครบถ้วน
- ❌ สมัครสมาชิกด้วย email ที่มีอยู่แล้ว (ควรได้ error)
- ❌ สมัครสมาชิกโดยไม่กรอก email (ควรได้ error)
- ❌ สมัครสมาชิกโดยไม่กรอก password (ควรได้ error)

---

### 2. เข้าสู่ระบบ (Login)

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "user-id:timestamp:hash",
  "user": {
    "id": "uuid",
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0812345678",
    "profileImageUrl": null
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid email or password"
}
```

**Test Cases:**
- ✅ Login สำเร็จด้วย email และ password ที่ถูกต้อง
- ❌ Login ด้วย email ที่ไม่มีในระบบ
- ❌ Login ด้วย password ที่ผิด
- ❌ Login โดยไม่กรอก email
- ❌ Login โดยไม่กรอก password

---

## 📌 Product APIs

### 1. ดึงรายการสินค้าทั้งหมด

**Endpoint:** `GET /api/products`

**Query Parameters:**
- `page` (optional): หน้า (default: 1)
- `pageSize` (optional): จำนวนต่อหน้า (default: 50)
- `categoryId` (optional): หมวดหมู่ ID
- `q` (optional): คำค้นหา

**Example:**
```
GET /api/products?page=1&pageSize=20&categoryId=uuid&q=อาหารแมว
```

**Response (200 OK):**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "PURINA ONE เพียวริน่าวัน อาหารแมว",
      "description": "อาหารแมวคุณภาพ สำหรับแมวทุกช่วงวัย",
      "images": [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg"
      ],
      "shopName": "Purina Official",
      "dimensions": [
        {
          "key": "flavor",
          "label": "สูตร",
          "options": [
            {
              "id": "salmon",
              "label": "ปลาแซลมอน",
              "image": null
            }
          ]
        }
      ],
      "skus": [
        {
          "skuId": "p1-salmon-1kg",
          "selection": {
            "flavor": "salmon",
            "size": "1kg"
          },
          "price": 400.0,
          "stock": 25
        }
      ],
      "badges": ["สินค้าขายดี"],
      "rating": 4.8,
      "sold": 723,
      "location": "กรุงเทพมหานคร",
      "category": "uuid",
      "brand": "uuid",
      "catAge": "adult"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 20
}
```

**Test Cases:**
- ✅ ดึงรายการสินค้าทั้งหมดสำเร็จ
- ✅ ดึงรายการสินค้าพร้อม pagination
- ✅ ดึงรายการสินค้าตาม categoryId
- ✅ ค้นหาสินค้าด้วย keyword (q)
- ✅ ดึงรายการสินค้าเมื่อไม่มีข้อมูล (ควรได้ array ว่าง)

---

### 2. ดึงรายละเอียดสินค้า

**Endpoint:** `GET /api/products/{id}`

**Example:**
```
GET /api/products/uuid-here
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "PURINA ONE เพียวริน่าวัน อาหารแมว",
  "description": "อาหารแมวคุณภาพ สำหรับแมวทุกช่วงวัย",
  "images": ["https://example.com/image1.jpg"],
  "shopName": "Purina Official",
  "dimensions": [...],
  "skus": [...],
  "badges": ["สินค้าขายดี"],
  "rating": 4.8,
  "sold": 723,
  "location": "กรุงเทพมหานคร",
  "category": "uuid",
  "brand": "uuid",
  "catAge": "adult"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Product not found"
}
```

**Test Cases:**
- ✅ ดึงรายละเอียดสินค้าที่มีอยู่
- ❌ ดึงรายละเอียดสินค้าที่ไม่มีอยู่ (ควรได้ 404)
- ❌ ดึงรายละเอียดสินค้าด้วย ID ที่ไม่ถูกต้อง

---

### 3. ดึงหมวดหมู่ทั้งหมด

**Endpoint:** `GET /api/categories`

**Response (200 OK):**
```json
[
  {
    "id": "uuid",
    "code": "food",
    "name": "อาหารสัตว์",
    "iconUrl": "https://example.com/icon.png",
    "displayOrder": 0
  }
]
```

**Test Cases:**
- ✅ ดึงหมวดหมู่ทั้งหมดสำเร็จ

---

### 4. ดึงแบรนด์ทั้งหมด

**Endpoint:** `GET /api/brands`

**Response (200 OK):**
```json
[
  {
    "id": "uuid",
    "code": "regalos",
    "name": "Regalos (รีกาลอส)"
  }
]
```

**Test Cases:**
- ✅ ดึงแบรนด์ทั้งหมดสำเร็จ

---

## 📌 Cart APIs

### 1. ดูตะกร้าสินค้า

**Endpoint:** `GET /api/cart`

**Response (200 OK):**
```json
{
  "lines": [
    {
      "id": "product-id:sku-id",
      "productId": "uuid",
      "skuId": "uuid",
      "name": "PURINA ONE เพียวริน่าวัน อาหารแมว",
      "image": "https://example.com/image.jpg",
      "selection": {
        "flavor": "salmon",
        "size": "1kg"
      },
      "price": 400.0,
      "quantity": 2
    }
  ]
}
```

**Test Cases:**
- ✅ ดูตะกร้าว่าง (ควรได้ lines: [])
- ✅ ดูตะกร้าที่มีสินค้า

---

### 2. เพิ่มสินค้าลงตะกร้า

**Endpoint:** `POST /api/cart/items`

**Request Body:**
```json
{
  "productId": "uuid",
  "skuId": "uuid",
  "quantity": 1
}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Failed to add item to cart"
}
```

**Test Cases:**
- ✅ เพิ่มสินค้าลงตะกร้าสำเร็จ
- ✅ เพิ่มสินค้าที่มีอยู่แล้วในตะกร้า (ควรเพิ่ม quantity)
- ❌ เพิ่มสินค้าที่ไม่มี stock
- ❌ เพิ่มสินค้าด้วย productId ที่ไม่มีอยู่
- ❌ เพิ่มสินค้าด้วย skuId ที่ไม่มีอยู่

---

### 3. อัปเดตจำนวนสินค้าในตะกร้า

**Endpoint:** `PUT /api/cart/items/{id}`

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response (200 OK):**
```json
{
  "success": true
}
```

**Test Cases:**
- ✅ อัปเดตจำนวนสินค้าสำเร็จ
- ✅ อัปเดตจำนวนเป็น 0 (ควรลบสินค้าออกจากตะกร้า)
- ❌ อัปเดตจำนวนสินค้าที่ไม่มีในตะกร้า

---

### 4. ลบสินค้าจากตะกร้า

**Endpoint:** `DELETE /api/cart/items/{id}`

**Response (200 OK):**
```json
{
  "success": true
}
```

**Test Cases:**
- ✅ ลบสินค้าจากตะกร้าสำเร็จ
- ❌ ลบสินค้าที่ไม่มีในตะกร้า

---

### 5. ล้างตะกร้า

**Endpoint:** `DELETE /api/cart`

**Response (200 OK):**
```json
{
  "success": true
}
```

**Test Cases:**
- ✅ ล้างตะกร้าสำเร็จ

---

## 📌 Order APIs

### 1. สร้างคำสั่งซื้อ

**Endpoint:** `POST /api/orders`

**Request Body:**
```json
{
  "addressId": "uuid",
  "paymentCardId": "uuid",
  "couponId": "uuid",
  "paymentMethod": "card"
}
```

**Payment Methods:**
- `cod` - เก็บเงินปลายทาง
- `card` - บัตรเครดิต/บัตรเดบิต
- `qr` - QR พร้อมเพย์

**Response (200 OK):**
```json
{
  "id": "uuid",
  "orderNumber": "ORD-1234567890-1234",
  "status": "pending",
  "items": [
    {
      "id": "uuid",
      "productId": "uuid",
      "skuId": "uuid",
      "productName": "PURINA ONE เพียวริน่าวัน อาหารแมว",
      "variant": "flavor: salmon, size: 1kg",
      "price": 400.0,
      "quantity": 2,
      "image": "https://example.com/image.jpg"
    }
  ],
  "subtotal": 800.0,
  "productDiscount": 100.0,
  "shippingCost": 10.0,
  "shippingDiscount": 0.0,
  "total": 710.0,
  "createdAt": "2024-12-18T10:30:00"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Failed to create order"
}
```

**Test Cases:**
- ✅ สร้างคำสั่งซื้อสำเร็จ
- ✅ สร้างคำสั่งซื้อพร้อมใช้คูปอง
- ✅ สร้างคำสั่งซื้อด้วย payment method ต่างๆ (cod, card, qr)
- ❌ สร้างคำสั่งซื้อเมื่อตะกร้าว่าง
- ❌ สร้างคำสั่งซื้อด้วย addressId ที่ไม่มีอยู่
- ❌ สร้างคำสั่งซื้อด้วย couponId ที่ไม่มีอยู่

---

### 2. ดึงรายการคำสั่งซื้อ

**Endpoint:** `GET /api/orders`

**Response (200 OK):**
```json
{
  "orders": [
    {
      "id": "uuid",
      "orderNumber": "ORD-1234567890-1234",
      "status": "pending",
      "items": [...],
      "subtotal": 800.0,
      "productDiscount": 0.0,
      "shippingCost": 10.0,
      "shippingDiscount": 0.0,
      "total": 810.0,
      "createdAt": "2024-12-18T10:30:00"
    }
  ],
  "total": 1
}
```

**Test Cases:**
- ✅ ดึงรายการคำสั่งซื้อสำเร็จ
- ✅ ดึงรายการคำสั่งซื้อเมื่อไม่มีข้อมูล (ควรได้ orders: [])

---

### 3. ดึงรายละเอียดคำสั่งซื้อ

**Endpoint:** `GET /api/orders/{id}`

**Response (200 OK):**
```json
{
  "id": "uuid",
  "orderNumber": "ORD-1234567890-1234",
  "status": "pending",
  "items": [...],
  "subtotal": 800.0,
  "productDiscount": 0.0,
  "shippingCost": 10.0,
  "shippingDiscount": 0.0,
  "total": 810.0,
  "createdAt": "2024-12-18T10:30:00"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Order not found"
}
```

**Test Cases:**
- ✅ ดึงรายละเอียดคำสั่งซื้อที่สร้างเอง
- ❌ ดึงรายละเอียดคำสั่งซื้อของคนอื่น (ควรได้ 404)
- ❌ ดึงรายละเอียดคำสั่งซื้อที่ไม่มีอยู่

---

## 📌 Coupon APIs

### 1. ดึงคูปองทั้งหมด

**Endpoint:** `GET /api/coupons`

**Query Parameters:**
- `storeId` (optional): Store ID

**Example:**
```
GET /api/coupons?storeId=uuid
```

**Response (200 OK):**
```json
{
  "coupons": [
    {
      "id": "uuid",
      "code": "PETSHOP100",
      "title": "รับไปเลย!!! ส่วนลด ฿100",
      "description": "ส่วนลดสำหรับสมาชิก",
      "discountAmount": 100.0,
      "minSpend": 200.0,
      "type": "discount",
      "status": "available",
      "expiryDate": "2025-12-20",
      "conditions": [
        "ใช้ได้สำหรับสมาชิกทุกท่าน",
        "สั่งซื้อขั้นต่ำ ฿200"
      ],
      "storeId": null,
      "storeName": null,
      "storeLogo": null,
      "color": "red",
      "badgeIcon": "https://example.com/badge.png"
    }
  ]
}
```

**Coupon Types:**
- `discount` - ส่วนลดสินค้า
- `freeship` - ส่งฟรี
- `store` - คูปองร้านค้า

**Test Cases:**
- ✅ ดึงคูปองทั้งหมดสำเร็จ
- ✅ ดึงคูปองตาม storeId
- ✅ ดึงคูปองที่หมดอายุแล้ว (ควรไม่แสดง)

---

### 2. เก็บคูปอง

**Endpoint:** `POST /api/coupons/{id}/collect`

**Response (200 OK):**
```json
{
  "success": true,
  "couponId": "uuid"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Coupon already collected"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Coupon not found"
}
```

**Test Cases:**
- ✅ เก็บคูปองสำเร็จ
- ❌ เก็บคูปองที่เก็บไปแล้ว (ควรได้ error)
- ❌ เก็บคูปองที่ไม่มีอยู่

---

### 3. ดึงคูปองที่เก็บแล้ว

**Endpoint:** `GET /api/user/coupons`

**Response (200 OK):**
```json
{
  "coupons": [
    {
      "id": "uuid",
      "code": "PETSHOP100",
      "title": "รับไปเลย!!! ส่วนลด ฿100",
      "status": "collected",
      ...
    }
  ]
}
```

**Coupon Status:**
- `collected` - เก็บแล้ว
- `used` - ใช้แล้ว
- `expired` - หมดอายุ

**Test Cases:**
- ✅ ดึงคูปองที่เก็บแล้วสำเร็จ
- ✅ ดึงคูปองเมื่อยังไม่เคยเก็บ (ควรได้ coupons: [])

---

## 📌 Address APIs

### 1. ดึงที่อยู่ทั้งหมด

**Endpoint:** `GET /api/addresses`

**Response (200 OK):**
```json
[
  {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "0812345678",
    "addressTh": "123 ถนนสุขุมวิท",
    "addressEn": "123 Sukhumvit Road",
    "province": "กรุงเทพมหานคร",
    "district": "คลองตัน",
    "road": "สุขุมวิท",
    "postalCode": "10110",
    "isDefault": true
  }
]
```

**Test Cases:**
- ✅ ดึงที่อยู่ทั้งหมดสำเร็จ
- ✅ ดึงที่อยู่เมื่อยังไม่มีข้อมูล (ควรได้ [])

---

### 2. เพิ่มที่อยู่

**Endpoint:** `POST /api/addresses`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0812345678",
  "addressTh": "123 ถนนสุขุมวิท",
  "addressEn": "123 Sukhumvit Road",
  "province": "กรุงเทพมหานคร",
  "district": "คลองตัน",
  "road": "สุขุมวิท",
  "postalCode": "10110",
  "isDefault": true
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "0812345678",
  "addressTh": "123 ถนนสุขุมวิท",
  "addressEn": "123 Sukhumvit Road",
  "province": "กรุงเทพมหานคร",
  "district": "คลองตัน",
  "road": "สุขุมวิท",
  "postalCode": "10110",
  "isDefault": true
}
```

**Test Cases:**
- ✅ เพิ่มที่อยู่สำเร็จ
- ✅ เพิ่มที่อยู่และตั้งเป็น default (ควร unset ที่อยู่ default อื่นๆ)
- ❌ เพิ่มที่อยู่โดยไม่กรอก firstName (ควรได้ error)
- ❌ เพิ่มที่อยู่โดยไม่กรอก phone (ควรได้ error)

---

### 3. แก้ไขที่อยู่

**Endpoint:** `PUT /api/addresses/{id}`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "0812345678",
  "addressTh": "456 ถนนสีลม",
  "addressEn": "456 Silom Road",
  "province": "กรุงเทพมหานคร",
  "district": "สีลม",
  "road": "สีลม",
  "postalCode": "10500",
  "isDefault": false
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "firstName": "Jane",
  ...
}
```

**Test Cases:**
- ✅ แก้ไขที่อยู่สำเร็จ
- ❌ แก้ไขที่อยู่ของคนอื่น (ควรได้ error)
- ❌ แก้ไขที่อยู่ที่ไม่มีอยู่

---

### 4. ลบที่อยู่

**Endpoint:** `DELETE /api/addresses/{id}`

**Response (200 OK):**
```json
{
  "success": true
}
```

**Test Cases:**
- ✅ ลบที่อยู่สำเร็จ
- ❌ ลบที่อยู่ของคนอื่น (ควรได้ error)
- ❌ ลบที่อยู่ที่ไม่มีอยู่

---

## 📌 Test Cases Summary

### Authentication Flow
1. ✅ Register → Login → Get Profile
2. ❌ Register with existing email
3. ❌ Login with wrong password

### Product Flow
1. ✅ Get Products → Get Product Detail → Add to Cart
2. ✅ Search Products → Filter by Category
3. ✅ Get Categories → Get Brands

### Cart Flow
1. ✅ Add to Cart → Update Quantity → Remove Item
2. ✅ Add Same Item (should increase quantity)
3. ❌ Add Item with no stock

### Order Flow
1. ✅ Add to Cart → Create Order → View Orders
2. ✅ Create Order with Coupon
3. ✅ Create Order with different payment methods
4. ❌ Create Order with empty cart

### Coupon Flow
1. ✅ Get Coupons → Collect Coupon → Use in Order
2. ✅ Get Store Coupons
3. ❌ Collect Same Coupon Twice

### Address Flow
1. ✅ Add Address → Update Address → Delete Address
2. ✅ Set Default Address (should unset others)
3. ❌ Update/Delete Other User's Address

---

## 📌 Error Codes

| HTTP Status | Description | Example |
|------------|-------------|---------|
| 200 | Success | Request successful |
| 400 | Bad Request | Invalid input data |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

**Error Response Format:**
```json
{
  "error": "Error message here"
}
```

---

## 📌 Testing Tools

### 1. cURL Examples

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

**Get Products:**
```bash
curl http://localhost:8080/api/products?page=1&pageSize=10
```

**Add to Cart:**
```bash
curl -X POST http://localhost:8080/api/cart/items \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "uuid",
    "skuId": "uuid",
    "quantity": 1
  }'
```

### 2. Postman Collection

สามารถ import collection นี้ไปใช้ใน Postman:
- Base URL: `http://localhost:8080`
- Environment Variables:
  - `baseUrl`: `http://localhost:8080`
  - `token`: (เก็บ token หลัง login)

### 3. Test Scenarios

**Scenario 1: Complete Purchase Flow**
1. Register new user
2. Login
3. Browse products
4. Add products to cart
5. Add address
6. Collect coupon
7. Create order with coupon
8. View order details

**Scenario 2: Cart Management**
1. Add multiple products to cart
2. Update quantities
3. Remove items
4. Clear cart

**Scenario 3: Coupon Usage**
1. Get available coupons
2. Collect coupon
3. Add items to cart (meet min spend)
4. Create order with coupon
5. Verify discount applied

---

## 📌 Notes for Testers

1. **Authentication**: ตอนนี้ยังใช้ placeholder token ควรทดสอบ flow ครบถ้วน
2. **Database**: ต้องรัน migration script ก่อนทดสอบ
3. **User ID**: ตอนนี้ใช้ UUID.randomUUID() ควรทดสอบด้วย user ID จริง
4. **Stock Validation**: ควรทดสอบกรณีสินค้าหมด stock
5. **Coupon Validation**: ควรทดสอบ min spend และ expiry date

---

## 📌 Contact

หากพบปัญหาในการทดสอบ กรุณาติดต่อทีมพัฒนา

---

**Last Updated:** 2024-12-18
**Version:** 1.0.0

