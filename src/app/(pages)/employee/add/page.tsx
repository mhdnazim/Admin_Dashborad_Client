'use client'
import { Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addEmployee } from '../../../../../store/employee';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { useRouter } from 'next/navigation';
import * as yup from 'yup'
import CustomizedSnackBars from '@/components/error/SnackBar';
import { Toaster } from 'react-hot-toast';

// interface FormData{
//   first_name: string, 
//   last_name: string, 
//   email: string, 
//   mobile: number, 
//   designation: string, 
//   gender: string, 
//   courses: string, 
//   status: string, 
//   image: string
// }

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  gender: yup.string().required(),
  courses: yup.string().required(),
  email: yup.string().required(),
  mobile: yup.number().required(),
  designation: yup.string().required("Designation Required")
})


const Add = () => {

  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState("/users.png")
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter()

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  }

  const handleClick = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  }

   const handleFile = (e: any) => {
      setImage(e.target.files[0])
      // console.log(e.target.files[0], "handle image")
    }

  const handleCancel = () => {
    router.push('/employee/list')
  }

  const { register, handleSubmit, reset } = useForm({
    })

  const useAppDispatch = useDispatch.withTypes<AppDispatch>()
  const useAppSelector = useSelector.withTypes<RootState>()
  
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.employee)

    function onSubmit(data: any) {
        schema.validate(data)
            .then(valid => console.log(valid))
            .catch(error => {
              console.log(error)
              setErrorMessage(error)
            })
        console.log(data,"add data")

        if( ! data.gender || ! data.courses || ! data.designation  ){
          setOpen(true)
        }else{
          
          const formData = new FormData()
          formData.append("first_name", data.first_name)
          formData.append("last_name", data.last_name)
          formData.append("email", data.email.toLowerCase().replace(/\s/g, ""))
          formData.append("mobile", data.mobile)
          formData.append("designation", data.designation)
          formData.append("gender", data.gender)
          formData.append("courses", JSON.stringify(data.courses))
          // formData.append("status", data.status)
          formData.append("image", data.image[0])
  
          console.log(formData, "formData")
  
          const storedToken = localStorage.getItem('access_token')
  
          const headers = {
              headers: {
                  Authorization: `Bearer ${storedToken}`,
                  "content-type": "multipart/form-data"
              }
          }
          dispatch(addEmployee(formData));
        }
      }

      useEffect(() => {
        if (store.redirect) {
          window.location.replace('/employee/list')
        }
      },[store.redirect])

    useEffect(() => {
        if (image) {
        const img: any = image
        URL.createObjectURL(img)
        setPreview(URL.createObjectURL(img))
        }
    }, [image])

  return (
    <>
    <Toaster />
      <Grid item className='container' sx={{ textAlign: "center"}}>
                        <Typography variant='h4' sx={{ margin: "15px 0px"}} >Add new Employee</Typography>
                        <hr style={{ width: "100%" }} />
                    </Grid>
                    <Grid sx={{ textAlign: "center", margin: "15px 0px" }}>
                        <img
                        src={preview}
                        alt="Profile"
                        loading="lazy"
                        width={100}
                        style={{ borderRadius: "10%"}}
                        />
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid className='container'>
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                            >
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="first_name"
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("first_name")}
                                        
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="last_name"
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        {...register("last_name")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormLabel id="demo-row-radio-buttons-group-label" required>Gender</FormLabel>
                                        <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          // name="gender"
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
                                      <FormGroup sx={{ display: "flex", flexDirection: "row"}} >
                                        <FormControlLabel 
                                        {...register("courses")} id='courses' control={<Checkbox />} value="MCA" label="MCA" />
                                        <FormControlLabel {...register("courses")} id='courses' control={<Checkbox />} value="BCA" label="BCA" />
                                        <FormControlLabel {...register("courses")} id='courses' control={<Checkbox />} value="BSC" label="BSC" />
                                      </FormGroup>
                                      </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="email"
                                        label="E-mail"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                        {...register("email")}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="mobile"
                                        label="Phone Number"
                                        placeholder='998 987 9871'
                                        type="number"
                                        InputProps={{
                                        startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                      }}
                                        fullWidth
                                        variant="standard"
                                        {...register("mobile")}
                                    />
                                </Grid>
                                 <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" required>Designation</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="designation"
                                          // value={value}
                                          label="Designation"
                                          {...register("designation")}
                                        >
                                          <MenuItem value={"HR"}>HR</MenuItem>
                                          <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
                                          <MenuItem value={"SALES"}>SALES</MenuItem>
                                        </Select>
                                      </FormControl>
                                </Grid>
                                {/* <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" required>Status</InputLabel>
                                        <Select
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          label="Status"
                                          {...register("status")}
                                        >
                                          <MenuItem value={"Active"}>Active</MenuItem>
                                          <MenuItem value={"Inactive"}>Inactive</MenuItem>
                                        </Select>
                                      </FormControl>
                                </Grid> */}
                                
                                <Grid item xs={12} sm={6}>
                                <label htmlFor="image" style={{ fontSize: "12px", color: "#808080" }}>  Image(jpg/png only) (optional) </label>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="image"
                                        type="file"
                                        fullWidth
                                        variant="standard"
                                        {...register("image")}
                                        onChange={(e)=> handleFile(e)}/>
                                </Grid>
                                <Grid item xs={12} sm={12} sx={{ display: "flex", justifyContent: "end", alignItems: "end"}}>
                                    <Button onClick={ () => handleCancel()} color="error" >Cancel</Button>
                                    <Button color="success" type="submit">Add</Button>
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

export default Add