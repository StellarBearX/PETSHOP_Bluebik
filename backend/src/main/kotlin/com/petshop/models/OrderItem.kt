package com.petshop.models

import java.math.BigDecimal
import java.util.*

data class OrderItem(
    val id: UUID = UUID.randomUUID(),
    val orderId: UUID,
    val productId: UUID,
    val skuId: UUID,
    val productName: String,
    val variantSelection: Map<String, String>, // JSONB
    val price: BigDecimal,
    val quantity: Int,
    val subtotal: BigDecimal
)

