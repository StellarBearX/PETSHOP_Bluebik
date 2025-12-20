package com.petshop.models

import java.util.*

data class ProductOption(
    val id: UUID = UUID.randomUUID(),
    val dimensionId: UUID,
    val value: String,
    val label: String,
    val imageUrl: String? = null
)

