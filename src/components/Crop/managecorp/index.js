import React, { useState } from 'react'
import axios from "../../../api"
import AddCorpModel from "../../addcrop/addmodel"

export default function ManageCrop() {
    const [modelData, setModelData] = useState([]);

    React.useEffect(() => {
        console.log("hello");
        axios.get('crop/get-all-crops').then(res => setModelData(res.data));
    }, []);
    return (
        <div>
            <AddCorpModel modelData={modelData}/>
        </div>
    )
}
