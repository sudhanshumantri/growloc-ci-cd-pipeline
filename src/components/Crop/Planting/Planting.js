import * as React from 'react';
import DataTable from '../../shared/dataTable/dataTable';
import plant from './planting-mock';
export default function Planting() {
    return (
        <>
       <DataTable  data={plant} />
       </>
    );
}
