import React, { useContext, useEffect, useRef, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';

const YourPosts = () => {
  let store =useContext( AuthContext)
  console.log(store)
  console.log(store.userDetail._id)
  let id = store.userDetail._id
console.log(id)

const [yourposts, setyourposts] = useState([]);



  async function getyourposts(){
    let res= await fetch(`https://blog-backend-wvak.onrender.com/post/getAllPost/${id}`)
    let data =await res.json()
    console.log(data.allpost)
    setyourposts(data.allpost)

   }
   useEffect(()=>{
     getyourposts()

   },[])
  
   const handledelete =async (ans)=>{
    console.log(ans)
    let alertAns= window.confirm('are you sure you want to delete this post')
    console.log(alertAns)

    if(alertAns){
      let res=await fetch(`https://blog-backend-wvak.onrender.com/post/delete/${ans._id}`,{
        method:'DELETE'
      })
      let data =await res.json()
      console.log(data)
      getyourposts()
    }
   }

   let titleRef=useRef()
   let DescriptionRef=useRef()

   const [showform, setshowform] = useState(false);
   const [postId, setpostId] = useState('');

  const handleEdit =(ans)=>{
    console.log(ans)
    setpostId(ans._id)
    setshowform(true)

  }
const handlesubmit =async(e)=>{
  e.preventDefault();
  let obj={
   title:titleRef.current.value,
   description:DescriptionRef.current.value
  }
console.log(obj)
console.log(postId)

let res= await fetch(`https://blog-backend-wvak.onrender.com/post/${postId}`,{
  method:'PUT',
  headers:{
    'content-type':'application/json'
  },
  body:JSON.stringify(obj)
})
let data = await res.json()
console.log(data)
setshowform(false)
getyourposts()
}





  return (
<div className='contanier'>
<div className='row d-flex justify-content-center gap-2 '>
    {yourposts.map((ele)=>{
      return <div className="card" style={{width: '18rem'}}>
        
        <MdDelete onClick={()=>handledelete(ele)} className='deleteIcon'  size={30} color='red'/>


        <FaEdit onClick={()=>handleEdit(ele)} className='editIcon' size={25} color='red'/>



  <img src={ele.image} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{ele.title}</h5>
    <p className="card-text">{ele.description}</p>
    <Link to="/single" state={ele} className="btn btn-primary">Go somewhere</Link>
  </div>
</div>

    })}
   </div>


  {showform && <div className='col-md-4 p-3 fromYourPost'>
  <form>
  <button onClick={()=>setshowform(false)} type="button" class="btn-close bg-white" aria-label="Close"></button>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input ref={titleRef} type="email" className="form-control" id="title" aria-describedby="emailHelp" />
  </div>
 
  <div class="form-floating">
  <label for="floatingTextarea">Description</label>
  <textarea ref={DescriptionRef} class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
</div>


  
  <button onClick={handlesubmit} type="submit" className="btn btn-primary mt-2">Submit</button>
</form>

  </div>}
</div>
  )
}

export default YourPosts
