package net.retrocarnage.backend.usage

import org.knowm.xchart.BitmapEncoder
import org.knowm.xchart.XYChart
import org.knowm.xchart.XYChartBuilder
import org.knowm.xchart.style.lines.SeriesLines
import org.knowm.xchart.style.markers.SeriesMarkers
import java.awt.Color
import java.io.BufferedOutputStream
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.util.*

class ChartBuilder(private val dataSeries: MutableList<ChartSeries> = LinkedList()) {

    fun addChartSeries(data: ChartSeries): ChartBuilder {
        dataSeries.add(data)
        return this
    }

    private val chart: XYChart
        get() {
            val chart = XYChartBuilder()
                    .width(838)
                    .height(472)
                    .title("Usage statistics")
                    .xAxisTitle("Time")
                    .yAxisTitle("Usage")
                    .build()
            chart.styler.chartBackgroundColor = Color.WHITE
            chart.styler.datePattern = "yyyy-MM"
            chart.styler.locale = Locale.GERMAN
            for (usageData in dataSeries) {
                val xySeries = chart.addSeries(usageData.name, usageData.toXData(), usageData.toYData())
                xySeries.lineColor = usageData.color
                xySeries.lineStyle = SeriesLines.SOLID
                xySeries.marker = SeriesMarkers.NONE
            }
            return chart
        }

    val chartAsPng: ByteArray?
        get() {
            try {
                ByteArrayOutputStream().use { baos ->
                    BufferedOutputStream(baos).use { bos ->
                        val chart = chart
                        BitmapEncoder.saveBitmap(chart, bos, BitmapEncoder.BitmapFormat.PNG)
                        bos.flush()
                        return baos.toByteArray()
                    }
                }
            } catch (e: IOException) {
                e.printStackTrace()
            }
            return null
        }

}