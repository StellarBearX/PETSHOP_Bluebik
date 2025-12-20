package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Brand
import java.sql.ResultSet
import java.util.*

object BrandDAO {
    
    fun getAllBrands(): List<Brand> {
        val sql = "SELECT * FROM brands ORDER BY name"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToBrand(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getBrandById(id: UUID): Brand? {
        val sql = "SELECT * FROM brands WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToBrand(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    private fun mapRowToBrand(rs: ResultSet): Brand {
        return Brand(
            id = UUID.fromString(rs.getString("id")),
            code = rs.getString("code"),
            name = rs.getString("name")
        )
    }
}

