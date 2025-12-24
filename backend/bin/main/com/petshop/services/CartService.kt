package com.petshop.services

import com.petshop.dao.*
import com.petshop.dto.*
import java.util.*

object CartService {
    
    fun getCart(userId: UUID): CartResponse {
        val cart = CartDAO.getOrCreateCart(userId)
        val cartItems = CartDAO.getCartItems(cart.id)
        
        val lines = cartItems.map { item ->
            val product = ProductDAO.getProductById(item.productId)
            val stock = ProductDAO.getProductStockById(item.stockId)
            val images = ProductDAO.getProductImages(item.productId)
            
            CartLineDTO(
                id = item.id.toString(),
                productId = item.productId.toString(),
                stockId = item.stockId.toString(),
                name = product?.name ?: "Unknown Product",
                image = images.firstOrNull()?.imageUrl ?: "",
                selection = stock?.selection ?: emptyMap(),
                price = stock?.price?.toDouble() ?: 0.0,
                quantity = item.quantity
            )
        }
        
        return CartResponse(lines = lines)
    }
    
    fun addToCart(userId: UUID, request: AddToCartRequest): Boolean {
        val cart = CartDAO.getOrCreateCart(userId)
        val productId = UUID.fromString(request.productId)
        val stockId = UUID.fromString(request.stockId)
        
        // Verify stock exists and has stock
        val stock = ProductDAO.getProductStockById(stockId)
        if (stock == null || stock.stock < request.quantity) {
            return false
        }
        
        CartDAO.addCartItem(cart.id, productId, stockId, request.quantity)
        return true
    }
    
    fun updateCartItem(userId: UUID, itemId: String, quantity: Int): Boolean {
        val cart = CartDAO.getCartByUserId(userId) ?: return false
        val itemUuid = UUID.fromString(itemId)
        
        if (quantity <= 0) {
            CartDAO.removeCartItem(itemUuid)
        } else {
            CartDAO.updateCartItemQuantity(itemUuid, quantity)
        }
        return true
    }
    
    fun removeCartItem(userId: UUID, itemId: String): Boolean {
        val itemUuid = UUID.fromString(itemId)
        CartDAO.removeCartItem(itemUuid)
        return true
    }
    
    fun clearCart(userId: UUID) {
        val cart = CartDAO.getCartByUserId(userId) ?: return
        CartDAO.clearCart(cart.id)
    }
}

