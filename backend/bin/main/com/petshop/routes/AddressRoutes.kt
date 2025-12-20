package com.petshop.routes

import com.petshop.dao.AddressDAO
import com.petshop.dto.*
import com.petshop.models.Address
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.util.*

fun Route.addressRoutes() {
    route("/api/addresses") {
        get {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val addresses = AddressDAO.getUserAddresses(userId)
            val addressResponses = addresses.map { address ->
                AddressResponse(
                    id = address.id.toString(),
                    firstName = address.firstName,
                    lastName = address.lastName,
                    phone = address.phone,
                    addressTh = address.addressTh,
                    addressEn = address.addressEn,
                    province = address.province,
                    district = address.district,
                    road = address.road,
                    postalCode = address.postalCode,
                    isDefault = address.isDefault
                )
            }
            
            call.respond(addressResponses)
        }
        
        post {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val request = call.receive<AddressRequest>()
            val address = Address(
                userId = userId,
                firstName = request.firstName,
                lastName = request.lastName,
                phone = request.phone,
                addressTh = request.addressTh,
                addressEn = request.addressEn,
                province = request.province,
                district = request.district,
                road = request.road,
                postalCode = request.postalCode,
                isDefault = request.isDefault
            )
            
            val createdAddress = AddressDAO.createAddress(address)
            call.respond(
                AddressResponse(
                    id = createdAddress.id.toString(),
                    firstName = createdAddress.firstName,
                    lastName = createdAddress.lastName,
                    phone = createdAddress.phone,
                    addressTh = createdAddress.addressTh,
                    addressEn = createdAddress.addressEn,
                    province = createdAddress.province,
                    district = createdAddress.district,
                    road = createdAddress.road,
                    postalCode = createdAddress.postalCode,
                    isDefault = createdAddress.isDefault
                )
            )
        }
        
        put("/{id}") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val addressId = call.parameters["id"] ?: return@put call.respond(
                mapOf("error" to "Address ID is required")
            )
            
            val existingAddress = AddressDAO.getAddressById(UUID.fromString(addressId))
            if (existingAddress == null || existingAddress.userId != userId) {
                call.respond(
                    mapOf("error" to "Address not found")
                )
                return@put
            }
            
            val request = call.receive<AddressRequest>()
            val updatedAddress = AddressDAO.updateAddress(
                existingAddress.copy(
                    firstName = request.firstName,
                    lastName = request.lastName,
                    phone = request.phone,
                    addressTh = request.addressTh,
                    addressEn = request.addressEn,
                    province = request.province,
                    district = request.district,
                    road = request.road,
                    postalCode = request.postalCode,
                    isDefault = request.isDefault
                )
            )
            
            call.respond(
                AddressResponse(
                    id = updatedAddress.id.toString(),
                    firstName = updatedAddress.firstName,
                    lastName = updatedAddress.lastName,
                    phone = updatedAddress.phone,
                    addressTh = updatedAddress.addressTh,
                    addressEn = updatedAddress.addressEn,
                    province = updatedAddress.province,
                    district = updatedAddress.district,
                    road = updatedAddress.road,
                    postalCode = updatedAddress.postalCode,
                    isDefault = updatedAddress.isDefault
                )
            )
        }
        
        delete("/{id}") {
            // TODO: Get userId from authentication token
            val userId = UUID.randomUUID() // Placeholder - replace with actual auth
            
            val addressId = call.parameters["id"] ?: return@delete call.respond(
                mapOf("error" to "Address ID is required")
            )
            
            val existingAddress = AddressDAO.getAddressById(UUID.fromString(addressId))
            if (existingAddress == null || existingAddress.userId != userId) {
                call.respond(
                    mapOf("error" to "Address not found")
                )
                return@delete
            }
            
            AddressDAO.deleteAddress(UUID.fromString(addressId))
            call.respond(mapOf("success" to true))
        }
    }
}

