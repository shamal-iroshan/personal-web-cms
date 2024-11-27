import React, { useState } from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import EmptyTableBody from '../../../common/EmptyTableBody';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { ROUTE_POST } from '../../../common/routes';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { postActions } from '../slice/postSlice';

const CustomTableHeaderCell = materialStyled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: 14,
  color: '#A0AEC0',
  padding: '15px 16px',
})) as typeof TableCell;

const CustomTableDataCell = materialStyled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: 14,
  color: '#25334F',
  padding: '14px 16px',
})) as typeof TableCell;

const CustomTableDataDeleteCell = materialStyled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: 14,
  color: '#25334F',
  padding: '14px 16px',
  width: '40px',
  paddingRight: '8px',
})) as typeof TableCell;

const CustomTableDataEditCell = materialStyled(TableCell)(() => ({
  fontWeight: 700,
  fontSize: 14,
  color: '#25334F',
  padding: '14px 16px',
  width: '40px',
  paddingLeft: '8px',
})) as typeof TableCell;

const CustomTableContainer = materialStyled(TableContainer)(() => ({
  border: '1px solid #E3E8EF',
  borderRadius: '12px',
})) as typeof TableContainer;

export default function PostTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | undefined>(
    undefined,
  );
  const { data: posts } = useAppSelector((state) => state.postReducer.allPosts);

  return (
    <>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell>Title</CustomTableHeaderCell>
              <CustomTableHeaderCell>Description</CustomTableHeaderCell>
              <CustomTableHeaderCell />
              <CustomTableHeaderCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.length === 0 && (
              <EmptyTableBody message="No posts to show" colSpan={5} />
            )}
            {posts.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomTableDataCell>{row.title}</CustomTableDataCell>
                <CustomTableDataCell>{row.description}</CustomTableDataCell>
                <CustomTableDataDeleteCell>
                  <IconButton
                    onClick={() => {
                      setSelectedPostId(row.id);
                      setOpenDeleteConfirmationModal(true);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </CustomTableDataDeleteCell>
                <CustomTableDataEditCell>
                  <IconButton
                    onClick={() =>
                      navigate(`${ROUTE_POST}/${row.id}`, {
                        replace: false,
                      })
                    }
                  >
                    <CreateOutlinedIcon />
                  </IconButton>
                </CustomTableDataEditCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <ConfirmationModal
        open={isOpenDeleteConfirmationModal}
        handleClose={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedPostId(undefined);
        }}
        isCancellationModal
        modalTitle="Are you sure you want to delete the item?"
        modalDescription="This item will delete and it can't be reversed."
        backButtonText="Go back"
        backButtonAction={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedPostId(undefined);
        }}
        continueButtonText="Delete"
        continueButtonAction={() => {
          if (selectedPostId) {
            dispatch(postActions.deletePost(selectedPostId));
            setOpenDeleteConfirmationModal(false);
            setSelectedPostId(undefined);
          }
        }}
      />
    </>
  );
}
