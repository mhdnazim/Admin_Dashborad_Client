import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"

export interface EmployeeState {
    data : []  ,
    params: {},
    bookData : {}
    loading : boolean,
    error : string | null,
    redirect: boolean
}

const initialState: EmployeeState = {
    data: [],
    params: {},
    bookData : {},
    loading: false,
    error: "",
    redirect: false
}

interface Redux {
    getState : any,
    dispatch : Dispatch<any>
}

interface DataParams {
    search : string,
    from : Date | string,
    to : Date | string
}

export const listEmployee = createAsyncThunk(
    'employee/listEmployee',
    async (params: DataParams) => {
    const storedToken = localStorage.getItem('access_token')

    const response = await axios.post('https://admin-dashboard-fc3h.onrender.com/employee/list', params, {headers: {
        Authorization: `Bearer ${storedToken}`}
    })
    return response.data
  },
)

export const addEmployee = createAsyncThunk(
    'employee/addEmployee',
    async (data: any , { getState, dispatch}: Redux) => {
      console.log(data, "from redux")
    const storedToken = localStorage.getItem('access_token')
        

    const response =await axios.post('https://admin-dashboard-fc3h.onrender.com/employee/add', data, {headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "multipart/form-data"
    }})
    
    return response.data
  },
)

export const editEmployee = createAsyncThunk(
    'employee/editEmployee',
    async (data : any) => {
    const storedToken = localStorage.getItem('access_token')

    const response = await axios.patch('https://admin-dashboard-fc3h.onrender.com/employee/edit', data, {headers: {
        Authorization: `Bearer ${storedToken}`,
        "content-type": "multipart/form-data"
    } })
    return response.data
  },
)

export const deleteEmployee = createAsyncThunk(
    'employee/delete',
    async (_id : any) => {
    const storedToken = localStorage.getItem('access_token')

    const response = await axios.patch('https://admin-dashboard-fc3h.onrender.com/employee/delete', _id, { headers: {
        Authorization: `Bearer ${storedToken}`
    }} )
    return response.data
  },
)

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(listEmployee.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
        state.data = action.payload.data
    })
    .addCase(listEmployee.pending, (state) => {
        state.loading = true
    })
    .addCase(listEmployee.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
        // state.data = []
    })
    .addCase(addEmployee.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
        state.redirect = true
    })
    .addCase(addEmployee.pending, (state) => {
        state.loading = true
    })
    .addCase(addEmployee.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        toast.error("Email Already Exists...")
        // state.data = []
    })
    .addCase(deleteEmployee.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
    })
    .addCase(deleteEmployee.pending, (state) => {
        state.loading = true
    })
    .addCase(deleteEmployee.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.data = []
    })
    .addCase(editEmployee.fulfilled, (state, action:PayloadAction<any>) => {
        state.loading = false
        state.error = ""
        state.redirect = true
    })
    .addCase(editEmployee.pending, (state) => {
        state.loading = true
    })
    .addCase(editEmployee.rejected, (state, action:PayloadAction<any>) => {
        state.loading = false
        // state.---error = "Error"
        toast.error("Email Already Exists...")
        state.data = []
    })
  },
})


export default employeeSlice.reducer;