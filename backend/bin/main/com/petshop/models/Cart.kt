package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Cart(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

