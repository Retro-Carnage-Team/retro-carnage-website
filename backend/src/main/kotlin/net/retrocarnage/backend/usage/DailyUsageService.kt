package net.retrocarnage.backend.usage

import org.knowm.xchart.style.colors.XChartSeriesColors
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import java.text.SimpleDateFormat
import java.time.LocalDateTime
import java.time.temporal.ChronoUnit

@Service
class DailyUsageService(
        val dailyUsageRepository: DailyUsageRepository,
        val usageRepository: UsageRepository) {

    var usageChart: ByteArray? = buildUsageChart()

    @Scheduled(cron = "0 0 3 * * *")                                                                                    // 3 AM, every day
    fun getYesterdaysUsage() {
        val yesterday = LocalDateTime.now().minus(1, ChronoUnit.DAYS)
        val dateString = Usage.dateFormatter.format(yesterday)
        val dailyUsage = dailyUsageRepository.findByDate(dateString)
        if (dailyUsage.isNotEmpty())
            dailyUsageRepository.deleteAll(dailyUsage)

        val numberOfGamesPlayedYesterday = usageRepository.countByStart(dateString)
        dailyUsageRepository.save(DailyUsage(
                id = null,
                date = dateString,
                games = numberOfGamesPlayedYesterday
        ))
        usageChart = buildUsageChart()
    }

    private final fun buildUsageChart(): ByteArray? {
        val chartSeries = ChartSeries(
                color = XChartSeriesColors.BLUE,
                name = "Games played"
        )

        val dailyUsages = dailyUsageRepository.findAll()
        if(dailyUsages.isEmpty())
            return null

        val dateParser = SimpleDateFormat("yyyy-MM-dd")
        dailyUsageRepository.findAll().forEach { dailyUsage ->
            val date = dateParser.parse(dailyUsage.date)
            chartSeries.data[date] = dailyUsage.games ?: 0L
        }

        return ChartBuilder()
                .addChartSeries(chartSeries)
                .chartAsPng
    }

}