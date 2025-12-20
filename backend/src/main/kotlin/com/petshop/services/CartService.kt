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
            val sku = ProductDAO.getProductSkuById(item.skuId)
            val images = ProductDAO.getProductImages(item.productId)
            
            CartLineDTO(
                id = item.id.toString(),
                productId = item.productId.toString(),
                skuId = item.skuId.toString(),
                name = product?.name ?: "Unknown Product",
                image = images.firstOrNull()?.imageUrl ?: "",
                selection = sku?.selection ?: emptyMap(),
                price = sku?.price?.toDouble() ?: 0.0,
                quantity = item.quantity
            )
        }
        
        return CartResponse(lines = lines)
    }
    
    fun addToCart(userId: UUID, request: AddToCartRequest): Boolean {
        val cart = CartDAO.getOrCreateCart(userId)
        val productId = UUID.fromString(request.productId)
        val skuId = UUID.fromString(request.skuId)
        
        // Verify SKU exists and has stock
        val sku = ProductDAO.getProductSkuById(skuId)
        if (sku == null || sku.stock < request.quantity) {
            return false
        }
        
        CartDAO.addCartItem(cart.id, productId, skuId, request.quantity)
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

