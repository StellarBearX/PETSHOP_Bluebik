package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.*
import com.petshop.util.JsonUtils
import java.math.BigDecimal
import java.sql.ResultSet
import java.util.*

object ProductDAO {
    
    fun getAllProducts(limit: Int = 50, offset: Int = 0, categoryId: UUID? = null): List<Product> {
        val sql = if (categoryId != null) {
            "SELECT * FROM products WHERE category_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
        } else {
            "SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?"
        }
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                if (categoryId != null) {
                    stmt.setObject(1, categoryId)
                    stmt.setInt(2, limit)
                    stmt.setInt(3, offset)
                } else {
                    stmt.setInt(1, limit)
                    stmt.setInt(2, offset)
                }
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToProduct(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getProductById(id: UUID): Product? {
        val sql = "SELECT * FROM products WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToProduct(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun searchProducts(query: String, limit: Int = 50, offset: Int = 0): List<Product> {
        val sql = "SELECT * FROM products WHERE name ILIKE ? OR description ILIKE ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
        val searchPattern = "%$query%"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, searchPattern)
                stmt.setString(2, searchPattern)
                stmt.setInt(3, limit)
                stmt.setInt(4, offset)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToProduct(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getProductImages(productId: UUID): List<ProductImage> {
        val sql = "SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, productId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(ProductImage(
                                id = UUID.fromString(rs.getString("id")),
                                productId = UUID.fromString(rs.getString("product_id")),
                                imageUrl = rs.getString("image_url"),
                                displayOrder = rs.getInt("display_order")
                            ))
                        }
                    }
                }
            }
        }
    }
    
    fun getProductDimensions(productId: UUID): List<ProductDimension> {
        val sql = "SELECT * FROM product_dimensions WHERE product_id = ? ORDER BY display_order"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, productId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(ProductDimension(
                                id = UUID.fromString(rs.getString("id")),
                                productId = UUID.fromString(rs.getString("product_id")),
                                key = rs.getString("key"),
                                label = rs.getString("label"),
                                displayOrder = rs.getInt("display_order")
                            ))
                        }
                    }
                }
            }
        }
    }
    
    fun getProductOptions(dimensionId: UUID): List<ProductOption> {
        val sql = "SELECT * FROM product_options WHERE dimension_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, dimensionId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(ProductOption(
                                id = UUID.fromString(rs.getString("id")),
                                dimensionId = UUID.fromString(rs.getString("dimension_id")),
                                value = rs.getString("value"),
                                label = rs.getString("label"),
                                imageUrl = rs.getString("image_url")
                            ))
                        }
                    }
                }
            }
        }
    }

    fun getProductStocks(productId: UUID): List<ProductStock> {
        val sql = "SELECT * FROM product_stocks WHERE product_id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, productId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(ProductStock(
                                id = UUID.fromString(rs.getString("id")),
                                productId = UUID.fromString(rs.getString("product_id")),
                                stockCode = rs.getString("stock_code"),
                                selection = JsonUtils.fromJsonString(rs.getString("selection") ?: "{}"),
                                price = rs.getBigDecimal("price"),
                                stock = rs.getInt("stock"),
                                createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
                                updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
                            ))
                        }
                    }
                }
            }
        }
    }

    fun getProductStockById(stockId: UUID): ProductStock? {
        val sql = "SELECT * FROM product_stocks WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, stockId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        ProductStock(
                            id = UUID.fromString(rs.getString("id")),
                            productId = UUID.fromString(rs.getString("product_id")),
                            stockCode = rs.getString("stock_code"),
                            selection = JsonUtils.fromJsonString(rs.getString("selection") ?: "{}"),
                            price = rs.getBigDecimal("price"),
                            stock = rs.getInt("stock"),
                            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
                            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
                        )
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getStoreById(storeId: UUID): Store? {
        val sql = "SELECT * FROM stores WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, storeId)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        Store(
                            id = UUID.fromString(rs.getString("id")),
                            name = rs.getString("name"),
                            logoUrl = rs.getString("logo_url"),
                            type = rs.getString("type"),
                            createdAt = rs.getTimestamp("created_at").toLocalDateTime()
                        )
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    private fun mapRowToProduct(rs: ResultSet): Product {
        val badgesArray = rs.getArray("badges")
        val badges = if (badgesArray != null) {
            (badgesArray.array as? Array<*>)?.mapNotNull { it?.toString() } ?: emptyList()
        } else {
            emptyList()
        }
        
        return Product(
            id = UUID.fromString(rs.getString("id")),
            categoryId = rs.getObject("category_id")?.let { UUID.fromString(it.toString()) },
            brandId = rs.getObject("brand_id")?.let { UUID.fromString(it.toString()) },
            storeId = rs.getObject("store_id")?.let { UUID.fromString(it.toString()) },
            name = rs.getString("name"),
            description = rs.getString("description"),
            rating = rs.getDouble("rating"),
            soldCount = rs.getInt("sold_count"),
            location = rs.getString("location"),
            catAge = rs.getString("cat_age"),
            badges = badges,
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
}

