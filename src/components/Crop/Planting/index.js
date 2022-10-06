import * as React from 'react';
import DataTable from '../../shared/dataTable';
import plant from './planting-mock';
export default function Planting() {
    return (
        <>
            <p className='page-title-bold'>Planting</p>
            <DataTable data={plant} />
        </>
    );
}
