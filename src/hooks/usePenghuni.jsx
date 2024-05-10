import axios from "axios"
import { useEffect, useState } from "react"

export const usePenghuni = url => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    console.log(url)

    useEffect(()=> {

        const fetchData = async () => {
            try {
                const response = await axios.get(url) 
                setData(response.data)
                console.log(response)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
       

    },[url])

  return {
    data, error, loading
  }
}
