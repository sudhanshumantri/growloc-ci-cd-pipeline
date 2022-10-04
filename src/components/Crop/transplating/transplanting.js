import * as React from 'react';
import DataTable from '../../shared/dataTable/dataTable';
import data from './transplanting-mock';

export default function Transplanting() {
    return (
        <>
        <DataTable  data={data} />
        </>
    );
}
