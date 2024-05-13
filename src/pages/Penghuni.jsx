/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom"
import { usePenghuniById } from "../hooks/usePenghuniById"

const Penghuni = () => {

    const { id } = useParams()

    const { data_penghuniId, error_penghuniId, loading_penghuniId } = usePenghuniById()

    let content

    if (loading_penghuniId) {
        console.log(loading_penghuniId)
        content = <> loading... </>
    } else if (error_penghuniId) {
        console.log(error_penghuniId)
        content = <> error... </>
    } else {
        console.log(data_penghuniId)
        content = <> success </>
    }


    return (
        <div>{
            content}
        </div>
    )
}

export default Penghuni