'use client';

import { useState } from 'react';

interface CartItem {
  id: string;
  shopName: string;
  productName: string;
  image: string;
  pricePerPiece: number;
  quantity: number;
  selected: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      shopName: '90s.shop',
      productName: 'Kaniva - อาหารแมว คานิว่า เกรด Premium ไทย (มีถุงแบ่ง) 7กก Urinary 8kg, แถมไม้แหย่แมว',
      image: '/api/placeholder/120/120',
      pricePerPiece: 1190,
      quantity: 1,
      selected: false,
    },
    {
      id: '2',
      shopName: 'Bite of Wild Official Shop',
      productName: 'Bite of Wild อาหารแมว 5Kg Grain Free โปรตีน 42% อาหารเม็ดผสมฟรีซดร... 5 กก. + 1 *ขนมรสปลา',
      image: '/api/placeholder/120/120',
      pricePerPiece: 1789,
      quantity: 1,
      selected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(items => items.map(item => ({ ...item, selected: newSelectAll })));
  };

  const toggleItemSelect = (id: string) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalAmount = cartItems
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.pricePerPiece * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-500 text-xl">🐱</span>
            </div>
            <span className="text-xl font-bold">Meow meow</span>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center gap-6">
            <button className="hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button className="hover:opacity-80 transition-opacity relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>
            <button className="hover:opacity-80 transition-opacity">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="ค้นหา..."
                className="bg-transparent border-none outline-none text-white placeholder-white/70 w-32"
              />
            </div>
            <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Cart Header */}
        <div className="mb-6">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mb-4 shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>รถเข็น</span>
          </button>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
            />
            <span className="text-gray-700 font-medium">ทั้งหมด</span>
          </label>
        </div>

        <hr className="mb-6" />

        {/* Column Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 mb-4 pb-2 border-b">
          <div className="col-span-5"></div>
          <div className="col-span-2 text-center text-gray-600 font-medium">ราคาต่อชิ้น</div>
          <div className="col-span-2 text-center text-gray-600 font-medium">จํานวน</div>
          <div className="col-span-3 text-center text-gray-600 font-medium">ราคารวม</div>
        </div>

        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="border-b pb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Checkbox and Shop Name */}
                <div className="flex items-start gap-3 md:col-span-5">
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => toggleItemSelect(item.id)}
                    className="w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItemSelect(item.id)}
                        className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
                      />
                      <span className="text-sm font-medium text-gray-700">{item.shopName}</span>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120"%3E%3Crect fill="%23e5e7eb" width="120" height="120"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3EImage%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 line-clamp-2">{item.productName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price Per Piece */}
                <div className="md:col-span-2 flex md:justify-center items-start md:items-center">
                  <span className="text-gray-800 font-medium">฿{item.pricePerPiece.toLocaleString()}</span>
                </div>

                {/* Quantity Selector */}
                <div className="md:col-span-2 flex md:justify-center items-center">
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-800 font-medium min-w-[3rem] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="md:col-span-3 flex md:justify-center items-center">
                  <span className="text-orange-600 font-semibold text-lg">
                    ฿{(item.pricePerPiece * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="max-w-7xl mx-auto flex justify-end items-center gap-6">
            <div className="text-right">
              <span className="text-gray-700 text-lg">ยอดรวม</span>
              <div className="text-orange-600 font-bold text-2xl">
                {totalAmount.toLocaleString()}
              </div>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-md">
              Buy Now
            </button>
          </div>
        </div>

        {/* Spacer for fixed footer */}
        <div className="h-24"></div>
      </main>
    </div>
  );
}
