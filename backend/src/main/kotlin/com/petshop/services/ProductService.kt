package com.petshop.services

import com.petshop.dao.*
import com.petshop.dto.*
import java.math.BigDecimal
import java.util.*

object ProductService {
    
    fun getProducts(page: Int = 1, pageSize: Int = 50, categoryId: String? = null): ProductListResponse {
        val offset = (page - 1) * pageSize
        val categoryUuid = categoryId?.let { UUID.fromString(it) }
        
        val products = if (categoryUuid != null) {
            ProductDAO.getAllProducts(pageSize, offset, categoryUuid)
        } else {
            ProductDAO.getAllProducts(pageSize, offset)
        }
        
        val productResponses = products.map { product ->
            convertToProductResponse(product)
        }
        
        return ProductListResponse(
            products = productResponses,
            total = productResponses.size,
            page = page,
            pageSize = pageSize
        )
    }
    
    fun getProductById(id: String): ProductResponse? {
        val product = ProductDAO.getProductById(UUID.fromString(id)) ?: return null
        return convertToProductResponse(product)
    }
    
    fun searchProducts(query: String, page: Int = 1, pageSize: Int = 50): ProductListResponse {
        val offset = (page - 1) * pageSize
        val products = ProductDAO.searchProducts(query, pageSize, offset)
        
        val productResponses = products.map { product ->
            convertToProductResponse(product)
        }
        
        return ProductListResponse(
            products = productResponses,
            total = productResponses.size,
            page = page,
            pageSize = pageSize
        )
    }
    
    private fun convertToProductResponse(product: com.petshop.models.Product): ProductResponse {
        val images = ProductDAO.getProductImages(product.id).map { it.imageUrl }
        val dimensions = ProductDAO.getProductDimensions(product.id).map { dimension ->
            val options = ProductDAO.getProductOptions(dimension.id).map { option ->
                ProductOptionDTO(
                    id = option.value,
                    label = option.label,
                    image = option.imageUrl
                )
            }
            ProductDimensionDTO(
                key = dimension.key,
                label = dimension.label,
                options = options
            )
        }
        val skus = ProductDAO.getProductSkus(product.id).map { sku ->
            ProductSkuDTO(
                skuId = sku.skuCode,
                selection = sku.selection,
                price = sku.price.toDouble(),
                stock = sku.stock
            )
        }
        val store = product.storeId?.let { ProductDAO.getStoreById(it) }
        
        return ProductResponse(
            id = product.id.toString(),
            name = product.name,
            description = product.description,
            images = images,
            shopName = store?.name,
            dimensions = dimensions,
            skus = skus,
            badges = product.badges,
            rating = if (product.rating > 0) product.rating else null,
            sold = if (product.soldCount > 0) product.soldCount else null,
            location = product.location,
            category = product.categoryId?.toString(),
            brand = product.brandId?.toString(),
            catAge = product.catAge
        )
    }
}

