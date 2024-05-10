import axios from "axios"
import { useEffect, useState } from "react"

export const useIdzinPenghuni = url => {
    const [data_penghuni, setData] = useState(null)
    const [loading_penghuni, setLoading] = useState(true)
    const [error_penghuni, setError] = useState(false)

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
        data_penghuni, error_penghuni, loading_penghuni
      }
}