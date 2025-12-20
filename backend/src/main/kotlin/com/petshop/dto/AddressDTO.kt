package com.petshop.dto

import kotlinx.serialization.Serializable

@Serializable
data class AddressRequest(
    val firstName: String,
    val lastName: String,
    val phone: String,
    val addressTh: String,
    val addressEn: String? = null,
    val province: String? = null,
    val district: String? = null,
    val road: String? = null,
    val postalCode: String? = null,
    val isDefault: Boolean = false
)

@Serializable
data class AddressResponse(
    val id: String,
    val firstName: String,
    val lastName: String,
    val phone: String,
    val addressTh: String,
    val addressEn: String?,
    val province: String?,
    val district: String?,
    val road: String?,
    val postalCode: String?,
    val isDefault: Boolean
)

