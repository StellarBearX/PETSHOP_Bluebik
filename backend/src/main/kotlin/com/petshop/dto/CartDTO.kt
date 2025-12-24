package com.petshop.dto

import kotlinx.serialization.Serializable

@Serializable
data class CartLineDTO(
    val id: String,
    val productId: String,
    val stockId: String,
    val name: String,
    val image: String,
    val selection: Map<String, String>,
    val price: Double,
    val quantity: Int
)

@Serializable
data class CartResponse(
    val lines: List<CartLineDTO>
)

@Serializable
data class AddToCartRequest(
    val productId: String,
    val stockId: String,
    val quantity: Int = 1
)

@Serializable
data class UpdateCartItemRequest(
    val quantity: Int
)

