import React, { useRef, useState, useEffect } from 'react'
import Test_api from './Test_api'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function AddPost() {
    let count = 0;
    const title = useRef();
    const price = useRef();
    const photo_src = useRef();
    const [Posts, setPosts] = useState(
        [
            {
                Title:"Campus",
                Price:"700",
                Poster:"https://assets.ajio.com/medias/sys_master/root/20220304/v1lK/62211a28f997dd03e200cdad/campus_blue_artemis_lace-up_running_shoes.jpg"
            }
        ]
    )
    function korish() {
        let a = [...Posts]
        a.push(
            {
                Title:title.current.value,
                Price:price.current.value,
                Poster:photo_src.current.value
            }
        )
        setPosts(a)
        title.current.value=''
        price.current.value=''
        photo_src.current.value=''
    }
  return (
    <div>
        <button type="button" class="icon_add" data-bs-toggle="modal" data-bs-target="#exampleModal01">
        <AddCircleOutlineIcon/>
        </button>
        <div class="modal fade" id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input type="text" placeholder='Title' ref={title} className="form-control"/>
                <input type="text" placeholder='Price' ref={price} className="form-control"/>
                <input type="text" placeholder='Photo_src' ref={photo_src} className="form-control"/>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={korish} className='btn btn-success'>Save</button>
            </div>
            </div>
        </div>
        </div>
        {
            Posts.map((e) =>{
                console.log(e)
            })
        }
        {/* <Test_api data={Posts} /> */}
    </div>
  )
}

export default AddPost