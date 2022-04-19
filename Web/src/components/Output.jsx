
import useSWR from 'swr'
import { DataGrid } from '@mui/x-data-grid';

import { red } from '@mui/material/colors';

const fetcher = async url => {
    const res = await fetch(url)
 
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    let answers = await res.json()
    return answers
  }

const Output = (props) => {

    let m_interval = props.interval

    const {data, error, isValidating, mutate} = useSWR(process.env.REACT_APP_DATA+'/numbers', fetcher, {
    revalidateOnFocus: true,
    refreshInterval: m_interval,
})


const columns = [
    { 
            field: 'id', 
            headerName: 'ID', 
            flex: 1, 
            minWidth: 150,
            headerClassName: 'super-app-theme--header' 
            
        },
    { field: 'value', headerName: 'Value', width: 100 },
    { field: 'count', headerName: 'Count', flex: 0.3, minWidth: 50 },
    
  ];

  const rows = [
    { id: "1", value: 1, count:  11},
    { id: "3" ,value: 2, count: 12},
    { id: "4" , value: 3, count: 13},
  ]
  

    return ( 
        <div style={{ height: 400, width: '100%' }}>         
        {data && 
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          sx={{
            boxShadow: 2,
            border: 2,
            borderColor: m_interval > 0 ? 'primary.light': red[400],
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
          }}
          
        />
        }
      </div>
     );
}
 
export default Output;