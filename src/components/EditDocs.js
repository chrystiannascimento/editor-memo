import React, {useState, useMemo, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { Slate, Editable, withReact } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EditDocs() {
  const [isBusy, setIsBusy] = useState(true);
  const isMounted = useRef();
  let params = useParams();
  const [documentTitle, setDocumentTitle] = useState('');
  const [docsDesc, setDocsDesc] = useState(initialValue);
  const getQuillData = (value) => {
    console.log('quill')
    setDocsDesc(value)
  }
  useEffect(() => {
    const updateDocsData = setTimeout(() => {
    
      axios.put(`http://localhost:3000/docs/${params.id}`, {
        docsDesc: docsDesc,
        title: documentTitle
      })
      .then(function (response) {
          console.log(response.data);
          console.log(docsDesc);
          console.log('saved');
          toast.success('Document Saved', {
            autoClose: 2000
        })
          return response.data;
      }
      ).catch(function (error) {
        toast.error('Cannot Save Document', {
          autoClose: 2000
      })
          console.log(error);
      }
      );




    }, 1000);


    return () => clearTimeout(updateDocsData);
  }, [docsDesc]) // eslint-disable-line react-hooks/exhaustive-deps

  
    
    const getData = () => {
        axios.get(`http://localhost:3000/docs/${params.id}`)
        .then(function (response) {
            
            setDocsDesc(response.data.docsDesc);
            setDocumentTitle(response.data.title);
            setIsBusy(false);

            return response.data; 
        }
        ).catch(function (error) {
            console.log(error);
        }
        );
  }

  useEffect(() => {
    if (isMounted.current) {
        return
    }

    isMounted.current = true;
    getData()
}, [])
  

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    return (
      <>
      <div className='editDocs-main'>
            <h1>{documentTitle}</h1>
            <div className='editDocs-inner'>
        {isBusy ? (
          
          <div className='editDocs-loading'>
            </div>
            ) : (
              <Slate editor={editor}
      value={docsDesc}
      onChange={getQuillData}
      >
      <Editable placeholder="Enter some plain text..." />
    </Slate>


            )}
      
    </div>
    </div>
      </>
      
    )
}

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
]

