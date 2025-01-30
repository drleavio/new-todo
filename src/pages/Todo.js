import React, { useEffect, useRef, useState } from 'react'
import images from '../assets/images/jack-white-fsLwJuydkTY-unsplash.jpg';
import edit from '../assets/images/edit-3-svgrepo-com.svg';
import deletebtn from '../assets/images/delete-svgrepo-com.svg';
import clock from '../assets/images/clock-0900-svgrepo-com.svg'
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Parse from '../service/parse';
import { useNavigate } from 'react-router-dom';
import 'react-image-crop/dist/ReactCrop.css';
// import {canvasPreview} from '../utility/canvasPreview'
// import PhotoCrop from '../components/PhotoCrop';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'



const Todo = () => {
  const navigate=useNavigate()
  const user=useRef(null);
  const name=useRef(null);
  // const [show,setShow]=useState(false);
  const [crop,setCrop]=useState()
  const imgRef=useRef(null);
  const [completedCrop, setCompletedCrop]=useState(null)
  const [aspect, setAspect] = useState()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  // const [croppedImage,setCroppedImage]=useState()

  const [data,setData]=useState([])
  const handleHide=async(id)=>{
    // setData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === id ? { ...item, hide: !item.hide } : item
    //   )
    // );
    const Task = Parse.Object.extend("todoapp");
    const query = new Parse.Query(Task);
    const task = await query.get(id);
    try {
      console.log(task);
      
      task.set('hide',!task.attributes.hide);
      await task.save();
      await fetchData()
    } catch (error) {
      console.log('error deleting the data');
      
    }
  }
  const [selectedItem,setSelectedItem]=useState(null);
  const handleDelete=async(id)=>{
    const Task = Parse.Object.extend("todoapp");
    const query = new Parse.Query(Task);
    const task = await query.get(id);
    try {
      await task.destroy();
      await fetchData()
    } catch (error) {
      console.log('error deleting data');
      
    }
    const modal=document.getElementById('exampleModal')
    if(modal) modal.click();
  }
  const [addItem,setAddItem]=useState({
      heading:"",
      content:"",
      pic:""
  })
  const handlenewItem=(e)=>{
    const {name,value}=e.target;
    setAddItem({
      ...addItem,
      [name]:value
    })
  }
  // function giveTime(date_format){
  //   // const date_format=new Date().toLocaleString().split(',');
  //   const date=date_format[0];
  //   const time=date_format[1];
  //   const times=time.split(':');
  //   let greet;
  //   if(times[0]>12) greet='PM';
  //   if(times[0]<=12) greet='AM';
  //   let hour=times[0]%12;
  //   const month=date.split('/');
  //   const month_name=month[1];
  //   let mon;
  //   switch(month_name){
  //     case '01':mon='Jan'; break;
  //     case '02':mon='Fab'; break;
  //     case '03':mon='Mar'; break;
  //     case '04':mon='Apr'; break;
  //     case '05':mon='May'; break;
  //     case '06':mon='Jun'; break;
  //     case '07':mon='Jul'; break;
  //     case '08':mon='Aug'; break;
  //     case '09':mon='Sep'; break;
  //     case '10':mon='Oct'; break;
  //     case '11':mon='Nov'; break;
  //     case '12':mon='Dec'; break;
  //     default:mon='not'; break;
  //   }
  //   return mon + ' '+month[0]+', '+month[2]+' '+hour+':'+times[1]+' '+greet
  // }
  const addNewItem=async()=>{
    // const maxId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;
    const newdata = Parse.Object.extend("todoapp");
    const newuser = new newdata();
    newuser.set('heading',addItem.heading);
      newuser.set('content',addItem.content);
      newuser.set('userid',user.current.id);
      newuser.set('image',croppedImage)
    try {
      
      const response=await newuser.save();
      console.log('data-added',response);
      await fetchData();
      setAddItem({
        heading:"",
        content:"",
        
      })
      setCroppedImage(null)
      // setShow(false);
      const modal=document.getElementById('addModal')
    if(modal) modal.click();
    } catch (error) {
      console.log('error saving data',error);
      const modal=document.getElementById('addModal')
    if(modal) modal.click();
      
    }
   
   
    // const newItem={
    //   id:maxId+1,
    //   heading:addItem.heading,
    //   content:addItem.content,
    //   time:giveTime(),
    //   hide:false
    // }
    // setData((prev)=>[...prev,newItem])
    // setAddItem({
    //   heading:"",
    //   content:""
    // })
    
  }
  // const [pic,setPic]=useState(null);
  const [editId,setEditId]=useState(null);
  const [editHeader,setEditHeader]=useState("");
  const [editContent,setEditContent]=useState("");
  const handleEditId=(opt)=>{
        setEditId(opt.id);
        setEditHeader(opt.attributes.heading);
        setEditContent(opt.attributes.content)
        
        
  }
  const handleUpdate=async(id)=>{
    // console.log(editId,editHeader);
    // setData((prevData) =>
    //   prevData.map((item) =>
    //     item.id === editId ? { ...item, heading:editHeader,content:editContent,time:giveTime() } : item
    //   )
    // );
    const Task = Parse.Object.extend("todoapp");
    const query = new Parse.Query(Task);
    const task = await query.get(id);
    try {
      task.set('heading',editHeader);
      task.set('content',editContent);
      await task.save();
      setEditId(null);
      setEditHeader(null);
      setEditContent(null);
      await fetchData()
      const modal=document.getElementById('editModal')
    if(modal) modal.click();
    } catch (error) {
      console.log('error updating ');
      
      const modal=document.getElementById('editModal')
    if(modal) modal.click();
    }
   
    
  }
  const [states,setStates]=useState('all');
  const [btn,setBtn]=useState('Newest First');
  
  
  const logout=async()=>{
    try {
      await Parse.User.logOut();
      user.current=null
      navigate('/')
      console.log("User logged out!");
    } catch (error) {
      console.error("Error while logging out:", error.message);
    }
  }
  
  const fetchData=async()=>{
    const Product = Parse.Object.extend("todoapp");
    const query = new Parse.Query(Product);
    if(btn==='Newest First'){
      query.descending('createdAt');
    }else if(btn==='Oldest first'){
      query.ascending('createdAt')
    }else if(btn==='Newest updated first'){
      query.descending('updatedAt')
    }else if(btn==='Oldest updated first'){
      query.ascending('updatedAt')
    }
      try {
        query.equalTo('userid',user.current.id);
        const response=await query.find({ useMasterKey: true, allowDiskUse: true });
        setData(response)
      } catch (error) {
        console.log('error fetching the data',error);
        
      }
  }
  useEffect(()=>{
    const loggedIn=Parse.User.current();
    console.log(loggedIn);
    
    if(!loggedIn){
        navigate('/')
    }
    user.current=loggedIn;
    name.current=loggedIn.attributes.username
    console.log('user-session',user.current.id,name.current);
    fetchData();
},[btn])

  const handleImageChange=(e)=>{
      console.log(e);
      const file=e.target.files[0];
      if(file){
        if(file.size>2*1024*1024){
          alert("file size is greater then 2MB");
          return;
        }
        if(!["image/jpeg", "image/png"].includes(file.type)){
          alert("Invalid file type. Only JPEG and PNG are allowed.");
          return;
        }
        const reader=new FileReader();
        reader.onload=()=>{
          setAddItem({
            ...addItem,
            [e.target.name]:reader.result
          })
        }
        reader.readAsDataURL(file)
      }
      
  }
  const [croppedImage, setCroppedImage] = useState(null);
  const handleCropComplete = (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    setAddItem({
      image:"",
    })
    
  };

  function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
  // const previewCanvasRef = useRef(null)
  async function onDownloadCropClick() {
    const image = imgRef.current;
    if (!image || !completedCrop) {
      throw new Error("Crop data does not exist");
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    // Create an offscreen canvas with the correct size
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
  
    if (!ctx) {
      throw new Error("No 2D context");
    }
  
    // Draw the cropped portion from the original image
    ctx.drawImage(
      image,
      completedCrop.x * scaleX, // Crop X position
      completedCrop.y * scaleY, // Crop Y position
      completedCrop.width * scaleX, // Crop width
      completedCrop.height * scaleY, // Crop height
      0,
      0,
      offscreen.width,
      offscreen.height
    );
  
    // Convert the canvas content to a Blob
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
  
    // Read Blob as Data URL
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    setAddItem({
      pic:""
    })
    reader.onloadend = () => {
      setCroppedImage(reader.result); // Set the Data URL in state
      console.log("Cropped Image Data URL:", reader.result); // Debugging
    };
  }
  
  
  useEffect(() => {
    console.log("Updated Cropped Image:", croppedImage);
  }, [croppedImage]);
  
    

    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current)
    // }
    // blobUrlRef.current = URL.createObjectURL(blob)

    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current
    //   hiddenAnchorRef.current.click()
    // }
  
  
  return (
    <div className='div d-flex flex-column'>
      <header className='w-100 media-div-second pt-4 pb-1' style={{borderBottom:"1px solid lightgray"}}>
          <div className='media-div'>
           <div className='d-flex align-items-center justify-content-between width-fulls gap-1'>
            <div style={states==='all'? {backgroundColor:"lightgray"}:null} className='px-3 py-2 fw-normal hover-div rounded' onClick={()=>setStates('all')}>All</div>
            <div style={states==='active' ?{backgroundColor:"lightgray"}:null} className='px-3 py-2 fw-normal hover-div rounded' onClick={()=>setStates('active')}>Active</div>
            <div style={states==='completed'?{backgroundColor:"lightgray"}:null} className='px-3 py-2 fw-normal hover-div rounded' onClick={()=>setStates('completed')}>Completed</div>
           </div>
            
            <div className="dropdown border-new width-full d-flex align-items-center justify-content-start" style={{width:"100%"}}>
              <button style={{outline:"1px solid lightgray"}} className="btn  dropdown-toggle width-full d-flex align-items-center justify-content-between" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                {btn}
              </button>
              <ul className="dropdown-menu width-fulls" aria-labelledby="dropdownMenuButton1">
                <li className='p-2 hover-class rounded' onClick={()=>setBtn('Newest first')}>Newest first</li>
                <li className='p-2 hover-class rounded' onClick={()=>setBtn('Oldest first')}>Oldest first</li>
                <li className='p-2 hover-class rounded' onClick={()=>setBtn('Newest updated first')}>Newest updated first</li>
                <li className='p-2 hover-class rounded' onClick={()=>setBtn('Oldest updated first')}>Oldest updated first</li>
              </ul>
                </div>
            </div>
            <div>
          </div>
          
          <div className='d-flex align-items-center justify-content-end width-max gap-2'>
            <button className='px-3 py-2 rounded border-0 text-white width-max' style={{backgroundColor:"black"}} data-bs-toggle="modal" data-bs-target="#addModal">New Todo</button>
            {user &&<button className='px-3 py-2 rounded border-0 text-white width-max' style={{backgroundColor:"black"}} onClick={()=>logout()}>Logout</button>}
          </div>
         <div className="modal fade " id="addModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add a new Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body w-100" style={{position:"relative"}}>
        <div className="w-100 d-flex align-items-center justify-content-center flex-column gap-2">
          <label className="w-100 d-flex align-items-center justify-content-start fs-4">Title</label>
          <input className="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" type="text" placeholder="Title" name="heading" onChange={handlenewItem}/>
          <label className="w-100 d-flex align-items-center justify-content-start fs-4">Content</label>
          <input className="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" type="text" placeholder="Add some content" name="content" onChange={handlenewItem} />
          
           {/* <div style={{height:"300px",width:"100%"}}></div> */}
           <div>
           {
              (addItem.pic && !croppedImage) && 
              <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              //  minWidth={500}
              minHeight={100}
              // circularCrop
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={addItem.pic}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)`,height:"350px",width:"450px" }}
                onLoad={onImageLoad}
                className='d-flex align-items-center justify-content-center'
              />
            </ReactCrop>
            }
            {
              (!!completedCrop && !croppedImage) &&
            <button className='w-100 px-1 bg-primary rounded fs-4' onClick={onDownloadCropClick}>crop</button>
            }
            {
              croppedImage && <img style={{display:"block",height:"350px",width:"450px"}} src={croppedImage} alt='crop'/>
            }
            
             {/* {croppedImage && (
              <img
                src={croppedImage}
                alt="preview"
                style={{ height: "300px", width: "100%" }}
              />
            )} */}
           </div>
            
            <div className='w-100 d-flex align-items-center justify-content-center fs-5 bg-primary rounded px-2 py-1 text-white my-1 flex-column'>
           
            <label htmlFor='img-add'>Add an Image</label>
          <input id='img-add' style={{display:"none"}} name='pic' accept='image/*' type='file' onChange={handleImageChange}/>
          </div>
          
        </div>
      </div>
      <div className="modal-footer d-flex align-items-center justify-content-center flex-row gap-2">
        <button type="button" className="btn btn-primary w-100 py-2 px-2 rounded" onClick={()=>addNewItem()}>Add</button>
        <button type="button" className="btn btn-secondary w-100 py-2 px-2 rounded" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

      </header>
      <div className='d-flex gap-2 fs-4 fw-normal my-2'>
            Welcome <div className='fw-bolder'>{name.current}</div>
          </div>
      <section className='w-100 mt-5 d-flex align-items-start justify-content-center'>
          <div className='width-75 d-flex align-items-center justify-content-center flex-column gap-4'>
                    {
                      states==='completed'? data.map((opt)=>{
                          return <div className='w-100 media-container' key={opt.id} style={opt.attributes.hide ?{border:"1px solid lightgray",borderRadius:"8px"}:{display:"none"}}>
                          <div className='media-img-div' style={opt.attributes.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={opt.attributes.image || images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.attributes.heading}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                      <div className='w-100 d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Title</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editHeader} type='text' placeholder='Title' name='heading' onChange={(e)=>setEditHeader(e.target.value)}/>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Content</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editContent} type='text' placeholder='Add some content' name='content' onChange={(e)=>setEditContent(e.target.value)}/>
                                      </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={()=>handleUpdate()}>Update</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSelectedItem(opt.id)}><img src={deletebtn} alt='delete'/></div>
                                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                      This action cannot be undone. This will permanently delete your todo and remove your data from our servers.
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-primary" onClick={()=>handleDelete(opt.id)}>Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>                              
                              {
                                  opt.attributes.hide? <IOSSwitch sx={{ m: 1 }} defaultChecked onClick={()=>handleHide(opt.id)}/> : <IOSSwitch sx={{ m: 1 }} onClick={()=>handleHide(opt.id)}/> 
                                }
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.attributes.content}
                                </div>
                               <div className='d-flex align-items-center justify-content-start pad-media-second gap-3'>
                               <div className='d-flex align-items-center justify-content-start gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.attributes.createdAt.toLocaleString()}</div>
                                </div>
                                { (opt.attributes.updatedAt && opt.attributes.updatedAt.toLocaleString()!==opt.attributes.createdAt.toLocaleString()) &&
                                 <div className='d-flex align-items-center justify-content-start gap-1'>
                                 <div className='mb-1'><img src={clock} alt='clock'/></div>
                                 <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>updated at {opt.attributes.updatedAt.toLocaleString()}</div>
                               </div>
                              }
                               </div>
                            </div>
                          </div>
                    </div>
                      }):
                      states==='active'?data.map((opt)=>{
                        return <div className='w-100 media-container' key={opt.id} style={!opt.attributes.hide?{border:"1px solid lightgray",borderRadius:"8px"}:{display:"none"}}>
                          <div className='media-img-div' style={opt.attributes.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={opt.attributes.image || images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.attributes.heading}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                      <div classname="w-100 d-flex align-items-center justify-content-center flex-column gap-2">
                                        <label classname="w-100 d-flex align-items-center justify-content-start fs-4">Title</label>
                                        <input classname="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" defaultValue="{editHeader}" type="text" placeholder="Title" name="heading" onChange={(e)=>setEditHeader(e.target.value)}/>
                                        <label classname="w-100 d-flex align-items-center justify-content-start fs-4">Content</label>
                                        <input classname="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" defaultValue="{editContent}" type="text" placeholder="Add some content" name="content" onchange={(e)=> setEditContent(e.target.value)}/>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-primary" onClick={()=>handleUpdate()}>Update</button>
                                    </div>
                                  </div>
                                </div>

                                </div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSelectedItem(opt.id)}><img src={deletebtn} alt='delete'/></div>
                               <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                      This action cannot be undone. This will permanently delete your todo and remove your data from our servers.
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-primary" onClick="{()=">handleDelete(opt.id){'}'}&gt;Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>                              
                              {
                                  opt.attributes.hide? <IOSSwitch sx={{ m: 1 }} defaultChecked onClick={()=>handleHide(opt.id)}/> : <IOSSwitch sx={{ m: 1 }} onClick={()=>handleHide(opt.id)}/> 
                                }
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.attributes.content}
                                </div>
                                <div className='d-flex align-items-center justify-content-start pad-media-second gap-3'>
                               <div className='d-flex align-items-center justify-content-start  gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.attributes.createdAt.toLocaleString()}</div>
                                </div>
                                { (opt.attributes.updatedAt && opt.attributes.updatedAt.toLocaleString()!==opt.attributes.createdAt.toLocaleString()) &&
                                 <div className='d-flex align-items-center justify-content-start gap-1'>
                                 <div className='mb-1'><img src={clock} alt='clock'/></div>
                                 <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>updated at {opt.attributes.updatedAt.toLocaleString()}</div>
                               </div>
                              }
                               </div>
                            </div>
                          </div>
                    </div>
                      })
                     :data && Array.isArray(data) && data.map((opt)=>{
                    return <div className='w-100 media-container' key={opt.id} style={{border:"1px solid lightgray",borderRadius:"8px"}}>
                          <div className='media-img-div' style={opt.attributes.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={opt.attributes.image || images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.attributes.heading}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                      <div className='w-100 d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Title</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editHeader} type='text' placeholder='Title' name='heading' onChange={(e)=>setEditHeader(e.target.value)}/>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Content</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editContent} type='text' placeholder='Add some content' name='content' onChange={(e)=>setEditContent(e.target.value)}/>
                                       
                                      </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={()=>handleUpdate(opt.id)}>Update</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSelectedItem(opt.id)}><img src={deletebtn} alt='delete'/></div>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div className="modal-dialog">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div className="modal-body">
                                      This action cannot be undone. This will permanently delete your todo and remove your data from our servers.
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" className="btn btn-primary" onClick={()=>handleDelete(opt.id)}>Delete</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div>     
                                {
                                  opt.attributes.hide? <IOSSwitch sx={{ m: 1 }} defaultChecked onClick={()=>handleHide(opt.id)}/> : <IOSSwitch sx={{ m: 1 }} onClick={()=>handleHide(opt.id)}/> 
                                }                         
                               
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.attributes.content}
                                </div>
                                <div className='d-flex align-items-center justify-content-start pad-media-second gap-3'>
                               <div className='d-flex align-items-center justify-content-start gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.attributes.createdAt.toLocaleString()}</div>
                                </div>
                                { (opt.attributes.updatedAt && opt.attributes.updatedAt.toLocaleString()!==opt.attributes.createdAt.toLocaleString()) &&
                                 <div className='d-flex align-items-center justify-content-start gap-1'>
                                 <div className='mb-1'><img src={clock} alt='clock'/></div>
                                 <div style={opt.attributes.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>updated at {opt.attributes.updatedAt.toLocaleString()}</div>
                               </div>
                              }
                               </div>
                            </div>
                          </div>
                    </div>
                    })
                    }
          </div>
      </section>
    </div>
  )
}

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}));

export default Todo