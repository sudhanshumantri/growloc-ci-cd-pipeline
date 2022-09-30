import * as React from 'react';
import DataTable from '../../shared/dataTable/dataTable';
import data from './planting-mock';

export default function Planting() {
    return (
       <DataTable title="Planting Table" data={data} />
    );
}
