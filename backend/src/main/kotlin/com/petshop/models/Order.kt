package com.petshop.models

import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

data class Order(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val addressId: UUID? = null,
    val paymentCardId: UUID? = null,
    val couponId: UUID? = null,
    val orderNumber: String,
    val status: String,
    val paymentMethod: String? = null, // "cod", "card", "qr"
    val subtotal: BigDecimal,
    val productDiscount: BigDecimal = BigDecimal.ZERO,
    val shippingCost: BigDecimal = BigDecimal.ZERO,
    val shippingDiscount: BigDecimal = BigDecimal.ZERO,
    val total: BigDecimal,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

