import axios from "axios"
import { usePenghuni } from "../hooks/usePenghuni"
import { useCallback, useState } from "react"

import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Spinner,
} from "@material-tailwind/react";

const Home = () => {

    // eslint-disable-next-line no-unused-vars
    const [buttonstate, setButtonState] = useState(false)

    const [disableButton, setDisableButton] = useState(false)
    const [disableButtonCancel, setDisableButtonCancel] = useState(true)

    const [notif, setNotif] = useState("meminta akses");
    const [isLoadingNotif, setIsLoadingNotif] = useState(true)
    const [isErrorNotif, setIsErrorNotif] = useState("")



    const [open, setOpen] = useState(false);

    const [pengunjung, setPengunjung] = useState("")
    const [kepentingan, setKepentingan] = useState("")
    const [penghuniId, setPenghuniId] = useState("")
    const [pengunjungId, setPengunjungId] = useState("")

    const handleOpen = (penghuniId) => {
        setOpen(!open)
        setPenghuniId(penghuniId)
    };

    const handleFillKepentingan = (e) => {
        console.log(e.target.value)
        setKepentingan(e.target.value)
    }

    const handleRequestMasuk = async (penghuniId, pengunjung, kepentingan) => {

        // setOpen(true)
        console.log("penghuniId: " + penghuniId)
        console.log("pengunjung: " + pengunjung)
        console.log("kepentingan: " + kepentingan)

        // status --> [memanggil, akses diterima, akses ditolak]
        await axios.post('http://localhost:3000/api/v1/pengunjung', {
            name: pengunjung,
            penghuniId: penghuniId,
            kepentingan,
            status: "memanggil",
            isCalled: true,
            isOut: false
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data)
            setPengunjungId(response.data.id)
            setInterval(async () => {

                try {
                    setIsErrorNotif("")
                    const response_penghuni = await axios.get(
                        `http://localhost:3000/api/v1/pengunjung/${response.data.id}`)
                    console.log(response_penghuni)

                    if (response_penghuni.data.status === "akses diterima") {
                        setNotif("akses disetujui")
                        setDisableButtonCancel(true)
                    } else {
                        setNotif("akses ditolak")
                        setDisableButtonCancel(false)
                    }
                } catch (error) {

                    console.error(error)
                    setIsErrorNotif(error)
                } finally {
                    setIsLoadingNotif(false)
                }

            }, 60000)
        }).catch(() => {
            console.log('error while fetching')
        }).finally(() => {
            console.log('success')
            setIsLoadingNotif(true)
            
        })

        setDisableButton(true)
       
       
    }

    const handleRequestKeluar = async (penghuniId, pengunjung, kepentingan) => {
        // setOpen(true)
        console.log("penghuniId: " + penghuniId)
        console.log("pengunjung: " + pengunjung)
        console.log("kepentingan: " + kepentingan)

        // status --> [memanggil, akses diterima, akses ditolak]
        await axios.post('http://localhost:3000/api/v1/pengunjung', {
            name: pengunjung,
            penghuniId: penghuniId,
            kepentingan,
            status: "memanggil",
            isCalled: true,
            isOut: true
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data)
            const interval = setInterval(async () => {

                try {
                    setIsErrorNotif("")
                    const response_penghuni = await axios.get(
                        `http://localhost:3000/api/v1/pengunjung/${response.data.id}`)
                    console.log(response_penghuni)

                    if (response_penghuni.data.status === "akses diterima") {
                        setNotif("akses disetujui")
                        setDisableButtonCancel(true)
                    } else {
                        setNotif("akses ditolak")
                        setDisableButtonCancel(false)
                    }
                } catch (error) {

                    console.error(error)
                    setIsErrorNotif(error)
                } finally {
                    setIsLoadingNotif(false)
                }

            }, 60000)

            return () => clearInterval(interval);

        }).catch(() => {
            console.log('error while fetching')
        }).finally(() => {
            console.log('success')
            setIsLoadingNotif(true)
            
        })
        setDisableButton(true)
       
    }

    const handleRefatching = async () => {

    }

    const handleCancel = async () => {
        await axios.put(`http://localhost:3000/api/v2/pengunjung/${pengunjungId}`, {
            status: "panggilan dibatalkan",
            isCalled: false,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response.data)
        }).catch(() => {
            console.log('error while fetching')
        }).finally(() => {
            console.log('success')
            setIsLoadingNotif(true)
            
        })

        setDisableButton(false)
        setDisableButtonCancel(true)

    }

    const { data, loading, error } = usePenghuni('http://localhost:3000/api/v1/penghuni')

    let content

    // onClick = {() => handleRequestMasuk(penghuni.id)}

    if (loading) {
        console.log(loading)
        content = (<div> Loading...</div>)
    } if (error) {
        console.log(error)
    } else {
        console.log(data)
        content = (
            <>
                {data && data.map((penghuni) => {
                    return (
                        <>
                            {
                                penghuni.isVeryfied && (
                                    <button
                                        className="border-2 rounded-md w-full h-36 hover:bg-slate-400"
                                        key={penghuni.id}
                                        onClick={()=> handleOpen(penghuni.id)}
                                    >
                                        <div className="grid place-content-center ">
                                            <p className="font-bold text-2xl  ">
                                                {penghuni.alamat}
                                            </p>
                                        </div>
                                    </button>
                                )
                            }
                        </>
                    )
                }

                )}



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

                    <Dialog open={open} >
                        <DialogHeader className="flex justify-between">
                            Form Pengunjung

                            <button className="w-6 h-6 p-2" onClick={handleOpen}>
                                x
                            </button>

                        </DialogHeader>
                            <DialogBody>
                                    <div className="flex flex-col gap-2">
                                        <Input label="Nama Pengunjung" onChange={e => setPengunjung(e.target.value)} />
                                        <Input label="Kepentingan" onChange={handleFillKepentingan} />

                                        {
                                            isLoadingNotif ? (
                                                <>
                                                    <Spinner className="h-5 w-5" />
                                                </>
                                            ) :
                                                <>
                                                    {
                                                        notif
                                                    }
                                                </>
                                        }
                                    </div>
                            </DialogBody>
                            <DialogFooter>
                                <div className="flex gap-2">
                                    <Button
                                        variant="text"
                                        color="red"
                                        disabled={disableButtonCancel? true: false}


                                        className="mr-1"
                                        onClick={handleCancel}
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                    <Button variant="gradient" color="green" disabled={disableButton ? true : false} onClick={() => {handleRequestMasuk(penghuniId, pengunjung, kepentingan), setIsOut(true)}}>
                                        <span>Meminta Akses Masuk</span>
                                    </Button>

                                    <Button variant="gradient" color="green" disabled={disableButton ? true : false} onClick={() => handleRequestKeluar(penghuniId, pengunjung, kepentingan)}>
                                        <span>Meminta Akses Keluar</span>
                                    </Button>
                                </div>
                            </DialogFooter>
                    </Dialog>


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