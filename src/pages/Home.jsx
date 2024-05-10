import axios from "axios"
import { usePenghuni } from "../hooks/usePenghuni"
import { useState } from "react"
import { useIdzinPenghuni } from "../hooks/useIdzinPenghuni"
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
  } from "@material-tailwind/react";

const Home = () => {

  const [buttonstate, setButtonState] = useState(false)

  const [notif, setNotif] = useState(false);

  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handleRequestMasuk = async (penghuniId) => {

        setOpen(true)

        console.log(penghuniId)

        await axios.post('http://localhost:3000/api/v1/pengunjung', {
            name: 'Danu',
            penghuniId: penghuniId
        }, { 
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response)=> {
            console.log(response.data)
            setTimeout( async ()=> {
                const response_penghuni = await axios.get(
                `http://localhost:3000/api/v1/penghuni/${response.data.id}`) 
                console.log(response_penghuni.data)

                if(response_penghuni.data.status !== 'memanggil') {
                    setNotif(true)
                }    

            }, 10000)
        }).catch(()=> {
            console.log('error while fetching')
        }).finally(()=>{
            console.log('success')
        })

        setOpen(false)
  }

  const { data, loading, error } = usePenghuni('http://localhost:3000/api/v1/penghuni')

  let content



  if (loading) {
    console.log(loading)
    content =  ( <div> Loading...</div> )
  } if (error) {
    console.log(error)
  } else {
    console.log(data)
    content = (
    <>
        {data && data.map((penghuni) => (
          <button 
            className="border-2 rounded-md w-full h-36 hover:bg-slate-400" 
            onClick={()=> handleRequestMasuk(penghuni.id)} key={penghuni.id} >
            <div className="grid place-content-center ">
              <p className="font-bold text-2xl  ">
                {penghuni.alamat}
              </p>
            </div>
          </button>
        ))}


        
    </> 
    )

    
  }

  return (
    <div className=" bg-gray-900 h-screen text-white">
        <div className="w-full flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-center ">
                    Welcome To Smart Gate Apps
                </h1>
            </div>
        
            <div className="w-full  rounded-xl ">
            
                <div className="text-center ">
                    Silahkan Pilih Alamat Tujuan
                </div>
          
                <div className="grid grid-cols-3 gap-2 p-10 ">
                    {
                        content
                    }
                </div>

                <>
                    <Dialog open={open} handler={handleOpen}>
                        <DialogHeader>Its a simple dialog.</DialogHeader>
                        <DialogBody>
                        {
                            notif ? "akses disetujui" : "akses tidak disetujui"
                        }
                        </DialogBody>
                        <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="green" onClick={handleOpen}>
                            <span>Confirm</span>
                        </Button>
                        </DialogFooter>
                    </Dialog>
                </>

                <div
                    className="w-full border-2 rounded-xl py-2 px-5 text-center hover:bg-slate-400 font-bold text-lg"  
                    onClick={handleOpen} 
                    >
                    
                    {
                        buttonstate ? 'Masuk' : 'Idzin Masuk'
                    }
                   
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default Home