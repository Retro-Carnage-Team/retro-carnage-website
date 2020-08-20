package net.retrocarnage.backend.usage

import java.awt.Color
import java.util.*
import java.util.stream.Collectors
import kotlin.collections.HashMap

class ChartSeries(val color: Color, val name: String) {

    val data: MutableMap<Date, Long> = HashMap()

    fun toXData(): List<Date> {
        return data.entries
                .stream()
                .sorted { entry, entry2 -> entry.key.compareTo(entry2.key) }
                .map { e: Map.Entry<Date, Long> -> e.key }
                .collect(Collectors.toList())
    }

    fun toYData(): List<Long> {
        return data.entries
                .stream()
                .sorted { entry, entry2 -> entry.key.compareTo(entry2.key) }
                .map { e: Map.Entry<Date, Long> -> e.value }
                .collect(Collectors.toList())
    }

}