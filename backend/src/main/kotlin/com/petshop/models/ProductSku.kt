package com.petshop.models

import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

data class ProductStock(
    val id: UUID = UUID.randomUUID(),
    val productId: UUID,
    val stockCode: String,
    val selection: Map<String, String>, // JSONB
    val price: BigDecimal,
    val stock: Int = 0,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

