package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Cart
import com.petshop.models.CartItem
import java.sql.ResultSet
import java.util.*

object CartDAO {
    
    fun getOrCreateCart(userId: UUID): Cart {
        val existingCart = getCartByUserId(userId)
        if (existingCart != null) {
            return existingCart
        }
        
        val sql = "INSERT INTO carts (id, user_id, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                val cartId = UUID.randomUUID()
                stmt.setObject(1, cartId)
                stmt.setObject(2, userId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCart(rs)
                    } else {
                        throw RuntimeException("Failed to create cart")
                    }
                }
            }
        }
    }
    
    fun getCartByUserId(userId: UUID): Cart? {
        val sql = "SELECT * FROM carts WHERE user_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCart(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getCartItems(cartId: UUID): List<CartItem> {
        val sql = "SELECT * FROM cart_items WHERE cart_id = ? ORDER BY created_at"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, cartId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToCartItem(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun addCartItem(cartId: UUID, productId: UUID, skuId: UUID, quantity: Int) {
        val existingItem = getCartItemBySku(cartId, skuId)
        if (existingItem != null) {
            updateCartItemQuantity(existingItem.id, existingItem.quantity + quantity)
        } else {
            val sql = """
                INSERT INTO cart_items (id, cart_id, product_id, sku_id, quantity, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            """.trimIndent()
            DatabaseFactory.getConnection().use { conn ->
                conn.prepareStatement(sql).use { stmt ->
                    stmt.setObject(1, UUID.randomUUID())
                    stmt.setObject(2, cartId)
                    stmt.setObject(3, productId)
                    stmt.setObject(4, skuId)
                    stmt.setInt(5, quantity)
                    stmt.executeUpdate()
                }
            }
        }
        updateCartTimestamp(cartId)
    }
    
    fun updateCartItemQuantity(itemId: UUID, quantity: Int) {
        val sql = "UPDATE cart_items SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setInt(1, quantity)
                stmt.setObject(2, itemId)
                stmt.executeUpdate()
            }
        }
    }
    
    fun removeCartItem(itemId: UUID) {
        val sql = "DELETE FROM cart_items WHERE id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, itemId)
                stmt.executeUpdate()
            }
        }
    }
    
    fun clearCart(cartId: UUID) {
        val sql = "DELETE FROM cart_items WHERE cart_id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, cartId)
                stmt.executeUpdate()
            }
        }
    }
    
    private fun getCartItemBySku(cartId: UUID, skuId: UUID): CartItem? {
        val sql = "SELECT * FROM cart_items WHERE cart_id = ? AND sku_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, cartId)
                stmt.setObject(2, skuId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCartItem(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    private fun updateCartTimestamp(cartId: UUID) {
        val sql = "UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, cartId)
                stmt.executeUpdate()
            }
        }
    }
    
    private fun mapRowToCart(rs: ResultSet): Cart {
        return Cart(
            id = UUID.fromString(rs.getString("id")),
            userId = UUID.fromString(rs.getString("user_id")),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
    
    private fun mapRowToCartItem(rs: ResultSet): CartItem {
        return CartItem(
            id = UUID.fromString(rs.getString("id")),
            cartId = UUID.fromString(rs.getString("cart_id")),
            productId = UUID.fromString(rs.getString("product_id")),
            skuId = UUID.fromString(rs.getString("sku_id")),
            quantity = rs.getInt("quantity"),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
}

