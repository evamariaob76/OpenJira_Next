import { ChangeEvent, useState, useContext } from 'react';

import { Box, Button, TextField } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesProvider } from '../../context/entries';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';




export const NewEntry = () => {
    const {addNewEntry} = useContext(EntriesContext);
    const {setIsAddingEntry, isAddingEntry} = useContext(UIContext)
    const [inputValue, setinputValue] = useState('');
    const [touched, settouched] = useState(false);
    
    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) =>{
        setinputValue (event.target.value)

    };

    const onSave = () =>{
        if(inputValue.length===0) return;
        addNewEntry(inputValue);
        setIsAddingEntry(false);
        settouched(false);
        setinputValue('')
       
    }


  return (
    <Box sx={{ marginBottom: 2, paddingX: 2 }}>
        {
            isAddingEntry ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{ marginTop: 2, marginBottom: 1 }}
                        placeholder='Nueva entrada'
                        autoFocus
                        multiline
                        label='Nueva entrada'
                        helperText={inputValue.length <=0 && touched && 'Ingrese un valor'}
                        error ={inputValue.length <=0 && touched }
                        value={inputValue}
                        onChange={onTextFieldChanges}
                        onBlur={()=> settouched (true)}
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='text'
                             onClick={() => setIsAddingEntry( false ) }


                        >
                            Cancelar
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={ <SaveOutlinedIcon /> }
                            onClick={onSave}
                        >
                            Guardar
                        </Button>
                    </Box>
                
                </>

            ):(
                    <Button
                        startIcon={ <AddIcon /> }
                        fullWidth
                        variant='outlined'
                         onClick={() => setIsAddingEntry( true ) }
                    
                    >
                        Agregar Tarea
                </Button>              
            )
        }
    

       

    
    
    </Box>
  )
}
