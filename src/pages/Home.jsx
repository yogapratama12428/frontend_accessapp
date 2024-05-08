const Home = () => {

  const handleRequestMasuk = () => {
    console.log("masuk")
  }


  return (
    <div className="bg-white dark:bg-gray-900 h-screen dark:text-white">
        <div className="w-full flex flex-col gap-4">
            <div>
                <h1 className="text-2xl font-bold text-center ">
                    Welcome To Smart Gate Apps
                </h1>
            </div>
        
            <div className="w-full border-2 rounded-xl ">
            
                <div className="text-center ">
                    Silahkan Pilih Alamat Tujuan
                </div>
          
                <div className="grid grid-cols-3 gap-2 p-10 ">

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid place-content-center ">
                            <p className="font-bold text-2xl  ">
                                A
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                B
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                C
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                D
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                E
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                F
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                G
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                H
                            </p>
                        </div>
                    </button>

                    <button className="border-2 rounded-md w-full h-36 hover:bg-slate-400"   onClick={handleRequestMasuk} >
                        <div className="grid justify-items-center">
                            <p className="font-bold text-2xl text-center">
                                I
                            </p>
                        </div>
                    </button>
                </div>

            </div>

            <button 
                className="w-full border-2 rounded-xl py-2 px-5 text-center hover:bg-slate-400 font-bold text-lg"  
                onClick={handleRequestMasuk} 
                >
                
                Idzin akses
                   
            </button>
        </div>
    </div>
  )
}

export default Home