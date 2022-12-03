import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

const Home = () => {
    const [selectedDirectory, setSelectedDirectory] = useState("")
    const todoNameRef = useRef()

    function handleClearTodos() {
        electron.directoryApi.openDirectory();
    }

    const bc = new BroadcastChannel("directory_choosen");
    bc.onmessage = (event) => {
        let value = JSON.parse(event.data);
        console.log(value["path"])
        setSelectedDirectory(value["path"])
    };

    useEffect(() => {
        todoNameRef.current.value = selectedDirectory;
      }, [selectedDirectory])

    return <>
        <p><h1>Home</h1></p>
        <p><TextField id="standard-basic" label="" variant="standard" inputRef={todoNameRef} disabled fullWidth/></p>
        <p><Button variant="outlined" onClick={handleClearTodos}>Choose Folder</Button></p>
    </>;
  };
  
export default Home;