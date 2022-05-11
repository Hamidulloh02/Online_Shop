import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Navbar from './Navbar'

// Material UI start
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from '@mui/material/Badge';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Delete } from "@mui/icons-material";
import { style } from "@mui/system";
// Material UI end

//Color start-->
// const [but_color, setbutt_color] = useState('black');
// color end --->


function Test_api(props) {
  const inc = 1;
  const dec = -1;

  const title = useRef();
  const price = useRef();
  const photo_src = useRef();
  const [Count, setCount] = useState([]);
  const [Total, setTotal] = useState(0);
  const [Bage, setBage] = useState(0);
  const [Baketdata, setBasketdata] = useState([]);
  const [Posts, setPosts] = useState([])
  const [Miqdor, setMiqdor] = useState(0)
  const [selects, setselect] = useState(0);

  const [filter, setfilter] = useState('');

  //Color start-->
  const [bgClr, setBgClr] = useState("blue");
  // color end --->
  const searchTitle = (event) => {
    setfilter(event.target.value);
  }

  let dataSearch = Count.filter(item => {
    if (item.Price > selects) {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
    }

  })

  useEffect(() => {
    Axios
      .get(" https://api.npoint.io/1125f151215a1583fccd")
      .then((response) => {
        setCount(response.data.Search)
      });
  }, []);
  useEffect(() => {
    console.log(Baketdata)
  }, [Baketdata])
  // this.props.map((e) => {
  //   console.log(e)
  // })

  function butt_func(index) {
    if(Baketdata.length>0){
      Baketdata.map((e) => {
        if(Count[index].Title != e.Title){
          setBasketdata([...Baketdata, Count[index]])
        } 
      })
    }
    setBasketdata([...Baketdata, Count[index]])
    setTotal(Total + parseInt(Count[index].Price))
    setBage(Bage + 1)
    Count.filter((e) => {
      if (parseInt(e.id) === index) {
        // setBgClr('grey')
      }
    })
  }

  function Delete(index) {
    let d = [...Baketdata]
    d.splice(index, 1)
    setBasketdata(d)
    setTotal(Total - Baketdata[index].Price)
    setBage(Bage - 1)
  }

  function korish() {
    let a = [...Posts]
    a.push(
      {
        Title: title.current.value,
        Price: price.current.value,
        Poster: photo_src.current.value
      }
    )
    setPosts(a)
    title.current.value = ''
    price.current.value = ''
    photo_src.current.value = ''
    // Posts.map((e) => {
    //   console.log(e)
    // })
    setCount([...Count, a])
    a.map((e) => {
      Count.push(
        {  
          "Title": e.Title,
          "Price": e.Price,
          "Poster": e.Poster
        }
      )
    })

    Count.map((e) => {
      console.log(e)
    })
  }
  function cartFunc(id, n){

    Count.map((a, i) => {
      let x = Count;
      if(a.id === id){
          x[i].count = +x[i].count + n*1;
          console.log(x[i].count)
          return(
            setCount(x)
          )
          
         
      }
    })
  }
  return (
    <>
      {/* <div className="Menu_phone">
        <AddCircleOutlineIcon class="icon_add" data-bs-toggle="modal" data-bs-target="#exampleModal01"/>
  </div>   */}
      <Navbar />
      <div className="elements">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={searchTitle.bind(this)}
            className="form-control input_search mx-auto"
          />
        </div>
        {/* <div className="container"> */}
        <h5 className="label">Min</h5>
        <div className="filter">
          <select value={selects} onChange={e => setselect(e.target.value)}>
            <option>200</option>
            <option>400</option>
            <option>650</option>
          </select>
        </div>
        {/* </div> */}
      </div>


      <div className="container mt-2">

        {/* Add--post---start--------> */}
        <div className="Modal">
          <button type="button" class="icon_add" data-bs-toggle="modal" data-bs-target="#exampleModal01">
            <AddCircleOutlineIcon />
          </button>
          <div class="modal fade " id="exampleModal01" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  {/* <input type="range"  class="range-min" min="0" max="10000" value="200000"/> */}
                  <input type="text" placeholder='Title' ref={title} className="form-control" />
                  <input type="text" placeholder='Price' ref={price} className="form-control" />
                  <input type="text" placeholder='Photo_src' ref={photo_src} className="form-control" />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button onClick={korish} className='btn btn-success'>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Add--post end-------> */}
        <div className="container">
          <div className="row">
            {
              (Count.length > 0) ?
                dataSearch.map((e, index) => {

                  return (
                    <>
                      <div className="col-4 col_4 card">
                        <ul>
                          <li><h5>{e.Title}</h5></li>
                          <li><img className="imges" src={e.Poster}></img></li>
                          <li><button className="btn bnt_add" style={{ background: bgClr, color: 'white' }} onChange="Add_btn" onClick={() => butt_func(index)} ><AddShoppingCartIcon />Add cart</button></li>
                          <li><span className="prices"><h6>Price:</h6>{e.Price}<h6>$</h6></span></li>
                        </ul>
                      </div>
                    </>
                  )
                })
                : <>
                  <Box className="render_circle">
                    <CircularProgress />
                  </Box>
                </>
            }
          </div>
        </div>
      </div>
      <div className="box mt-5">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Basket</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Setting</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Baketdata.length <=0 ?(
                      <div>
                          Cart empty
                      </div>
                    ):
                    Baketdata.map((e, index) => {
                        return (
                          <tr key={index}>
                            <td>{e.Title}</td>
                            <td>{e.Price}</td>
                            <td>X{e.count}</td>
                            <td>
                              <RemoveIcon className="me-2 color_icon bg-warning" onClick={() => cartFunc(e.id, dec)} />
                              <AddIcon className="me-2 color_icon bg-primary" onClick={() => cartFunc(e.id, inc)} />
                              <DeleteForeverIcon className="me-2 color_icon bg-danger" onClick={() => Delete(index)} />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="Tolovlar">
                <div className="container01">
                  <div className="row ms-4">
                    <div className="col-3">
                      <img className="tolov_photo mt-2" src="./photo/humo01.png" />
                    </div>
                    <div className="col-3">
                      <img className="tolov_photo mt-2" src="./photo/uzcard01.png" />
                    </div>
                    <div className="col-3">
                      <img className="tolov_photo mt-1" src="./photo/visa01.png" />
                    </div>
                    <div className="col-3">
                      <img className="tolov_photo1 mt-4" src="./photo/payme01.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <h4>Jami:{Total}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>   
      <div className="col-6 cart_icon">
        <Badge badgeContent={Bage} color="primary">
          <button type="button" class="icon" data-bs-toggle="modal" data-bs-target="#exampleModal" color="action">< AddShoppingCartIcon /></button>
        </Badge>
      </div>
      <div className="footer">
        <span className="ms-2"> Toshkent 2022 @Hamidullo_developer</span>
      </div>
    </>
  )
}

export default Test_api