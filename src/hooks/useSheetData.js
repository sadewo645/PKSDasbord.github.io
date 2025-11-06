import { useCallback, useEffect, useState } from 'react'

const API_URL = 'https://script.google.com/macros/s/AKfycbx6NW08CUc2-oCq8Jh8q7ESSk8nZzAbZAS3szw57t0UeQvn5WIN7QrHBn7GQ6lqWYiY/exec'

const normaliseRows = (payload) => {
  if (!payload) return []
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (payload.data?.values) return payload.data.values
  if (Array.isArray(payload.values)) return payload.values
  return []
}

const extractUpdatedAt = (payload) => {
  if (!payload) return null
  if (payload.updatedAt) return payload.updatedAt
  if (payload.lastUpdated) return payload.lastUpdated
  if (payload.data?.updatedAt) return payload.data.updatedAt
  if (payload.data?.lastUpdated) return payload.data.lastUpdated
  return null
}

export const useSheetData = (sheet, fallbackRows = []) => {
  const [rows, setRows] = useState(fallbackRows)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_URL}?sheet=${encodeURIComponent(sheet)}`)
      if (!response.ok) {
        throw new Error(`Gagal memuat data: ${response.statusText}`)
      }
      const payload = await response.json()
      const incomingRows = normaliseRows(payload)
      const safeRows = Array.isArray(incomingRows) && incomingRows.length > 0 ? incomingRows : fallbackRows
      setRows(safeRows)
      setUpdatedAt(extractUpdatedAt(payload))
    } catch (err) {
      console.error(err)
      setError(err)
      setRows(fallbackRows)
    } finally {
      setLoading(false)
    }
  }, [fallbackRows, sheet])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { rows, loading, error, updatedAt, refresh: fetchData }
}
