import React, { useState } from 'react';
import { styled as materialStyled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmptyTableBody from '../../../common/EmptyTableBody';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { ROUTE_PORTFOLIO } from '../../../common/routes';
import { useAppDispatch, useAppSelector } from '../../../store/types';
import { portfolioActions } from '../slice/portfolioSlice';

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

const CompanyLogo = styled.img`
  height: 40px;
  min-width: 40px;
  width: 120px;
  margin-right: 10px;
  object-fit: contain;
`;

export default function PortfolioTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<
    string | undefined
  >(undefined);
  const { data: portfolios } = useAppSelector(
    (state) => state.portfolioReducer.allPortfolios,
  );

  return (
    <>
      <CustomTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableHeaderCell>Order</CustomTableHeaderCell>
              <CustomTableHeaderCell>Title</CustomTableHeaderCell>
              <CustomTableHeaderCell>Image</CustomTableHeaderCell>
              <CustomTableHeaderCell />
              <CustomTableHeaderCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {portfolios.length === 0 && (
              <EmptyTableBody message="No portfolios to show" colSpan={5} />
            )}
            {portfolios.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomTableDataCell>{row.order}</CustomTableDataCell>
                <CustomTableDataCell>{row.title}</CustomTableDataCell>
                <CustomTableDataCell>
                  {row?.imageUrl ? (
                    <div
                      style={{
                        border: '1px solid lightgray',
                        marginRight: '10px',
                        height: '42px',
                        width: '122px',
                        backgroundColor: 'white',
                      }}
                    >
                      <CompanyLogo src={row?.imageUrl} alt="image" />
                    </div>
                  ) : (
                    '-'
                  )}
                </CustomTableDataCell>
                <CustomTableDataDeleteCell>
                  <IconButton
                    onClick={() => {
                      setSelectedPortfolioId(row.id);
                      setOpenDeleteConfirmationModal(true);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </CustomTableDataDeleteCell>
                <CustomTableDataEditCell>
                  <IconButton
                    onClick={() =>
                      navigate(`${ROUTE_PORTFOLIO}/${row.id}`, {
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
          setSelectedPortfolioId(undefined);
        }}
        isCancellationModal
        modalTitle="Are you sure you want to delete the item?"
        modalDescription="This item will delete and it can't be reversed."
        backButtonText="Go back"
        backButtonAction={() => {
          setOpenDeleteConfirmationModal(false);
          setSelectedPortfolioId(undefined);
        }}
        continueButtonText="Delete"
        continueButtonAction={() => {
          if (selectedPortfolioId) {
            dispatch(portfolioActions.deletePortfolio(selectedPortfolioId));
            setOpenDeleteConfirmationModal(false);
            setSelectedPortfolioId(undefined);
          }
        }}
      />
    </>
  );
}
