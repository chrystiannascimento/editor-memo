import React, { useState, useEffect, useRef} from 'react';
import ModalComponent from './Modal';
import  {addDoc} from './../Config';
import { useNavigate } from 'react-router-dom';


import axios from 'axios';
export default function Docs({
  database,
}) {
    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = useState('');
    const [docsData, setDocsData] = useState([]);

    const isMounted = useRef();
    let navigate = useNavigate();


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const addData = () => {
      addDoc('docs', {
          title: title,
          docsDesc: ''
      })
      .then(() => {
          alert('Data Added')
          handleClose(); 
      })
      .catch(() => {
          alert('Cannot add data')
      })
  }

  const getData = () => {
    axios.get('http://localhost:3000/docs')
    .then(function (response) { 
        console.log(response.data);
        setDocsData(response.data);
        return response.data;
    }).catch(function (error) {
        console.log(error);
    });
    
    
    
  }

  useEffect(() => {
    if(isMounted.current){
        return 
    }

    isMounted.current = true;
    getData()
}, [])

const getID = (id) => {
    navigate(`/editDocs/${id}`)
}

    return (
        <div className='docs-main'>
            <h1>Docs Clone</h1>

            <button
                className='add-docs'
                onClick={handleOpen}
            >
                Add a Document
            </button>

            <ModalComponent
                open={open}
                setOpen={setOpen}
                title={title}
                setTitle={setTitle}
                addData={addData} 
             />

<div className='grid-main'>
                {docsData.map((doc) => {
                    return (
                        <div className='grid-child' key={doc.id}  onClick={() => getID(doc.id)}>
                            <p>{doc.title}</p>
                        </div>
                    )
                })}
            </div>


        </div>
    )
}