import React, { useState } from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import { useSearchParams } from 'react-router-dom';
import EmptyTableBody from '../../../common/EmptyTableBody';
import ConfirmationModal from '../../../common/ConfirmationModal';
import ViewMessageModal from './ViewMessageModal';
import { Message } from '../types';
import { MessageSortBy } from '../../../utils/constants';
import StatusLabel from '../../../common/StatusLabel';

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

const CustomTableDataViewCell = materialStyled(TableCell)(() => ({
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

function showStatusLabel(status: boolean) {
  if (status)
    return (
      <StatusLabel
        label="Read"
        labelColor="#027A48"
        dotColor="#12B76A"
        bgColor="#ECFDF3"
      />
    );
  return (
    <StatusLabel
      label="Unread"
      labelColor="#B42318"
      dotColor="#F04438"
      bgColor="#FEF3F2"
    />
  );
}

const tempData = [
  {
    id: '2',
    name: 'covid statics',
    email: 'test@email.com',
    message: 'This application can show live count of covid statics',
    date: '2022/08/25',
    isRead: true,
  },
  {
    id: '3',
    name: 'covid statics',
    email: 'test@email.com',
    message: 'This application can show live count of covid statics',
    date: '2022/08/25',
    isRead: false,
  },
];

export default function MessageTable() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [isOpenViewModal, setOpenViewModal] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<
    string | undefined
  >(undefined);
  const [selectedMessage, setSelectedMessage] = useState<Message | undefined>(
    undefined,
  );
  const currentSortBy =
    (searchParams.get('sortBy') as MessageSortBy) ?? MessageSortBy.ALL;

  return (
    <>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell>Email</CustomTableHeaderCell>
              <CustomTableHeaderCell>Name</CustomTableHeaderCell>
              <CustomTableHeaderCell>Date</CustomTableHeaderCell>
              {currentSortBy === MessageSortBy.ALL && (
                <CustomTableHeaderCell>Status</CustomTableHeaderCell>
              )}
              <CustomTableHeaderCell />
              <CustomTableHeaderCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tempData.length === 0 && (
              <EmptyTableBody message="No configs to show" colSpan={5} />
            )}
            {tempData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomTableDataCell>{row.email}</CustomTableDataCell>
                <CustomTableDataCell>{row.name}</CustomTableDataCell>
                <CustomTableDataCell>{row.date}</CustomTableDataCell>
                {currentSortBy === MessageSortBy.ALL && (
                  <CustomTableHeaderCell>{showStatusLabel(row.isRead)}</CustomTableHeaderCell>
                )}
                <CustomTableDataDeleteCell>
                  <IconButton
                    onClick={() => {
                      setSelectedMessageId(row.id);
                      setOpenDeleteConfirmationModal(true);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </CustomTableDataDeleteCell>
                <CustomTableDataViewCell>
                  <IconButton
                    onClick={() => {
                      setSelectedMessage(row);
                      setOpenViewModal(true);
                    }}
                  >
                    <PreviewOutlinedIcon />
                  </IconButton>
                </CustomTableDataViewCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <ConfirmationModal
        open={isOpenDeleteConfirmationModal}
        handleClose={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedMessageId(undefined);
        }}
        isCancellationModal
        modalTitle="Are you sure you want to delete the message?"
        modalDescription="This message will delete and it can't be reversed."
        backButtonText="Go back"
        backButtonAction={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedMessageId(undefined);
        }}
        continueButtonText="Delete"
        continueButtonAction={() => {
          // eslint-disable-next-line no-console
          console.log(selectedMessageId);
          setOpenDeleteConfirmationModal(false);
          setSelectedMessageId(undefined);
        }}
      />
      <ViewMessageModal
        open={isOpenViewModal}
        handleClose={() => {
          setOpenViewModal(false);
        }}
        name={selectedMessage?.name || ''}
        email={selectedMessage?.email || ''}
        message={selectedMessage?.message || ''}
        date={selectedMessage?.date || ''}
        isRead={selectedMessage?.isRead || false}
        handleClick={() => {
          // eslint-disable-next-line no-console
          console.log(selectedMessage?.id);
          setOpenViewModal(false);
        }}
      />
    </>
  );
}
