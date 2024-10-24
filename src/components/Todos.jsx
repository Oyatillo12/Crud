import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CustomTable from './CustomTable'
import { addTodo, deleteTodo, updateTodo } from '../redtool/slices/crudSlice';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import LoadingImg from '../assets/images/loading.png';

function Todos() {
    const todos = useSelector(state => state.crud.todos)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [newTodo, setNewTodo] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")
    const [updatedTodo, setUpdatedTodo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = React.useState('');


    const [searchValue, setSearchValue] = useState('')
    const searchedTodos = searchValue !== '' ? todos.filter(item => item.title.toLowerCase().includes(searchValue)) : todos

    const tHeadValue = [
        {
            id: 1,
            title: "ID"
        },
        {
            id: 2,
            title: "Name"
        },
        {
            id: 3,
            title: "Email Address"
        },
        {
            id: 4,
            title: "Phone Number"
        },
        {
            id: 5,
            title: "Action"
        },

    ]
    function handleUserAdd() {
        setOpen(true)
        setUpdatedTodo(null)
        setNewTodo("")
        setEmail("")
        setTel("")
    }
    function handleAddSubmit(e) {
        e.preventDefault();
        setLoading(true)
        const data = {
            id: todos.length ? todos[todos.length - 1].id + 1 : 1,
            title: newTodo,
            email,
            tel
        }
        if (updatedTodo !== null) {
            dispatch(updateTodo({ id: updatedTodo.id, title: newTodo, email, tel, }))
        }
        else {
            dispatch(addTodo(data))
        }
        setTimeout(() => {
            setLoading(false)
        }, 700)
        setUpdatedTodo(null)
        setOpen(false)
        setNewTodo("")
        setEmail("")
        setTel("")
    }
    function handleSearch(e) {
        setLoading(true)
        setTimeout(() => {
            setSearchValue(e.target.value)
            setLoading(false)
        }, 500)
    }

    function handleEditCrud(todo) {
        setOpen(true)
        setUpdatedTodo(todo)
        setEmail(todo.email)
        setTel(todo.tel)
        setNewTodo(todo.title)
    }
    function handleDeleteClicked(id) {
        setDeleteId(id)
        setDeleteOpen(true)
    }
    function handleDeleted() {
        dispatch(deleteTodo(deleteId))
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setUpdatedTodo(null)
            setOpen(false)
            setNewTodo("")
            setEmail("")
            setTel("")
        },1000)
        setDeleteOpen(false)
        setDeleteId('')
    }

    return (
        <>
            <div className='mx-auto w-[800px] p-5 rounded-lg  mt-10'>
                <div className='flex items-center justify-between mb-4'>
                    <h2 className='text-2xl font-bold'>Crud</h2>
                </div>
                <div className='flex items-center justify-start space-x-4'>
                    <TextField autoComplete='off' onChange={handleSearch} label='Search' className='w-[60%]' size='small' type='text' />
                    <Button type='button' size='large' variant='contained' className=''><FilterListIcon /></Button>
                    <Button type='button' size='large ' onClick={handleUserAdd} variant='contained' className='!py-[8px]'>Add User</Button>
                </div>
                <div className='mt-[40px] relative'>
                    {loading ? <img className='absolute inset-0 mx-auto mt-[150px]' src={LoadingImg} alt="Loading icon" width={60} height={60} /> : searchedTodos.length ? <CustomTable deleteClick={handleDeleteClicked} editClick={handleEditCrud} tHeadTd={tHeadValue} rows={searchedTodos} /> :
                        <p className='text-center mt-10 text-lg'>No information</p>
                    }

                </div>
            </div>
            <Modal className='flex items-center justify-center' onClose={() => setOpen(false)} open={open}>
                <Box className='bg-slate-100  rounded-lg p-4 w-[500px]'>
                    <Box className='flex items-center justify-between mb-5'>
                        <Typography id='modal-modal-title' variant='h6' component={'h2'} className='text-lg font-semibold'>{updatedTodo ? "Edit User" : "Add User"}</Typography>
                        <Button id='modal-modal-closebtn' onClick={() => setOpen(false)} type='button'><CloseIcon className='text-black' /></Button>
                    </Box>
                    <form autoComplete='off' onSubmit={handleAddSubmit}>
                        <TextField value={newTodo} onChange={(e) => setNewTodo(e.target.value)} required size='small' className='!mb-4 w-full' label='Name' variant='outlined' type='text' />
                        <TextField value={email} onChange={(e) => setEmail(e.target.value)} required size='small' className='!mb-4 w-full' label='Email' variant='outlined' type='email' />
                        <TextField value={tel} onChange={(e) => setTel(e.target.value)} required size='small' className=' w-full' label='Phone Number' variant='outlined' type='tel' />
                        <div className=' flex items-center justify-end space-x-4 mt-4'>
                            <Button onClick={() => setOpen(false)} type='button' className='!text-black w-[30%] !border-gray-400' variant='outlined'>Cancel</Button>
                            <Button className='w-[30%]' type='submit' variant='contained'>Submit</Button>
                        </div>
                    </form>
                </Box>

            </Modal>
            <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} className='flex items-center justify-center'>
                <Box className='w-[400px] bg-slate-100 rounded-lg p-4 '>
                    <Typography id='modal-modal-title' variant='h6' component={'h2'} className='text-lg font-semibold !mb-5'>Are you sure to delete ?</Typography>
                    <Box className='flex items-center justify-between'>
                        <Button className='w-[49%]' onClick={() => setDeleteOpen(false)} variant='contained' color='info'>Cancel</Button>
                        <Button className='w-[49%]' onClick={() => handleDeleted()} variant='contained' color='error'>Delete</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default Todos
