'use client'
import React, { use, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip, Grid, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { AddCircleOutline, Check, Delete, Edit, Warning } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { rowPinningStateInitializer } from '@mui/x-data-grid-pro/internals';
import { AppDispatch, RootState } from '../../../../../store';
import { deleteEmployee, listEmployee } from '../../../../../store/employee';
import { log } from 'console';

interface EmployeeData{
    _id : string,
    first_name: string, 
    last_name: string, 
    email: string, 
    mobile: number, 
    designation: string, 
    gender: string, 
    courses: string, 
    status: string, 
    image: string,
    createdAt: Date
  }
  const defaultData = {
    _id : "",
    first_name: "", 
    last_name: "", 
    email: "", 
    mobile: 0, 
    designation: "", 
    gender: "", 
    courses: "", 
    status: "", 
    image: "",
    createdAt: new Date()
  }

  interface AvatarObjType {
    [key: string]: string
  }
  const avatarObj: AvatarObjType = {
    Male: "/male_avatar.svg",
    Female: "/female_avatar.svg"
  }
 
const Employee = () => {
   
const columns = [ 
    { field: '_id', headerName: 'ID', width: 60,
    renderCell:(params:any) => params.api.getAllRowIds().indexOf(params.id)+1,
     }, 
    { field: 'image', headerName: 'Image', width: 100,
    renderCell: (employees: any) => {

        const gender: string = employees.row.gender.toString()
        
        // console.log(employees.row.gender, 'gender')
        
        return <>
        {
           !employees.row.image ?  <img
                src={avatarObj[gender]}
                alt="Logo"
                loading="lazy"
                style={{ width: "60px", borderRadius: "10%"}}
                /> : (
            <img
            src={employees.row.image}
            alt="Logo"
            loading="lazy"
            style={{ width: "60px", borderRadius: "10%"}}
          />
           )
        }
        </>;
     } 
     }, 
    { field: 'Name', headerName: 'Name', width: 135,
    renderCell: (employees: any) => {
        return <>{`${employees.row.first_name} ${employees.row.last_name}`}</>;
     } 
     }, 
    { field: 'email', headerName: 'Email', width: 135,
    renderCell: (employees: any) => {
        return <a href={`mailto:${employees.row.email}`}>{employees.row.email}</a>;
     } 
     }, 
    { field: 'mobile', headerName: 'Phone Number', width: 135,
    renderCell: (employees: any) => {
        return <a style={{ color: "green"}} href={`tel:${employees.row.mobile}`}>{employees.row.mobile}</a>;
     } 
     }, 
    { field: 'gender', headerName: 'Gender', width: 120 },
    { field: 'designation', headerName: 'Designation', width: 135 }, 
    { field: 'courses', headerName: 'Courses', width: 135,}, 
    { field: 'createdAt', headerName: 'Create Date', width: 150,
    renderCell: (employees: any) => {
        return <>{`${new Date(employees.row.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}`}</>;
     } 
     }, 
    { field: 'status', headerName: 'Status', width: 135,
    renderCell: (employees: any) => {
        return <Chip label={employees.row.status === "Active" ? "Active" : "Inactive"}  color={employees.row.status === "Active" ? "success" : "error"} variant={"filled"} />;
     } },
     { field: 'Action', headerName: 'Action', width: 135,
     renderCell: (employees: any) => {
        return <Grid sx={{ display: "flex"}}>
        <Link href={`/employee/edit/${employees.row._id}`} style={{ color: "#0080FF" }}> <Edit /></Link> &nbsp; &nbsp; 
        <Grid  style={{ color: "red", cursor: "pointer" }}> <Delete  onClick={() => { handleDelete(employees.row._id)} } /></Grid>
        {/* <Delete  sx={{ color: "red", cursor: "pointer" }} /> */}
     </Grid>;
     }
      }, 
  ]; 

  
  
    const router = useRouter()
  
  const [input , setInput] = useState<string>("")
  const [filterByDate , setFilterByDate] = useState<{ from:Date | string, to: Date | string }>({
    from: "2001-01-01",
    to: new Date()
})

const [employees, setEmployees] = useState<EmployeeData[]>([defaultData])
const [deleted, setDeleted] = useState<boolean>(false)

  
  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()
  
  const dispatch = useAppDispatch();
  const store: EmployeeData[] = useAppSelector(state => state.employee.data);

  useEffect(() => {
    dispatch(listEmployee({search: input, from: filterByDate.from, to: filterByDate.to}));
}, [dispatch, deleted,input, filterByDate])

useEffect(() => {
    setEmployees([...store])
    console.log(store, "list store")
  }, [store])

 
  const handleFilter = (e:any) => {
    const { name, value } = e.target
    setFilterByDate({ ...filterByDate, [name]: value })
    console.log(filterByDate, "inputs")
  }

  const handleAdd = () => {
    router.push('/employee/add')
}

  const handleSearch = (e:any) => {
    // const { name, value } = e.target
    setInput(e.target.value)
    console.log(input, "inputs")
  }

  const handleDelete = ( employeeId: string ) => {
    console.log(employeeId, "id");
    
    dispatch(deleteEmployee({ _id: employeeId}));
    setDeleted(true)
}

  return (
    <>
    <Grid className='container' container sx={{ margin: "0 auto"}}>
        <Grid className='filter' sx={{width: "100%", display: "flex", justifyContent: "space-between"}} >
            <Grid item xs={8} >
            <TextField
            required={true}
            id="outlined-required"
            name="search"
            label="Search"
            title='Text To Search'
            sx={{ width: "100%" }}
            InputProps={{
            startAdornment: <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>,
            }}
            onChange={(e) => handleSearch(e)}
            />
        </Grid>
        <Button sx={{ padding: "5px 20px"}} variant='contained' color='success' onClick={ handleAdd } className='add' startIcon={ <AddCircleOutline /> }>Add</Button> 
        </Grid>
        <Grid className='container filter' container sx={{ display: "flex", columnGap: "15px"}}>
          <Grid xs={12} md={3} >
            <Typography variant='h5'>Filter By date</Typography>
          </Grid>
          <Grid item xs={12} md={4} >
          <label htmlFor="published" style={{ fontSize: "12px", color: "#808080" }}> From *</label>
          <TextField
              autoFocus
              required
              margin="dense"
              id="from"
              name='from'
              title='From Date'
              type="date"
              InputProps={{ inputProps: { max: new Date().toJSON().slice(0, 10), min: null } }}
              fullWidth
              variant="standard"
            onChange={(e) => handleFilter(e)}
          />
      </Grid>
        <Grid item xs={12} md={4}>
          <label htmlFor="published" style={{ fontSize: "12px", color: "#808080" }}>To *</label>
          <TextField
              autoFocus
              required
              margin="dense"
              title='To Date'
              id="to"
              name='to'
              type="date"
              InputProps={{ inputProps: { max: new Date().toJSON().slice(0, 10), min: null } }}
              fullWidth
              variant="standard"
            onChange={(e) => handleFilter(e)}
          />
      </Grid>
        </Grid>
        <Grid><Typography variant='h5' sx={{ color: "green", textAlign: "center"}}>{`${employees.length} Employees Found`}</Typography></Grid>
        </Grid>
    <Box className="container" sx={{ height: 'auto', width: '100%' }}>
    { employees.length === 0 ? 
            <Grid><Typography variant='h5' sx={{ color: "red", textAlign: "center"}}>No Employee Found</Typography></Grid>
        : 
      <DataGrid
        rows={employees} columns={columns} getRowId={(row: any) =>  row.first_name + row.status}
        initialState={{
            pagination: { paginationModel: { pageSize: 3 } },
          }}
          pageSizeOptions={[3, 5, 10]}
          rowHeight={100}
      />}
    </Box>
    </>
  );
}

export default Employee
