package com.petshop.routes

import com.petshop.dto.*
import com.petshop.services.OrderService
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.orderRoutes() {
    route("/api/orders") {
        post {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val request = call.receive<CreateOrderRequest>()
            val order = OrderService.createOrder(userId, request)
            
            if (order != null) {
                call.respond(order)
            } else {
                call.respond(
                    mapOf("error" to "Failed to create order")
                )
            }
        }
        
        get {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val orders = OrderService.getOrders(userId)
            call.respond(orders)
        }
        
        get("/{id}") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val orderId = call.parameters["id"] ?: return@get call.respond(
                mapOf("error" to "Order ID is required")
            )
            
            val order = OrderService.getOrderById(userId, orderId)
            if (order != null) {
                call.respond(order)
            } else {
                call.respond(
                    mapOf("error" to "Order not found")
                )
            }
        }
    }
}

