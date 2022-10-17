import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DataTable from '../../shared/dataTable';
import PageHeader from '../../shared/page-header';
import Loader from '../../shared/loader';
import { Stack, Stepper, Step, StepLabel } from '@mui/material';
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
    console.log(lifecycleDetails);
    return (
        <>
            <PageHeader title='Crop Name would come here' />
            <div className='page-container'>
                {isLifecycleDetailsLoading && (
                    <Loader title='Fetching Details' />
                )}
                <Stack sx={{ width: '100%' }} spacing={4}>
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
                </Stack>
                {/* <DataTable data={{ headers: headers, rows: lifecycleCropsList }} /> */}
            </div>
        </>
    );
}
