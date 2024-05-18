'use client'
import { Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../../store';
import { editEmployee } from '../../../../../../store/employee';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'
import toast, { Toaster } from 'react-hot-toast';
import CustomizedSnackBars from '@/components/error/SnackBar';

interface employeeData{
  first_name: string, 
  last_name: string, 
  email: string, 
  mobile: number , 
  designation: string, 
  gender: string, 
  courses: string, 
  status: string, 
  image: string
}

const defaultData = {
  first_name: "", 
  last_name: "", 
  email: "", 
  mobile: 0 , 
  designation: "", 
  gender: "", 
  courses: "", 
  status: "", 
  image: ""
}

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  gender: yup.string().required(),
  courses: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.number().required(),
  designation: yup.string().required(),
  status: yup.string().required()
})

const Edit = ({params}: {params: {id: string}}) => {
  const [course, setCourse] = React.useState('');
  const [viewData, setViewData] = useState<employeeData>(defaultData)
  const [image, setImage] = useState<string>('')
  const [preview, setPreview] = useState("")
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [bca, setBca] = useState(false)
  const [mca, setMca] = useState(false)
  const [bsc, setBsc] = useState(false)
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter()

  console.log(params.id, "id")

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  }

  const handleCancel = () => {
    router.push('/employee/list')
  }

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()
  
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.employee)

   const { register, handleSubmit, reset } = useForm({
    })

    function onSubmit(data: any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => console.log(error))
        console.log(data,"edit data")
        const { first_name, last_name, email, mobile, designation, gender, status, courses, image } = data
        console.log(courses, "courses");
        
        if( ! gender ||  courses.length === 0 || ! designation  ){
          setOpen(true)
        }else{

        
          // console.log(first_name, "image")
  
          const formData = new FormData()
          formData.append("_id", params.id)
          formData.append("first_name", first_name)
          formData.append("last_name", last_name)
          formData.append("email", email.toLowerCase().replace(/\s/g, ""))
          formData.append("mobile", mobile)
          formData.append("designation", designation)
          formData.append("gender", gender)
          formData.append("courses", JSON.stringify(courses))
          formData.append("status", status)
          if ( image ){
            formData.append("image", image[0])
          }
  
          console.log(formData, "formData")
          
          dispatch(editEmployee(formData));
        }
        }

      useEffect(() => {
        if (store.redirect) {
          router.push('/employee/list')
        }
      },[store.redirect])

     const handleFile = (e: any) => {
      setImage(e.target.files[0])
      // console.log(e.target.files[0], "handle image")
    }

    const handleValue = (event: any) => {
      setSelected(event.target.value)
    }

    const handleStatus = (event: any) => {
      setSelectedStatus(event.target.value)
    }

  useEffect(() => {
        if (params.id) {
          const storedToken = localStorage.getItem("access_token")
          const viewEmployee = async () => {
          await axios.post(`https://admin-dashboard-fc3h.onrender.com/employee/view`,  {_id: params.id}  , {
          headers: {Authorization: `Bearer ${storedToken}` } }).then(res=>{
              setViewData(res.data.data)
              }).catch(error => {
              console.log(error.message);
          })
        }
        viewEmployee()
      }   
    }, [params.id])

    const initialValue = (viewData: employeeData) => {
         reset({
                first_name: viewData.first_name,
                last_name: viewData.last_name,
                gender: viewData.gender,
                courses: viewData.courses,
                email: viewData.email, 
                mobile: viewData.mobile, 
                designation: viewData.designation, 
                status: viewData.status, 
                image: viewData.image
            })
    }

    useEffect(() => {
      initialValue(viewData)
    }, [viewData])
    
     useEffect(() => {
        if (image) {
        const img: any = image
        URL.createObjectURL(img)
        setPreview(URL.createObjectURL(img))
        }else if( viewData.image !== null ){
          setPreview(viewData.image)
        }
      setSelected(viewData.designation)
      setSelectedStatus(viewData.status)
      setValue(viewData.gender)
      if ( viewData.courses.includes("BCA") ){
        setBca(true)
      }
      if ( viewData.courses.includes("BSC") ){
        setBsc(true)
      }
      if ( viewData.courses.includes("MCA") ){
        setMca(true)
      }
    }, [image, viewData])

    const handleChange1 = () => {
      mca ? setMca(false) : setMca(true)
    }
    const handleChange2 = () => {
      bca ? setBca(false) : setBca(true)
    }
    const handleChange3 = () => {
      bsc ? setBsc(false) : setBsc(true)
    }

  return (
     <>
     <Toaster />
      <Grid item className='container' sx={{ textAlign: "center"}}>
                        <Typography variant='h4' sx={{ margin: "15px 0px"}} >Update Employee</Typography>
                        <hr style={{ width: "100%" }} />
                    </Grid>
                    <Grid sx={{ textAlign: "center", margin: "15px 0px" }}>
                       {viewData.image === null && preview === "" ? viewData.gender.toLowerCase() === "male" ? 
                        <img
                          src="/male_avatar.svg"
                          alt="Logo"
                          loading="lazy"
                          width={100}
                          style={{ borderRadius: "10%"}}
                        /> : 
                        <img
                          src="/female_avatar.svg"
                          alt="Logo"
                          loading="lazy"
                          width={100}
                          style={{ borderRadius: "10%"}}
                        /> :
                        <img
                          src={preview}
                          alt="Logo"
                          loading="lazy"
                          width={100}
                          style={{ borderRadius: "10%"}}
                        />}
                        {/* <img
                        src={preview}
                        alt="Profile"
                        loading="lazy"
                        width={100}
                        style={{ borderRadius: "10%"}}
                        /> */}
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Grid className='container'>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12} sm={6}>
                                  <label htmlFor="first_name" style={{ fontSize: "12px", color: "#808080" }}> First Name *</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="first_name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        {...register("first_name")}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <label htmlFor="last_name" style={{ fontSize: "12px", color: "#808080" }}> Last Name *</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="last_name"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        {...register("last_name")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" required>Gender</FormLabel>
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          // name="gender"
                                          value={value}
                                          onChange={handleChange}
                                          >
                                          <FormControlLabel 
                                        {...register("gender")} 
                                          id='gender' value="Male" control={<Radio />} label="Male" />
                                          <FormControlLabel
                                        {...register("gender")}  
                                          id='gender' value="Female" control={<Radio />} label="Female"/>
                                        </RadioGroup>
                                      </Grid>
                                       <Grid item xs={12} sm={6}>
                                        <FormLabel id='courses' required>Courses</FormLabel>
                                      <FormGroup sx={{ display: "flex", flexDirection: "row"}}>
                                        <FormControlLabel 
                                        {...register("courses")} id='courses' control={<Checkbox onChange={handleChange1} checked={mca} />} value="MCA" label="MCA" />
                                        <FormControlLabel {...register("courses")} id='courses' control={<Checkbox onChange={handleChange2} checked={bca} />} value="BCA" label="BCA" />
                                        <FormControlLabel {...register("courses")} id='courses' control={<Checkbox onChange={handleChange3} checked={bsc} />} value="BSC" label="BSC" />
                                      </FormGroup>
                                      </Grid>
                                <Grid item xs={12} sm={6}>
                                <label htmlFor="email" style={{ fontSize: "12px", color: "#808080" }}> E-mail *</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="email"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        {...register("email")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                <label htmlFor="mobile" style={{ fontSize: "12px", color: "#808080" }}> Phone Number *</label>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="mobile"
                                        type="number"
                                        fullWidth
                                        variant="outlined"
                                        {...register("mobile")}
                                        InputProps={{
                                        startAdornment: <InputAdornment position="start">+91</InputAdornment>}}
                                    />
                                </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="designation" required>Designation</InputLabel>
                                        <Select
                                          labelId="designation"
                                          id="designation"
                                          label="Designation"
                                          value={selected}
                                          {...register("designation")}
                                          onChange={(e)=> handleValue(e)}
                                        >
                                          <MenuItem value={"HR"}>HR</MenuItem>
                                          <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                                          <MenuItem value={"SALES"}>SALES</MenuItem>
                                        </Select>
                                      </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Status"
                                          value={selectedStatus}
                                          {...register("status")}
                                          onChange={(e)=> handleStatus(e)}
                                        >
                                          <MenuItem value={"Active"}>Active</MenuItem>
                                          <MenuItem value={"Inactive"}>Inactive</MenuItem>
                                        </Select>
                                      </FormControl>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                <label htmlFor="image" style={{ fontSize: "12px", color: "#808080" }}>  Image(jpg/png only) *</label>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="image"
                                        type="file"
                                        fullWidth
                                        variant="outlined"
                                        {...register("image")}
                                        onChange={(e)=> handleFile(e)} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "end", alignItems: "end"}}>
                                    <Button color="error" onClick={() => handleCancel()} >Cancel</Button>
                                    <Button color="success" type="submit">UPDATE</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <DialogActions>
                            
                        </DialogActions>
                    </form>
                    <CustomizedSnackBars open={ open } setOpen={ setOpen } errorMessage={ errorMessage } />
    </>
  )
}

export default Edit