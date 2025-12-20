package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Store(
    val id: UUID = UUID.randomUUID(),
    val name: String,
    val logoUrl: String? = null,
    val type: String, // "recommended" or "mall"
    val createdAt: LocalDateTime = LocalDateTime.now()
)

