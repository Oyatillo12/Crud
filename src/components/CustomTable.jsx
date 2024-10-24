import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomTable({ tHeadTd, rows, editClick, deleteClick }) {
  return (
    <>
      <TableContainer component={Paper}>
        <Table className='table' sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead >
            <TableRow className='!bg-transparent'>
              {tHeadTd.map(item => <StyledTableCell align='left' key={item.id}>{item.title}</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((item, index) => (
              <StyledTableRow className='relative' key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.email}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {item.tel}
                </StyledTableCell>
                <StyledTableCell className='flex items-center space-x-4' component="th" scope="row">
                  <EditIcon onClick={() => editClick(item)} className='scale-[1.3] hover:text-green-500 hover:scale-150 duration-300' />
                  <DeleteIcon onClick={() => deleteClick(item.id)} className='scale-[1.3] hover:text-red-500 hover:scale-150 duration-300' />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
