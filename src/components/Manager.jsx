import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef()
    // another variable that helps to changes the passwor visibility type to visible or hidden
    const passwordref = useRef()

    // this state help to collect info from Form
    const [form, setform] = useState({ site: "", username: "", Password: "" })

    // storing Password in localstorage
    const [passwordArray, setPasswordArray] = useState([])

    // collecting input data from User/Browser
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    // this code changes icons when user toggle hidden / visible
    const showPassword = () => {

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordref.current.type = "password"
        }
        else {
            passwordref.current.type = "text"
            ref.current.src = "icons/eyecross.png"
        }
    }

    // function to save password and uuidv4 creates unique id's for each passwords 
    const savePassword = () => {
        if(form.site.length > 3 && form.username.length > 3 && form.Password.length > 3){
            
            setPasswordArray([...passwordArray, {...form, id : uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form, id : uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", Password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast("error: Password Not saved!")
        }
    }

    // function to Delete the password using uuidv4 id's
    const deletePassword = (id) =>{
        console.log("deleting password",id)
        let c = confirm("Do you really want delete?")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
        toast('Password Deleted!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    // editing the passwords
    const editPassword = (id) =>{
        console.log("editting password",id)
        setform(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }

    // 
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    //function to copy 
    const copytext = (text) => {
        navigator.clipboard.writeText(text)
        toast('🦄 Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" 
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className="p-3 md:mycontainer min-h-[88.2vh]">
                <h1 className='font-bold text-4xl text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>

                {/* item-center cause it flex-col */}
                <form onSubmit={(e)=>{e.preventDefault();savePassword();}} className="second-main text-black flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handlechange} placeholder='Enter Website URL ' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="site" id='site'/>
                    <div className="sec-inner flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter your Name' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="username" id='username' />

                        <div className="pass-sec relative">
                            <input ref={passwordref} value={form.Password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name="Password" id='Password' />
                            <span className='icons absolute right-[3px] top-[4px] cursor-pointer ' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button type="submit" className='flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-4 py-2 w-fit border border-gray-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vjgknpfx.json"
                            trigger="hover"
                            stroke="bold">
                        </lord-icon>
                        Save Password
                    </button>
                </form>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your password</h2>
                    {passwordArray.length === 0 && <div>No Password To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className="flex items-center justify-center">
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.site) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/kydcudfv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.username) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/kydcudfv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.Password}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copytext(item.Password) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/kydcudfv.json"
                                                    trigger="hover"
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}>
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center w-32 py-2 border border-white'>
                                        <span className='Edit-icon cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/exymduqj.json"
                                                trigger="hover"
                                                stroke="bold"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='Delete-icon cursor-pointer mx-1' onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/xyfswyxf.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
