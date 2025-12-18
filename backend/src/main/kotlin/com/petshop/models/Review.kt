package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Review(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val productId: UUID,
    val orderId: UUID? = null,
    val rating: Int,
    val comment: String? = null,
    val imageUrls: List<String> = emptyList(),
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

