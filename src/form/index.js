import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import { objToQueryArgs } from '../utils/queryArgs'
import PayoutTable from '../payoutTable';
import BarChart from '../payoutChart';
import NoDataAlert from '../noData'


export default function FormPropsTextFields() {

    const [formDetails, setFormDetails] = useState({
        "strike": "300",
        "tMax": "40",
        "year": "2000",
    });
    const [loading, setLoading] = useState(false);
    const [payoutData, setPayoutData] = useState([]);
    const [noDataAlertData, setNoDataAlertData] = useState({
        "initialLoad": true,
        "showAlert": false,
    });

    const onInputChange = (event) => {
        const {name, value} = event.target
        setFormDetails((prev) => {
            return {...prev, [name]: value}
        })
    }
    const onYearChange = (value) => {
        setFormDetails((prev) => {
            return {...prev, 'year': value.$y.toString()}
        })
    }

    const onNoDataAlertClick = () => {
        setNoDataAlertData((prev) => {
            return {
                ...prev,
                'showAlert': false,
            }
        })
    }

    const handleClick = () => {
        setPayoutData([])
        setLoading(true)
        const queryArgs = objToQueryArgs(formDetails)
        const url = `http://127.0.0.1:5010/payout?${queryArgs}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setPayoutData(data)
                setNoDataAlertData((prev) => {
                    return {
                        ...prev,
                        'showAlert': !data.length,
                        'initialLoad': false,
                    }
                })
                setLoading(false)
            })
            .catch(error => console.log(error));
    }

    const {strike, tMax, year} = formDetails

    return (
    <Box
        component="form"
        sx={{
            // backgroundColor: 'primary.dark',
            // width: 500,
            // height: 500,
            '& .MuiTextField-root': { m: 5, width: '25ch' },
            // '&:hover': {
            //     backgroundColor: 'primary.main',
            //     opacity: [0.9, 0.8, 0.7],
            //   },
        }}
        noValidate
        autoComplete="off"
    >
        <Grid container spacing={2}>
            <Grid item xs={16}>
                <NoDataAlert
                    noDataAlertData = {noDataAlertData}
                    onNoDataAlertClick = {onNoDataAlertClick}
                />
            </Grid>
            <Grid item xs={5}>
                <div>
                    <TextField
                        id="outlined-required"
                        label="Strike"
                        type="number"
                        value={strike}
                        name="strike"
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <TextField
                        id="outlined-required"
                        label="Temp Max"
                        type="number"
                        value={tMax}
                        name="tMax"
                        onChange={onInputChange}
                    />
                </div>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            views={["year"]}
                            label="Year"
                            value={dayjs(year)}
                            // value={selectedDate}
                            // onChange={handleDateChange}
                            animateYearScrolling
                            name="year"
                            onChange={onYearChange}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <LoadingButton variant="contained" loading ={loading} onClick={handleClick}>
                        <span>
                            Submit
                        </span>
                    </LoadingButton>
                </div>
            </Grid>
            <Grid item xs={6.5}>
                <div>
                    <PayoutTable payoutData = {payoutData}/>
                </div>
                <div>
                    <BarChart chartData = {payoutData}/>
                </div>
            </Grid>
        </Grid>
    </Box>
  );
}
