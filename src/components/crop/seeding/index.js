import * as React from 'react';
import DataTable from '../../shared/dataTable';
import data from './seeding-mock';
export default function Seeding() {
    return (
        <>
            <p className='page-title-bold'>Seeding</p>
            <DataTable data={data} />
        </>
    );
}
