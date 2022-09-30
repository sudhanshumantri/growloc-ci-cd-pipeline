import * as React from 'react';
import DataTable from '../../../Core/DataTable/DataTable';
import data from './seeding-mock';

export default function Seeding() {
    return (
       <DataTable title="Seeding Table" data={data} />
    );
}
