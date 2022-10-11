import React, { useState } from 'react'
import axios from "../../../api/index"
import AddCorpModel from "../addcrop";
import DataTable from '../../shared/dataTable';
import PageHeader from '../../shared/page-header'
import { connect } from "react-redux";



let plantsDummyData = {
    headers: [
        {
            label: 'Crop',
            key: 'batchName',
            redirection: true,
            redirectionKey: 'link'
        }, {
            label: 'Variety',
            key: 'crop',
            redirection: false
        }, {
            label: 'Scientific Name',
            key: 'variety',
            redirection: false
        }, {
            label: 'Type',
            key: 'transplantingDate',
            redirection: false
        }, {
            label: 'Germination Method',
            key: 'estDate',
            redirection: false
        },
    ],
    rows:
        [{ "id": 1204, "seedingId": 316, "crop": "Pepper", "batchName": "WK39/01", "variety": "Common Black Pepper", "stage": "Harvest", "transplantingDate": "2022-09-21", "noOfPlants": 6000, "noOfSeeds": 2028, "estDate": "2022-09-23", "dueIn": -9 },
        { "id": 1194, "seedingId": 317, "crop": "Pepper", "batchName": "WK39/02", "variety": "Common Black Pepper", "stage": "Germination", "transplantingDate": "2022-09-30", "noOfPlants": 500, "noOfSeeds": 5000, "estDate": "2022-09-30", "dueIn": -2, },
        { "id": 1042, "seedingId": 279, "crop": "Cherry Tomatoes", "batchName": "WK34/01", "variety": "General Variety", "stage": "Harvest", "transplantingDate": "2022-08-15", "noOfPlants": 2000, "noOfSeeds": 6000, "estDate": "2022-10-14", "dueIn": 12 }]
}
export default function ManageCrop({fetchCrop, cropList, isCropListLoading, cropListError}) {
    const [modelData, setModelData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleModalToggle = () => {
        setOpen(!open);
    };
    let buttonArray = [
        {
            label: 'Add New',
            handler: handleModalToggle
        }
    ]
    React.useEffect(() => {
        console.log(cropList);
        fetchCrop();

        // axios.get('crop/get-all-crops').then(res => setModelData(res.data));

    }, []);
    return (
        <div>
            <PageHeader title='Manage Crops' buttonArray={buttonArray} />
            <AddCorpModel modelData={modelData} open={open} handleClick={handleModalToggle} />
            <div className='page-container'>
                <DataTable data={plantsDummyData} />
            </div>
        </div>
    )
}


