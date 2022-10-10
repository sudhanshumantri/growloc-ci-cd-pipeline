import React, {useState} from 'react';
import DataTable from '../../shared/dataTable';
import data from './seeding-mock';
import PageHeader from '../../shared/page-header'
import AddNewModel from '../addnewfarm';
export default function Seeding() {
    const [modelData, setModelData] = useState([]);
    const [open, setOpen] = useState(false);
    const handleModalToggle = () => {
        setOpen(!open);
    };
    return (
        <>
            <PageHeader title='Seeding' buttonArray={[]} />
            <AddNewModel modelData={modelData} open={open} handleClick={handleModalToggle} />
            <div className='page-container'>
                <DataTable data={data} />
            </div>
        </>
    );
}
