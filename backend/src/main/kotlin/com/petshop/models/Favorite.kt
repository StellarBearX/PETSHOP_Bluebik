package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Favorite(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val productId: UUID,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

