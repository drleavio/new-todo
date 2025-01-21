import React from 'react'
import images from './assets/images/jack-white-fsLwJuydkTY-unsplash.jpg'

const App = () => {
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
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
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
          <div className='w-50 d-flex align-items-center justify-content-center flex-column'>
                    <div className='w-100' style={{border:"1px solid lightgray",borderRadius:"8px"}}>
                          <div><img style={{height:"180px", width:"340px",borderRadius:"8px 0px 0px 8px"}} src={images}/></div>
                          <div></div>
                    </div>
          </div>
      </section>
    </div>
  )
}

export default App