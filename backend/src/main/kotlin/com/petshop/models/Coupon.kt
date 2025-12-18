package com.petshop.models

import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

data class Coupon(
    val id: UUID = UUID.randomUUID(),
    val storeId: UUID? = null,
    val code: String,
    val title: String,
    val description: String? = null,
    val type: String, // "discount", "freeship", "store"
    val discountAmount: BigDecimal,
    val minSpend: BigDecimal = BigDecimal.ZERO,
    val expiryDate: LocalDate,
    val conditions: List<String> = emptyList(),
    val color: String? = null,
    val badgeIconUrl: String? = null,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

