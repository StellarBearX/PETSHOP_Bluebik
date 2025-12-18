package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class Address(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val firstName: String,
    val lastName: String,
    val phone: String,
    val addressTh: String,
    val addressEn: String? = null,
    val province: String? = null,
    val district: String? = null,
    val road: String? = null,
    val postalCode: String? = null,
    val isDefault: Boolean = false,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

