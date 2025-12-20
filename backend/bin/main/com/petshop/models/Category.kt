package com.petshop.models

import java.util.*

data class Category(
    val id: UUID = UUID.randomUUID(),
    val code: String,
    val name: String,
    val iconUrl: String? = null,
    val displayOrder: Int = 0
)

