package com.petshop.models

import java.util.*

data class Brand(
    val id: UUID = UUID.randomUUID(),
    val code: String,
    val name: String
)

