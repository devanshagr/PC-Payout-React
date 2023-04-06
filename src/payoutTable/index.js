import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    { field: 'year', headerName: 'Year', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'payout', headerName: 'Payout', width: 250, headerAlign: 'center', align: 'center' },
]

export default function PayoutTable(data) {
    const { payoutData } = data
    return (
        payoutData.length > 0 ? <Box sx={{ height: 600, width: '58%' }}>
        <DataGrid
          rows={payoutData}
          columns={columns}
          getRowId={(row) =>  row.year}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 50,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          showColumnVerticalBorder
          showCellVerticalBorder
          sx={{
            boxShadow: 2,
          }}
        />
      </Box> : <></>
    );
  }
  