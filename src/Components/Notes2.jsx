import React, { useEffect, useState } from 'react'

const Notes2 = () => {
    const [data,setData]=useState([])
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editedNote, setEditedNote] = useState({ title: '', body: '' });
    useEffect(()=>{
fetch("https://fuzzy-bull-pajamas.cyclic.app/notes/",{
    headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    },
    method:"GET"
}).then(res=>res.json())
.then(res=>{setData(res)
//console.log(res)
})
.catch(err=>console.log(err))
    },[]);
    
    const handledel=(noteid)=>{
      fetch(`https://fuzzy-bull-pajamas.cyclic.app/notes/delete/${noteid}`,{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        method:"DELETE"
      }).then(res=>{
        if(res.status===204){
          setData(data.filter((note)=>note._id!==noteid))
          console.log({"msg":"Note is deleted successfully"})
        }else{
          console.log("Failed to delete the Note")
        }
      }).catch(err=>console.log(err))
    }
    // const handleUpdate = (noteId) => {
    //     fetch(`https://fuzzy-bull-pajamas.cyclic.app/notes/update/${noteId}`, {
    //       method: "PUT",
    //       headers: {
    //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(editedNote),
    //     })
    //       .then((res) => {
    //         if (res.status === 200) {
    //           // Note was successfully updated
    //           // Clear the editing state
    //           setEditingNoteId(null);
    //           setEditedNote({ title: '', body: '' });
    //         } else {
    //           // Handle error (e.g., show an error message)
    //           console.error("Failed to update the note.");
    //         }
    //       })
    //       .catch((err) => {
    //         console.error("Error while updating the note:", err);
    //       });
    //   };
    const handleUpdate = (noteId) => {
        fetch(`https://fuzzy-bull-pajamas.cyclic.app/notes/update/${noteId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedNote),
        })
          .then((res) => {
            if (res.status === 200) {
              // Note was successfully updated
              // Clear the editing state
              setEditingNoteId(null);
              setEditedNote({ title: '', body: '' });
            } else {
              // Handle the error response
              console.error("Failed to update the note. Status:", res.status);
              return res.text().then((errorText) => {
                console.error("Error response text:", errorText);
              });
            }
          })
          .catch((err) => {
            console.error("Error while updating the note:", err);
          });
      };
      
      
      
      
      
      
      const handleEdit = (noteId, note) => {
        setEditingNoteId(noteId);
        setEditedNote({ title: note.title, body: note.body });
      };
    //console.log(data)
    if(data.length===0){
        return(
            <h1>No Any Note is created Yet!!</h1>
        )
    }
  return (
    <div><h3>Notes</h3>
    <div>
        {Array.isArray(data) ? (
          data.map((item) => (
            <div key={item._id}>
                {editingNoteId===item._id ?(<div>
                 <input type='text' value={editedNote.title} onChange={(e)=>setEditedNote({...editedNote,title:e.target.value})}/>
                 <textarea
                 value={editedNote.body}
                 onChange={(e)=>setEditedNote({...editedNote,body:e.target.value})}/>
                 <button onClick={()=>handleUpdate(item._id)}>Save</button></div>):(
                    <div>
              <h4>{item.title}</h4>
              <h5>{item.body}</h5>
              <p>User is: {item.username}</p>
              <button onClick={()=>handledel(item._id)}>Delete</button>
              <button onClick={()=>handleEdit(item._id,item)}>Edit</button>
            </div>
          )}
          </div>
          ))
          ) : (
          <p>Loading...</p> // Add a loading indicator if needed
        )}
      </div>
    </div>
    
    
    
  )
}

export default Notes2