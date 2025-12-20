package com.petshop.routes

import com.petshop.dto.*
import com.petshop.services.CartService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.cartRoutes() {
    route("/api/cart") {
        get {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val cart = CartService.getCart(userId)
            call.respond(cart)
        }
        
        post("/items") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val request = call.receive<AddToCartRequest>()
            val success = CartService.addToCart(userId, request)
            
            if (success) {
                call.respond(mapOf("success" to true))
            } else {
                call.respond(
                    mapOf("error" to "Failed to add item to cart")
                )
            }
        }
        
        put("/items/{id}") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val itemId = call.parameters["id"] ?: return@put call.respond(
                mapOf("error" to "Item ID is required")
            )
            
            val request = call.receive<UpdateCartItemRequest>()
            val success = CartService.updateCartItem(userId, itemId, request.quantity)
            
            if (success) {
                call.respond(mapOf("success" to true))
            } else {
                call.respond(
                    mapOf("error" to "Failed to update cart item")
                )
            }
        }
        
        delete("/items/{id}") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val itemId = call.parameters["id"] ?: return@delete call.respond(
                mapOf("error" to "Item ID is required")
            )
            
            val success = CartService.removeCartItem(userId, itemId)
            if (success) {
                call.respond(mapOf("success" to true))
            } else {
                call.respond(
                    mapOf("error" to "Failed to remove cart item")
                )
            }
        }
        
        delete {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            CartService.clearCart(userId)
            call.respond(mapOf("success" to true))
        }
    }
}

