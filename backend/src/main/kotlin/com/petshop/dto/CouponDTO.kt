package com.petshop.dto

import kotlinx.serialization.Serializable

@Serializable
data class CouponResponse(
    val id: String,
    val code: String,
    val title: String,
    val description: String?,
    val discountAmount: Double,
    val minSpend: Double,
    val type: String,
    val status: String,
    val expiryDate: String,
    val conditions: List<String>,
    val storeId: String? = null,
    val storeName: String? = null,
    val storeLogo: String? = null,
    val color: String? = null,
    val badgeIcon: String? = null
)

@Serializable
data class CouponListResponse(
    val coupons: List<CouponResponse>
)

