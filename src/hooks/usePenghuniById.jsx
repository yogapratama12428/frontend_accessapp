import axios from "axios"
import { useEffect, useState } from "react"

export const usePenghuniById = url => {

    const [data_penghuniId, setData] = useState(null)
    const [loading_penghuniId, setLoading] = useState(true)
    const [error_penghuniId, setError] = useState(false)

    console.log(url)

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/penghuni/663da56bf5ee747f584b3b14')
                setData(response.data)
                console.log(response)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchData()


    }, [url])

    return {
        data_penghuniId, error_penghuniId, loading_penghuniId
    }
}
