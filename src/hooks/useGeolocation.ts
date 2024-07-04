import { useState, useEffect } from "react"

type TypeOptions = {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}
type TypeCoords = {
  latitude: number
  longitude: number
}
type TypeStructure = {
  isLoaded: boolean
  coordinates: TypeCoords | null
  error: { code: number; message: string } | null
}

const useGeolocation = (options: TypeOptions) => {
  const [structure, setStructure] = useState<TypeStructure>({
    isLoaded: false,
    coordinates: null,
    error: null,
  })

  const handleSuccess = ({ coords }: { coords: TypeCoords }) => {
    setStructure((prev) => ({
      ...prev,
      isLoaded: true,
      coordinates: coords,
      error: null,
    }))
  }

  const handleError = (error: { code: number; message: string }) => {
    setStructure((prev) => ({
      ...prev,
      isLoaded: true,
      coordinates: null,
      error,
    }))
  }

  const onUpdate = () => {
    if (!("geolocation" in navigator)) {
      setStructure((prev) => ({
        ...prev,
        isLoaded: false,
        coordinates: null,
        error: { code: 0, message: "Geolocation not supported" },
      }))
      return
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
  }

  const onOverwrite = (coords: TypeCoords) => {
    setStructure((prev) => ({
      ...prev,
      isLoaded: true,
      coordinates: coords,
      error: null,
    }))
  }

  useEffect(() => {
    onUpdate()
  }, [])

  return {
    geolocationStructure: structure,
    onUpdate,
    onOverwrite,
  }
}

export default useGeolocation
