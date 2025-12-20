package com.petshop.util

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.readValue
import java.sql.ResultSet

object JsonUtils {
    private val objectMapper: ObjectMapper = jacksonObjectMapper().apply {
        registerModule(JavaTimeModule())
    }

    fun toJsonString(map: Map<String, String>): String {
        return objectMapper.writeValueAsString(map)
    }

    fun fromJsonString(json: String): Map<String, String> {
        return try {
            objectMapper.readValue<Map<String, String>>(json)
        } catch (e: Exception) {
            emptyMap()
        }
    }

    fun toJsonStringList(list: List<String>): String {
        return objectMapper.writeValueAsString(list)
    }

    fun fromJsonStringList(json: String): List<String> {
        return try {
            objectMapper.readValue<List<String>>(json)
        } catch (e: Exception) {
            emptyList()
        }
    }

    fun ResultSet.getJsonbMap(columnLabel: String): Map<String, String> {
        val json = this.getString(columnLabel) ?: return emptyMap()
        return fromJsonString(json)
    }

    fun ResultSet.getJsonbList(columnLabel: String): List<String> {
        val json = this.getString(columnLabel) ?: return emptyList()
        return fromJsonStringList(json)
    }
}

