package com.petshop.routes

import com.petshop.dto.ProductListResponse
import com.petshop.services.ProductService
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.productRoutes() {
    route("/api/products") {
        get {
            val page = call.request.queryParameters["page"]?.toIntOrNull() ?: 1
            val pageSize = call.request.queryParameters["pageSize"]?.toIntOrNull() ?: 50
            val categoryId = call.request.queryParameters["categoryId"]
            val query = call.request.queryParameters["q"]
            
            if (query != null) {
                val result = ProductService.searchProducts(query, page, pageSize)
                call.respond(result)
            } else {
                val result = ProductService.getProducts(page, pageSize, categoryId)
                call.respond(result)
            }
        }
        
        get("/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                mapOf("error" to "Product ID is required")
            )
            
            val product = ProductService.getProductById(id)
            if (product != null) {
                call.respond(product)
            } else {
                call.respond(
                    mapOf("error" to "Product not found")
                )
            }
        }
    }
    
    route("/api/categories") {
        get {
            val categories = com.petshop.dao.CategoryDAO.getAllCategories()
            call.respond(categories)
        }
    }
    
    route("/api/brands") {
        get {
            val brands = com.petshop.dao.BrandDAO.getAllBrands()
            call.respond(brands)
        }
    }
}

