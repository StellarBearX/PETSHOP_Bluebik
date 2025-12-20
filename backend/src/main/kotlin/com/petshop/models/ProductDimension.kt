package com.petshop.models

import java.util.*

data class ProductDimension(
    val id: UUID = UUID.randomUUID(),
    val productId: UUID,
    val key: String,
    val label: String,
    val displayOrder: Int = 0
)

