import { useState, useEffect, useCallback } from 'react'

export function useSheetData(sheetName, fallback = []) {
  const [rows, setRows] = useState(fallback)
main
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // URL Google Apps Script kamu
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbzJoYbUyRXb6EPF6grCm2aiug3wKJo7KNysp7Wxi2BStpAYhtlZcKtXEK_kbV0am7H8/exec?sheet=${sheetName}`
      )

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setRows(data)
        setUpdatedAt(new Date())
      } else {
        // kalau kosong, fallback ke dummy
        setRows(fallback)
      }
    } catch (err) {
      console.error('Gagal mengambil data:', err)
      setError(err)
      setRows(fallback)
    } finally {
      setLoading(false)
    }
  }, [sheetName, fallback])
main

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { rows, loading, error, updatedAt, refresh: fetchData }
}
