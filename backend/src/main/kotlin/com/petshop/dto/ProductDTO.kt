package com.petshop.dto

import kotlinx.serialization.Serializable
import java.math.BigDecimal
import java.util.*

@Serializable
data class ProductResponse(
    val id: String,
    val name: String,
    val description: String?,
    val images: List<String>,
    val shopName: String?,
    val dimensions: List<ProductDimensionDTO>,
    val stocks: List<ProductStockDTO>,
    val badges: List<String>,
    val rating: Double?,
    val sold: Int?,
    val location: String?,
    val category: String?,
    val brand: String?,
    val catAge: String?
)

@Serializable
data class ProductDimensionDTO(
    val key: String,
    val label: String,
    val options: List<ProductOptionDTO>
)

@Serializable
data class ProductOptionDTO(
    val id: String,
    val label: String,
    val image: String? = null
)

@Serializable
data class ProductStockDTO(
    val stockId: String,
    val selection: Map<String, String>,
    val price: Double,
    val stock: Int
)

@Serializable
data class ProductListResponse(
    val products: List<ProductResponse>,
    val total: Int,
    val page: Int,
    val pageSize: Int
)

