package com.petshop.models

import java.util.*

data class ProductImage(
    val id: UUID = UUID.randomUUID(),
    val productId: UUID,
    val imageUrl: String,
    val displayOrder: Int = 0
)

