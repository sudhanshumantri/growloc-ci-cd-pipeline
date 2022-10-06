import * as React from 'react';
import DataTable from '../../shared/dataTable';
import data from './transplanting-mock';

export default function Transplanting() {
    return (
        <>
        <p className='page-title-bold'>Transplanting</p>
        <DataTable  data={data} />
        </>
    );
}
