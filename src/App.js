import React, { useState } from 'react'
import images from './assets/images/jack-white-fsLwJuydkTY-unsplash.jpg';
import edit from './assets/images/edit-3-svgrepo-com.svg';
import deletebtn from './assets/images/delete-svgrepo-com.svg';
import clock from './assets/images/clock-0900-svgrepo-com.svg'
import { Switch } from '@mui/material';
import { styled } from '@mui/material/styles';



const App = () => {

  const [data,setData]=useState([
    { id:1,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:2,
      heading:"Master the art of...",
      content:"Learn to juggle three flaming torches while riding a unicycle. Start with basic juggling techniques and gradually progress to advanced fire juggling skills.",
      time:"Jan 21, 2025 4:24 PM",
      hide:false
    },
    { id:3,
      heading:"Master the art of...",
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
  
  return (
    <div className='div d-flex flex-column'>
      <header className='w-100 media-div-second pt-4 pb-1' style={{borderBottom:"1px solid lightgray"}}>
          <div className='media-div'>
           <div className='d-flex align-items-center justify-content-between width-fulls'>
            <div className='px-3 py-2 fw-normal hover-div rounded'>All</div>
            <div className='px-3 py-2 fw-normal hover-div rounded'>Active</div>
            <div className='px-3 py-2 fw-normal hover-div rounded' >Completed</div>
           </div>
            
            <div class="dropdown border-new width-full">
              <button style={{outline:"1px solid lightgray"}} class="btn  dropdown-toggle width-full" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Newest First
              </button>
              <ul class="dropdown-menu width-full" aria-labelledby="dropdownMenuButton1">
                <li>Action</li>
                <li>Another action</li>
                <li>Something else here</li>
              </ul>
                </div>
            </div>
            <div>
          </div>
          <div className='d-flex align-items-center justify-content-end width-full'>
            <button className='px-3 py-2 rounded border-0 text-white width-full' style={{backgroundColor:"black"}}>New Todo</button>
          </div>
      </header>
      <section className='w-100 mt-5 d-flex align-items-start justify-content-center'>
          <div className='width-75 d-flex align-items-center justify-content-center flex-column gap-4'>
                    {
                     data && Array.isArray(data) && data.map((opt)=>{
                    return <div className='w-100 media-container' key={opt.id} style={{border:"1px solid lightgray",borderRadius:"8px"}}>
                          <div className='media-img-div' style={opt.hide?{filter:"blur(2px)"}:null}><img className='media-img img-border' src={images} alt='images'/></div>
                          <div className='d-flex align-items-start justify-content-center flex-column width-75'>
                            <div className='d-flex align-items-center justify-content-between gap-3 w-100 pad-media-second' style={{borderBottom:"1px solid lightgray"}}>
                              <div className='header-fonts w-50 ' style={opt.hide?{textDecorationLine:"line-through",backgroundColor:"rgb(245,245,245,0.5)",filter:"blur(1px)"}:null}>{opt.heading}</div>
                              <div className='px-2 py-1 rounded hov'><img src={edit} alt='edit'/></div>
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

export default App