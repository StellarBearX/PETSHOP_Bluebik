package com.petshop.services

import com.petshop.dao.*
import com.petshop.dto.*
import java.math.BigDecimal
import java.time.format.DateTimeFormatter
import java.util.*

object OrderService {
    
    fun createOrder(userId: UUID, request: CreateOrderRequest): OrderResponse? {
        val cart = CartDAO.getCartByUserId(userId) ?: return null
        val cartItems = CartDAO.getCartItems(cart.id)
        
        if (cartItems.isEmpty()) {
            return null
        }
        
        // Calculate totals
        var subtotal = BigDecimal.ZERO
        val orderItems = cartItems.map { cartItem ->
            val product = ProductDAO.getProductById(cartItem.productId) ?: return null
            val stock = ProductDAO.getProductStockById(cartItem.stockId) ?: return null
            val itemSubtotal = stock.price.multiply(BigDecimal(cartItem.quantity))
            subtotal = subtotal.add(itemSubtotal)
            
            com.petshop.models.OrderItem(
                id = UUID.randomUUID(),
                orderId = UUID.randomUUID(), // Will be set properly
                productId = cartItem.productId,
                stockId = cartItem.stockId,
                productName = product.name,
                variantSelection = stock.selection,
                price = stock.price,
                quantity = cartItem.quantity,
                subtotal = itemSubtotal
            )
        }
        
        // Apply coupon discount if provided
        var productDiscount = BigDecimal.ZERO
        var shippingDiscount = BigDecimal.ZERO
        val coupon = request.couponId?.let { CouponDAO.getCouponById(UUID.fromString(it)) }
        
        if (coupon != null && subtotal >= coupon.minSpend) {
            when (coupon.type) {
                "discount" -> productDiscount = coupon.discountAmount
                "freeship" -> shippingDiscount = coupon.discountAmount
            }
        }
        
        val shippingCost = BigDecimal("10.00") // Default shipping
        val actualShipping = (shippingCost - shippingDiscount).max(BigDecimal.ZERO)
        val total = (subtotal - productDiscount + actualShipping).max(BigDecimal.ZERO)
        
        // Create order
        val order = com.petshop.models.Order(
            id = UUID.randomUUID(),
            userId = userId,
            addressId = UUID.fromString(request.addressId),
            paymentCardId = request.paymentCardId?.let { UUID.fromString(it) },
            couponId = coupon?.id,
            orderNumber = OrderDAO.generateOrderNumber(),
            status = "pending",
            paymentMethod = request.paymentMethod,
            subtotal = subtotal,
            productDiscount = productDiscount,
            shippingCost = shippingCost,
            shippingDiscount = shippingDiscount,
            total = total
        )
        
        // Update order items with correct order ID
        val finalOrderItems = orderItems.map { it.copy(orderId = order.id) }
        
        val createdOrder = OrderDAO.createOrder(order, finalOrderItems)
        
        // Use coupon if applied
        if (coupon != null) {
            CouponDAO.useCoupon(userId, coupon.id)
        }
        
        // Clear cart
        CartDAO.clearCart(cart.id)
        
        return convertToOrderResponse(createdOrder, finalOrderItems)
    }
    
    fun getOrders(userId: UUID): OrderListResponse {
        val orders = OrderDAO.getOrdersByUserId(userId)
        val orderResponses = orders.map { order ->
            val items = OrderDAO.getOrderItems(order.id)
            convertToOrderResponse(order, items)
        }
        
        return OrderListResponse(
            orders = orderResponses,
            total = orderResponses.size
        )
    }
    
    fun getOrderById(userId: UUID, orderId: String): OrderResponse? {
        val order = OrderDAO.getOrderById(UUID.fromString(orderId)) ?: return null
        if (order.userId != userId) {
            return null
        }
        
        val items = OrderDAO.getOrderItems(order.id)
        return convertToOrderResponse(order, items)
    }
    
    private fun convertToOrderResponse(order: com.petshop.models.Order, items: List<com.petshop.models.OrderItem>): OrderResponse {
        val orderItems = items.map { item ->
            val images = ProductDAO.getProductImages(item.productId)
            OrderItemDTO(
                id = item.id.toString(),
                productId = item.productId.toString(),
                stockId = item.stockId.toString(),
                productName = item.productName,
                variant = item.variantSelection.entries.joinToString(", ") { "${it.key}: ${it.value}" },
                price = item.price.toDouble(),
                quantity = item.quantity,
                image = images.firstOrNull()?.imageUrl
            )
        }
        
        return OrderResponse(
            id = order.id.toString(),
            orderNumber = order.orderNumber,
            status = order.status,
            items = orderItems,
            subtotal = order.subtotal.toDouble(),
            productDiscount = order.productDiscount.toDouble(),
            shippingCost = order.shippingCost.toDouble(),
            shippingDiscount = order.shippingDiscount.toDouble(),
            total = order.total.toDouble(),
            createdAt = order.createdAt.format(DateTimeFormatter.ISO_DATE_TIME)
        )
    }
}

