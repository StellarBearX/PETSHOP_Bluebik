package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class CartItem(
    val id: UUID = UUID.randomUUID(),
    val cartId: UUID,
    val productId: UUID,
    val skuId: UUID,
    val quantity: Int = 1,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

