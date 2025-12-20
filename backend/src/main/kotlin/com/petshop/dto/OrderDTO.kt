package com.petshop.dto

import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class CreateOrderRequest(
    val addressId: String,
    val paymentCardId: String? = null,
    val couponId: String? = null,
    val paymentMethod: String // "cod", "card", "qr"
)

@Serializable
data class OrderItemDTO(
    val id: String,
    val productId: String,
    val skuId: String,
    val productName: String,
    val variant: String,
    val price: Double,
    val quantity: Int,
    val image: String? = null
)

@Serializable
data class OrderResponse(
    val id: String,
    val orderNumber: String,
    val status: String,
    val items: List<OrderItemDTO>,
    val subtotal: Double,
    val productDiscount: Double,
    val shippingCost: Double,
    val shippingDiscount: Double,
    val total: Double,
    val createdAt: String
)

@Serializable
data class OrderListResponse(
    val orders: List<OrderResponse>,
    val total: Int
)

