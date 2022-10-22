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

const tempData = [
  {
    id: '123343',
    website: 'f',
    views: 0,
    underMaintenance: true,
    homeTitle: 'fdf',
    animatedText: ['fdf'],
    aboutTitle: 'fdf',
    aboutDescription: '1111',
    name: '11111',
    dateOfBirth: '1111',
    address: 'dfd',
    phone: 'dd',
    email: 'dfd',
    aboutModalDescription: 'fgf',
    services: ['fdf'],
    programmingSkills: [
      {
        name: 'dfdf',
        value: 0,
      },
    ],
    languageSkills: [
      {
        name: 'dfdfdfd',
        value: 0,
      },
    ],
  },
];

function showStatusLabel(status: boolean) {
  if (status)
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

export default function ConfigTable() {
  const navigate = useNavigate();
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
              <CustomTableHeaderCell>Website</CustomTableHeaderCell>
              <CustomTableHeaderCell>Views</CustomTableHeaderCell>
              <CustomTableHeaderCell>Status</CustomTableHeaderCell>
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
                <CustomTableDataCell>{row.website}</CustomTableDataCell>
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
