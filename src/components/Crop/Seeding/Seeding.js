import * as React from 'react';
import DataTable from '../../shared/dataTable/dataTable';
import data from './seeding-mock';

export default function Seeding() {
    return (
       <DataTable title="Seeding Table" data={data} />
    );
}
