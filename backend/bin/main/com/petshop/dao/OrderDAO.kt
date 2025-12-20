package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Order
import com.petshop.models.OrderItem
import com.petshop.util.JsonUtils
import java.math.BigDecimal
import java.sql.ResultSet
import java.util.*

object OrderDAO {
    
    fun createOrder(order: Order, items: List<OrderItem>): Order {
        DatabaseFactory.getConnection().use { conn ->
            conn.autoCommit = false
            try {
                // Insert order
                val orderSql = """
                    INSERT INTO orders (id, user_id, address_id, payment_card_id, coupon_id, order_number, status, 
                                      payment_method, subtotal, product_discount, shipping_cost, shipping_discount, 
                                      total, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                    RETURNING *
                """.trimIndent()
                
                val createdOrder = conn.prepareStatement(orderSql).use { stmt ->
                    stmt.setObject(1, order.id)
                    stmt.setObject(2, order.userId)
                    stmt.setObject(3, order.addressId)
                    stmt.setObject(4, order.paymentCardId)
                    stmt.setObject(5, order.couponId)
                    stmt.setString(6, order.orderNumber)
                    stmt.setString(7, order.status)
                    stmt.setString(8, order.paymentMethod)
                    stmt.setBigDecimal(9, order.subtotal)
                    stmt.setBigDecimal(10, order.productDiscount)
                    stmt.setBigDecimal(11, order.shippingCost)
                    stmt.setBigDecimal(12, order.shippingDiscount)
                    stmt.setBigDecimal(13, order.total)
                    stmt.executeQuery().use { rs ->
                        if (rs.next()) {
                            mapRowToOrder(rs)
                        } else {
                            throw RuntimeException("Failed to create order")
                        }
                    }
                }
                
                // Insert order items
                val itemSql = """
                    INSERT INTO order_items (id, order_id, product_id, sku_id, product_name, variant_selection, price, quantity, subtotal)
                    VALUES (?, ?, ?, ?, ?, ?::jsonb, ?, ?, ?)
                """.trimIndent()
                
                conn.prepareStatement(itemSql).use { stmt ->
                    for (item in items) {
                        stmt.setObject(1, item.id)
                        stmt.setObject(2, item.orderId)
                        stmt.setObject(3, item.productId)
                        stmt.setObject(4, item.skuId)
                        stmt.setString(5, item.productName)
                        stmt.setString(6, JsonUtils.toJsonString(item.variantSelection))
                        stmt.setBigDecimal(7, item.price)
                        stmt.setInt(8, item.quantity)
                        stmt.setBigDecimal(9, item.subtotal)
                        stmt.addBatch()
                    }
                    stmt.executeBatch()
                }
                
                conn.commit()
                return createdOrder
            } catch (e: Exception) {
                conn.rollback()
                throw e
            } finally {
                conn.autoCommit = true
            }
        }
    }
    
    fun getOrdersByUserId(userId: UUID): List<Order> {
        val sql = "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToOrder(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getOrderById(id: UUID): Order? {
        val sql = "SELECT * FROM orders WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToOrder(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getOrderItems(orderId: UUID): List<OrderItem> {
        val sql = "SELECT * FROM order_items WHERE order_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, orderId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToOrderItem(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun generateOrderNumber(): String {
        val timestamp = System.currentTimeMillis()
        val random = (1000..9999).random()
        return "ORD-$timestamp-$random"
    }
    
    private fun mapRowToOrder(rs: ResultSet): Order {
        return Order(
            id = UUID.fromString(rs.getString("id")),
            userId = UUID.fromString(rs.getString("user_id")),
            addressId = rs.getObject("address_id")?.let { UUID.fromString(it.toString()) },
            paymentCardId = rs.getObject("payment_card_id")?.let { UUID.fromString(it.toString()) },
            couponId = rs.getObject("coupon_id")?.let { UUID.fromString(it.toString()) },
            orderNumber = rs.getString("order_number"),
            status = rs.getString("status"),
            paymentMethod = rs.getString("payment_method"),
            subtotal = rs.getBigDecimal("subtotal"),
            productDiscount = rs.getBigDecimal("product_discount"),
            shippingCost = rs.getBigDecimal("shipping_cost"),
            shippingDiscount = rs.getBigDecimal("shipping_discount"),
            total = rs.getBigDecimal("total"),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
    
    private fun mapRowToOrderItem(rs: ResultSet): OrderItem {
        return OrderItem(
            id = UUID.fromString(rs.getString("id")),
            orderId = UUID.fromString(rs.getString("order_id")),
            productId = UUID.fromString(rs.getString("product_id")),
            skuId = UUID.fromString(rs.getString("sku_id")),
            productName = rs.getString("product_name"),
            variantSelection = JsonUtils.fromJsonString(rs.getString("variant_selection") ?: "{}"),
            price = rs.getBigDecimal("price"),
            quantity = rs.getInt("quantity"),
            subtotal = rs.getBigDecimal("subtotal")
        )
    }
}

