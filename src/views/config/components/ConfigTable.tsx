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
import { ROUTE_CONFIG } from '../../../common/routes';
import StatusLabel from '../../../common/StatusLabel';
import { useAppSelector } from '../../../store/types';
import { selectAllConfigs } from '../slice/configSlice';

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

function showStatusLabel(status: boolean) {
  if (!status)
    return (
      <StatusLabel
        label="Operational"
        labelColor="#027A48"
        dotColor="#12B76A"
        bgColor="#ECFDF3"
      />
    );
  return (
    <StatusLabel
      label="Under Maintenance"
      labelColor="#B42318"
      dotColor="#F04438"
      bgColor="#FEF3F2"
    />
  );
}

function showActiveLabel(status: boolean) {
  if (status)
    return (
      <StatusLabel
        label="Active"
        labelColor="#027A48"
        dotColor="#12B76A"
        bgColor="#ECFDF3"
      />
    );
  return (
    <StatusLabel
      label="Not using"
      labelColor="#B42318"
      dotColor="#F04438"
      bgColor="#FEF3F2"
    />
  );
}

export default function ConfigTable() {
  const navigate = useNavigate();
  const configs = useAppSelector(selectAllConfigs);
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState<string | undefined>(
    undefined,
  );

  return (
    <>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell>Active State</CustomTableHeaderCell>
              <CustomTableHeaderCell>Views</CustomTableHeaderCell>
              <CustomTableHeaderCell>Status</CustomTableHeaderCell>
              <CustomTableHeaderCell />
              <CustomTableHeaderCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {configs.data.length === 0 && (
              <EmptyTableBody message="No configs to show" colSpan={5} />
            )}
            {configs.data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomTableDataCell>
                  {showActiveLabel(row.isActive)}
                </CustomTableDataCell>
                <CustomTableDataCell>{row.views}</CustomTableDataCell>
                <CustomTableDataCell>
                  {showStatusLabel(row.underMaintenance)}
                </CustomTableDataCell>
                <CustomTableDataDeleteCell>
                  <IconButton
                    onClick={() => {
                      setSelectedConfigId(row.id);
                      setOpenDeleteConfirmationModal(true);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </CustomTableDataDeleteCell>
                <CustomTableDataEditCell>
                  <IconButton
                    onClick={() =>
                      navigate(`${ROUTE_CONFIG}/${row.id}`, { replace: false })
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
          setSelectedConfigId(undefined);
        }}
        isCancellationModal
        modalTitle="Are you sure you want to delete the config?"
        modalDescription="This config will delete and it can't be reversed."
        backButtonText="Go back"
        backButtonAction={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedConfigId(undefined);
        }}
        continueButtonText="Delete"
        continueButtonAction={() => {
          // eslint-disable-next-line no-console
          console.log(selectedConfigId);
          setOpenDeleteConfirmationModal(false);
          setSelectedConfigId(undefined);
        }}
      />
    </>
  );
}
