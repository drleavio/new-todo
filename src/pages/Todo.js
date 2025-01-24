import React, { useEffect, useState } from 'react'
import images from '../assets/images/jack-white-fsLwJuydkTY-unsplash.jpg';
import edit from '../assets/images/edit-3-svgrepo-com.svg';
import deletebtn from '../assets/images/delete-svgrepo-com.svg';
import clock from '../assets/images/clock-0900-svgrepo-com.svg'
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';



const Todo = () => {

  const [data,setData]=useState([
    { id:1,
      heading:"Master the art of gaming by playing the game",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 23, 2025 11:30 AM",
      hide:false
    },
    { id:2,
      heading:"Conquer Mount Everest",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 20, 1970 2:02 PM",
      hide:false
    },
    { id:3,
      heading:"Train a Dragon",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:4,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:5,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:6,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:7,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    }
  ])
  const handleHide=(id)=>{
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, hide: !item.hide } : item
      )
    );
  }
  const [selectedItem,setSelectedItem]=useState(null);
  const handleDelete=()=>{
    setData((prevData) => prevData.filter((item) => item.id !== selectedItem));
    setSelectedItem(null);
    const modal=document.getElementById('exampleModal')
    if(modal) modal.click();
  }
  const [addItem,setAddItem]=useState({
      heading:"",
      content:""
  })
  const handlenewItem=(e)=>{
    const {name,value}=e.target;
    setAddItem({
      ...addItem,
      [name]:value
    })
  }
  function giveTime(){
    const date_format=new Date().toLocaleString().split(',');
    const date=date_format[0];
    const time=date_format[1];
    const times=time.split(':');
    let greet;
    if(times[0]>12) greet='PM';
    if(times[0]<=12) greet='AM';
    let hour=times[0]%12;
    const month=date.split('/');
    const month_name=month[1];
    let mon;
    switch(month_name){
      case '01':mon='Jan'; break;
      case '02':mon='Fab'; break;
      case '03':mon='Mar'; break;
      case '04':mon='Apr'; break;
      case '05':mon='May'; break;
      case '06':mon='Jun'; break;
      case '07':mon='Jul'; break;
      case '08':mon='Aug'; break;
      case '09':mon='Sep'; break;
      case '10':mon='Oct'; break;
      case '11':mon='Nov'; break;
      case '12':mon='Dec'; break;
      default:mon='not'; break;
    }
    return mon + ' '+month[0]+', '+month[2]+' '+hour+':'+times[1]+' '+greet
  }
  const addNewItem=()=>{
    const maxId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;
   
   
    const newItem={
      id:maxId+1,
      heading:addItem.heading,
      content:addItem.content,
      time:giveTime(),
      hide:false
    }
    setData((prev)=>[...prev,newItem])
    setAddItem({
      heading:"",
      content:""
    })
    const modal=document.getElementById('addModal')
    if(modal) modal.click();
  }
  const [editId,setEditId]=useState(null);
  const [editHeader,setEditHeader]=useState("");
  const [editContent,setEditContent]=useState("");
  const handleEditId=(opt)=>{
        setEditId(opt.id);
        setEditHeader(opt.heading);
        setEditContent(opt.content)
        
        
  }
  const handleUpdate=()=>{
    // console.log(editId,editHeader);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === editId ? { ...item, heading:editHeader,content:editContent,time:giveTime() } : item
      )
    );
    setEditId(null);
    setEditHeader(null);
    setEditContent(null);
    const modal=document.getElementById('editModal')
    if(modal) modal.click();
  }
  const [states,setStates]=useState('all');
  const [btn,setBtn]=useState('Newest First');
  useEffect(()=>{
      if(btn==='Newest updated first'){
        data.sort((a,b)=> new Date(a.time) - new Date(b.time))
      }else if(btn==='Oldest updated first'){
        data.sort((a,b)=> new Date(b.time) - new Date(a.time))
      }
  },[btn,data])
  
  
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
          <div className='d-flex align-items-center justify-content-end width-max'>
            <button className='px-3 py-2 rounded border-0 text-white width-max' style={{backgroundColor:"black"}} data-bs-toggle="modal" data-bs-target="#addModal">New Todo</button>
          </div>
         <div className="modal fade " id="addModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add a new Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body w-100">
        <div className="w-100 d-flex align-items-center justify-content-center flex-column gap-2">
          <label className="w-100 d-flex align-items-center justify-content-start fs-4">Title</label>
          <input className="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" type="text" placeholder="Title" name="heading" onchange={handlenewItem}/>
          <label className="w-100 d-flex align-items-center justify-content-start fs-4">Content</label>
          <input className="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" type="text" placeholder="Add some content" name="content" onchange={handlenewItem} />
        </div>
      </div>
      <div className="modal-footer d-flex align-items-center justify-content-center flex-row gap-2">
        <button type="button" className="btn btn-primary w-100 py-2 px-2 rounded" onclick={()=>addNewItem()}>Add</button>
        <button type="button" className="btn btn-secondary w-100 py-2 px-2 rounded" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

      </header>
      <section className='w-100 mt-5 d-flex align-items-start justify-content-center'>
          <div className='width-75 d-flex align-items-center justify-content-center flex-column gap-4'>
                    {
                      states==='completed'? data.map((opt)=>{
                          return <div className='w-100 media-container' key={opt.id} style={opt.hide ?{border:"1px solid lightgray",borderRadius:"8px"}:{display:"none"}}>
                          <div className='media-img-div' style={opt.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.heading.length<22?opt.heading:opt.heading.substring(0,22)+'...'}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                      <div className='w-100 d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Title</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editHeader} type='text' placeholder='Title' name='heading' onChange={(e)=>setEditHeader(e.target.value)}/>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Content</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editContent} type='text' placeholder='Add some content' name='content' onChange={(e)=>setEditContent(e.target.value)}/>
                                      </div>
                                      </div>
                                      <div className="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" onClick={()=>handleUpdate()}>Update</button>
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
                                      <button type="button" className="btn btn-primary" onclick={()=>handleDelete(opt.id)}>Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>                              
                                <IOSSwitch sx={{ m: 1 }}  onClick={()=>handleHide(opt.id)}/> 
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.content}
                                </div>
                                <div className='d-flex align-items-center justify-content-start pad-media-second gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.time}</div>
                                </div>
                            </div>
                          </div>
                    </div>
                      }):
                      states==='active'?data.map((opt)=>{
                        return <div className='w-100 media-container' key={opt.id} style={!opt.hide?{border:"1px solid lightgray",borderRadius:"8px"}:{display:"none"}}>
                          <div className='media-img-div' style={opt.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.heading.length<22?opt.heading:opt.heading.substring(0,22)+'...'}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div className="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                    </div>
                                    <div className="modal-body">
                                      <div classname="w-100 d-flex align-items-center justify-content-center flex-column gap-2">
                                        <label classname="w-100 d-flex align-items-center justify-content-start fs-4">Title</label>
                                        <input classname="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" defaultValue="{editHeader}" type="text" placeholder="Title" name="heading" onchange={(e)=>setEditHeader(e.target.value)}/>
                                        <label classname="w-100 d-flex align-items-center justify-content-start fs-4">Content</label>
                                        <input classname="w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded" defaultValue="{editContent}" type="text" placeholder="Add some content" name="content" onchange={(e)=> setEditContent(e.target.value)}/>
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                      <button type="button" className="btn btn-primary" onclick={()=>handleUpdate()}>Update</button>
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
                                      <button type="button" className="btn btn-primary" onclick="{()=">handleDelete(opt.id){'}'}&gt;Delete</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>                              
                                <IOSSwitch sx={{ m: 1 }}  onClick={()=>handleHide(opt.id)}/> 
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.content}
                                </div>
                                <div className='d-flex align-items-center justify-content-start pad-media-second gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.time}</div>
                                </div>
                            </div>
                          </div>
                    </div>
                      })
                     :data && Array.isArray(data) && data.map((opt)=>{
                    return <div className='w-100 media-container' key={opt.id} style={{border:"1px solid lightgray",borderRadius:"8px"}}>
                          <div className='media-img-div' style={opt.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.heading.length<22?opt.heading:opt.heading.substring(0,22)+'...'}</div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>handleEditId(opt)}><img src={edit} alt='edit'/></div>
                              <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                      <div className='w-100 d-flex align-items-center justify-content-center flex-column gap-2'>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Title</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editHeader} type='text' placeholder='Title' name='heading' onChange={(e)=>setEditHeader(e.target.value)}/>
                                        <label className='w-100 d-flex align-items-center justify-content-start fs-4'>Content</label>
                                        <input className='w-100 d-flex align-items-center justify-content-start px-2 py-2 rounded' value={editContent} type='text' placeholder='Add some content' name='content' onChange={(e)=>setEditContent(e.target.value)}/>
                                      </div>
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" onClick={()=>handleUpdate()}>Update</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div className='px-2 py-1 rounded hov' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>setSelectedItem(opt.id)}><img src={deletebtn} alt='delete'/></div>
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Are you absolutely sure?</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                      </div>
                                      <div class="modal-body">
                                      This action cannot be undone. This will permanently delete your todo and remove your data from our servers.
                                      </div>
                                      <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                        <button type="button" class="btn btn-primary" onClick={()=>handleDelete(opt.id)}>Delete</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              <div>                              
                                <IOSSwitch sx={{ m: 1 }}  onClick={()=>handleHide(opt.id)}/> 
                              </div>
                            </div>
                            <div>
                                <div className='pad-media fonts' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>
                                {opt.content}
                                </div>
                                <div className='d-flex align-items-center justify-content-start pad-media-second gap-1'>
                                  <div className='mb-1'><img src={clock} alt='clock'/></div>
                                  <div style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null} className='sm-fonts'>{opt.time}</div>
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