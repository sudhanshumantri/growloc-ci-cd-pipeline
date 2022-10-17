import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../../shared/dataTable';
import PageHeader from '../../shared/page-header';
import Loader from '../../shared/loader';
import { Stack, Stepper, Step, StepLabel, Grid } from '@mui/material';
import moment from "moment";
import style from './style.css'

const STATIC_STEPPER = [
    {
        label: 'Germination',

    }, {
        label: 'Nursery',
    }, {
        label: 'Harvest',
    }
]

let headers = [
    {
        label: 'Batch No',
        key: 'batchName',
        redirection: true,
        redirectionKey: 'link'
    }, {
        label: 'Crop',
        key: 'crop.crop.name',
        redirection: false
    }, {
        label: 'Variety',
        key: 'crop.crop.variety',
        redirection: false
    }, {
        label: 'Start Date ',
        key: 'start_date',
        redirection: false,
        isDate: true
    },
    {
        label: 'Est Harvest Date',
        key: 'estDate',
        redirection: false
    },
    {
        label: 'No. of Seeds',
        key: 'qty',
        redirection: false
    }
];
const renderHeader = (lifecycleDetails) => {
    let { cropDetails, history } = lifecycleDetails;
    console.log('lifecycleDetails', lifecycleDetails);
    let title = cropDetails.crop.crop.name;
    let subtitle = '(Units :' + cropDetails.qty + ')';
    let buttonArray = [];
    let info = [
        {
            title: 'Variety',
            value: cropDetails.crop.crop.variety
        },
        {
            title: 'Germination Method',
            value: cropDetails.crop.crop.germinationMethod.type
        },
        {
            title: 'Life Cycle Start Date',
            value: moment(cropDetails.start_date).format('YYYY-MM-DD')
        },

    ]
    if (!history || history.length == 0) {
        buttonArray = [
            {
                label: "Start Lifecycle",
                // handler: handleModalToggle,
            },
        ];
    }
    return (
        <PageHeader title={title} subtitle={subtitle} info={info} buttonArray={buttonArray} />
    )
}
const renderStepper = (lifecycleDetails) => {
    console.log(lifecycleDetails);
    return (
        <Stepper alternativeLabel>
            {STATIC_STEPPER.map((data, index) => (
                <Step key={index}>
                    <StepLabel>
                        <p className='step-label'>{data.label}</p>
                        <p className='step-label'><b>Count:</b>10</p>
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}
const renderSelectedStageInformation = (lifecycleDetails) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6} >
                <p className='header-title'>Germination Stage Information </p>
                <div className='life-cycle-details-card'>
                    <p className='label-custom'> <span className='label-light-bold'>Crop Name: </span> Crop Name</p>
                    <p className='label-custom'> <span className='label-light-bold'>Variety: </span> Variety</p>
                    <p className='label-custom'> <span className='label-light-bold'>Quantity: </span> Quantity</p>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
                <p className='header-title'>Germination History Information </p>
                <div className='life-cycle-details-card'>
                    <p className='label-custom'> <span className='label-light-bold'>Crop Name: </span> Crop Name</p>
                    <p className='label-custom'> <span className='label-light-bold'>Variety: </span> Variety</p>
                    <p className='label-custom'> <span className='label-light-bold'>Quantity: </span> Quantity</p>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
                <p className='header-title'>Task Information </p>
                <div className='life-cycle-details-card'>
                    <p className='label-custom'> <span className='label-light-bold'>Crop Name: </span> Crop Name</p>
                    <p className='label-custom'> <span className='label-light-bold'>Variety: </span> Variety</p>
                    <p className='label-custom'> <span className='label-light-bold'>Quantity: </span> Quantity</p>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} md={6} >
                <p className='header-title'>Sensors  Information </p>
                <div className='life-cycle-details-card'>
                    <p className='label-custom'> <span className='label-light-bold'>Crop Name: </span> Crop Name</p>
                    <p className='label-custom'> <span className='label-light-bold'>Variety: </span> Variety</p>
                    <p className='label-custom'> <span className='label-light-bold'>Quantity: </span> Quantity</p>
                </div>
            </Grid>

        </Grid>
    )

}
export default function CropLifeCycleDetails({
    fetchCropsLifecycleDetails,
    lifecycleDetails,
    isLifecycleDetailsLoading,
    lifecycleDetailsError
}) {
    let { lifecycleId } = useParams();
    React.useEffect(() => {
        fetchCropsLifecycleDetails(parseInt(lifecycleId));
    }, []);
    return (
        <>
            {isLifecycleDetailsLoading && (
                <Loader title='Fetching Details' />
            )}
            {!isLifecycleDetailsLoading && (
                <>
                    {renderHeader(lifecycleDetails)}
                    <div className='page-container'>
                        <Stack sx={{ width: '100%' }} spacing={4}>
                            {renderStepper(lifecycleDetails)}
                        </Stack>
                        {renderSelectedStageInformation()}
                    </div>
                </>
            )}
        </>
    );
}
