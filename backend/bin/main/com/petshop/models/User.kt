package com.petshop.models

import java.time.LocalDate
import java.time.LocalDateTime
import java.util.*

data class User(
    val id: UUID = UUID.randomUUID(),
    val email: String,
    val passwordHash: String,
    val firstName: String? = null,
    val lastName: String? = null,
    val phone: String? = null,
    val gender: String? = null,
    val birthDate: LocalDate? = null,
    val profileImageUrl: String? = null,
    val createdAt: LocalDateTime = LocalDateTime.now(),
    val updatedAt: LocalDateTime = LocalDateTime.now()
)

