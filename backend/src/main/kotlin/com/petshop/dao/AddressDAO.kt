package com.petshop.dao

import com.petshop.database.DatabaseFactory
import com.petshop.models.Address
import java.sql.ResultSet
import java.util.*

object AddressDAO {
    
    fun createAddress(address: Address): Address {
        // If this is set as default, unset other defaults
        if (address.isDefault) {
            unsetDefaultAddresses(address.userId)
        }
        
        val sql = """
            INSERT INTO addresses (id, user_id, first_name, last_name, phone, address_th, address_en, 
                                  province, district, road, postal_code, is_default, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *
        """.trimIndent()
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, address.id)
                stmt.setObject(2, address.userId)
                stmt.setString(3, address.firstName)
                stmt.setString(4, address.lastName)
                stmt.setString(5, address.phone)
                stmt.setString(6, address.addressTh)
                stmt.setString(7, address.addressEn)
                stmt.setString(8, address.province)
                stmt.setString(9, address.district)
                stmt.setString(10, address.road)
                stmt.setString(11, address.postalCode)
                stmt.setBoolean(12, address.isDefault)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToAddress(rs)
                    } else {
                        throw RuntimeException("Failed to create address")
                    }
                }
            }
        }
    }
    
    fun getUserAddresses(userId: UUID): List<Address> {
        val sql = "SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, created_at DESC"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.executeQuery().use { rs ->
                    buildList {
                        while (rs.next()) {
                            add(mapRowToAddress(rs))
                        }
                    }
                }
            }
        }
    }
    
    fun getAddressById(id: UUID): Address? {
        val sql = "SELECT * FROM addresses WHERE id = ?"
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToAddress(rs)
                    } else {
                        null
                    }
                }
            }
        }
    }
    
    fun updateAddress(address: Address): Address {
        // If this is set as default, unset other defaults
        if (address.isDefault) {
            unsetDefaultAddresses(address.userId)
        }
        
        val sql = """
            UPDATE addresses 
            SET first_name = ?, last_name = ?, phone = ?, address_th = ?, address_en = ?,
                province = ?, district = ?, road = ?, postal_code = ?, is_default = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            RETURNING *
        """.trimIndent()
        
        return DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setString(1, address.firstName)
                stmt.setString(2, address.lastName)
                stmt.setString(3, address.phone)
                stmt.setString(4, address.addressTh)
                stmt.setString(5, address.addressEn)
                stmt.setString(6, address.province)
                stmt.setString(7, address.district)
                stmt.setString(8, address.road)
                stmt.setString(9, address.postalCode)
                stmt.setBoolean(10, address.isDefault)
                stmt.setObject(11, address.id)
                stmt.executeQuery().use { rs ->
                    if (rs.next()) {
                        mapRowToAddress(rs)
                    } else {
                        throw RuntimeException("Failed to update address")
                    }
                }
            }
        }
    }
    
    fun deleteAddress(id: UUID) {
        val sql = "DELETE FROM addresses WHERE id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, id)
                stmt.executeUpdate()
            }
        }
    }
    
    private fun unsetDefaultAddresses(userId: UUID) {
        val sql = "UPDATE addresses SET is_default = FALSE WHERE user_id = ?"
        DatabaseFactory.getConnection().use { conn ->
            conn.prepareStatement(sql).use { stmt ->
                stmt.setObject(1, userId)
                stmt.executeUpdate()
            }
        }
    }
    
    private fun mapRowToAddress(rs: ResultSet): Address {
        return Address(
            id = UUID.fromString(rs.getString("id")),
            userId = UUID.fromString(rs.getString("user_id")),
            firstName = rs.getString("first_name"),
            lastName = rs.getString("last_name"),
            phone = rs.getString("phone"),
            addressTh = rs.getString("address_th"),
            addressEn = rs.getString("address_en"),
            province = rs.getString("province"),
            district = rs.getString("district"),
            road = rs.getString("road"),
            postalCode = rs.getString("postal_code"),
            isDefault = rs.getBoolean("is_default"),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime(),
            updatedAt = rs.getTimestamp("updated_at").toLocalDateTime()
        )
    }
}

