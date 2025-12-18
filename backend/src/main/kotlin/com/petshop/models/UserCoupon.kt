package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class UserCoupon(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val couponId: UUID,
    val status: String = "collected", // "collected", "used", "expired"
    val collectedAt: LocalDateTime = LocalDateTime.now(),
    val usedAt: LocalDateTime? = null
)

