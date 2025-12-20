package com.petshop.models

import java.time.LocalDateTime
import java.util.*

data class PaymentCard(
    val id: UUID = UUID.randomUUID(),
    val userId: UUID,
    val cardType: String,
    val lastFourDigits: String,
    val cardholderName: String,
    val expiryMonth: String,
    val expiryYear: String,
    val isDefault: Boolean = false,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

