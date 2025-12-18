package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Category
import java.sql.ResultSet
import java.util.*

object CategoryDAO {
    
    fun getAllCategories(): List<Category> {
        val sql = "SELECT * FROM categories ORDER BY display_order, name"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToCategory(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getCategoryById(id: UUID): Category? {
        val sql = "SELECT * FROM categories WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCategory(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun getCategoryByCode(code: String): Category? {
        val sql = "SELECT * FROM categories WHERE code = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, code)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToCategory(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    private fun mapRowToCategory(rs: ResultSet): Category {
        return Category(
            id = UUID.fromString(rs.getString("id")),
            code = rs.getString("code"),
            name = rs.getString("name"),
            iconUrl = rs.getString("icon_url"),
            displayOrder = rs.getInt("display_order")
        )
    }
}

