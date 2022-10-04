import * as React from 'react';
import DataTable from '../../shared/dataTable/dataTable';
import data from './seeding-mock';
import AddCorp from '../../addcrop/addcrop';

export default function Seeding() {
    return (
        <>
        <AddCorp/>
        <DataTable  data={data} />
        </>
    );
}
