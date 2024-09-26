import {
  createMetricsLogger,
  Unit,
  StorageResolution
} from 'aws-embedded-metrics'
import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/helpers/logging/logger.js'

/**
 * @param {string} metricName
 * @param {number} value
 */
const metricsCounter = async (metricName, value = 1) => {
  const isMetricsEnabled = config.get('isMetricsEnabled')

  if (!isMetricsEnabled) {
    return
  }

  try {
    const metricsLogger = createMetricsLogger()
    metricsLogger.putMetric(
      metricName,
      value,
      Unit.Count,
      StorageResolution.Standard
    )
    await metricsLogger.flush()
  } catch (error) {
    createLogger().error(error, error.message)
  }
}

export { metricsCounter }
