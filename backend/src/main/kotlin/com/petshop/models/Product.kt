package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Product(
    val id: UUID = UUID.randomUUID(),
    val categoryId: UUID? = null,
    val brandId: UUID? = null,
    val storeId: UUID? = null,
    val name: String,
    val description: String? = null,
    val rating: Double = 0.0,
    val soldCount: Int = 0,
    val location: String? = null,
    val catAge: String? = null,
    val badges: List<String> = emptyList(),
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

