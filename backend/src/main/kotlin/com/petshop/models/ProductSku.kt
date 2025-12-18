package com.petshop.models

import kotlinx.serialization.Serializable
import java.math.BigDecimal
import java.time.LocalDateTime
import java.util.*

@Serializable
data class ProductSku(
    val id: UUID = UUID.randomUUID(),
    val productId: UUID,
    val skuCode: String,
    val selection: Map<String, String>, // JSONB
    val price: BigDecimal,
    val stock: Int = 0,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

