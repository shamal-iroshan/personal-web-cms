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

const tempData = [
  {
    id: '2',
    name: 'covid statics',
    title: 'Covid Static Meter',
    description: 'This application can show live count of covid statics',
    image: 'https://document.shamaliroshan.com/covid-statics.png',
    link: 'https://flamboyant-davinci-7745f3.netlify.app/',
    createdAt: '2022-01-07T12:44:28.506Z',
    updatedAt: '2022-02-19T04:28:54.398Z',
    publishedAt: '2022-01-07T12:44:34.431Z',
    order: 1,
  },
  {
    id: '3',
    name: 'story maker',
    title: 'Story maker',
    description:
      'From this application, you can make your own story with friends',
    image: 'https://document.shamaliroshan.com/story-maker.png',
    link: 'https://story-maker-74937.web.app/',
    createdAt: '2022-01-07T12:46:00.821Z',
    updatedAt: '2022-02-18T22:40:31.701Z',
    publishedAt: '2022-01-11T16:40:26.157Z',
    order: 2,
  },
  {
    id: '4',
    name: 'code camp',
    title: 'Arduino code camp',
    description:
      'Certificate for completing the Arduino code camp held by myhub.lk',
    image:
      'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
    link: 'https://document.shamaliroshan.com/CODECAMP2106_1625492207866_shamal%20iroshan.jpeg',
    createdAt: '2022-02-04T16:53:10.204Z',
    updatedAt: '2022-02-18T22:39:03.143Z',
    publishedAt: '2022-02-04T16:53:15.288Z',
    order: 4,
  },
];

export default function PortfolioTable() {
  const navigate = useNavigate();
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState<
    string | undefined
  >(undefined);

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
            {tempData.length === 0 && (
              <EmptyTableBody message="No configs to show" colSpan={5} />
            )}
            {tempData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <CustomTableDataCell>{row.order}</CustomTableDataCell>
                <CustomTableDataCell>{row.title}</CustomTableDataCell>
                <CustomTableDataCell>
                  {row?.image ? (
                    <div
                      style={{
                        border: '1px solid lightgray',
                        marginRight: '10px',
                        height: '42px',
                        width: '122px',
                        backgroundColor: 'white',
                      }}
                    >
                      <CompanyLogo src={row?.image} alt="image" />
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
          // eslint-disable-next-line no-console
          console.log(selectedPortfolioId);
          setOpenDeleteConfirmationModal(false);
          setSelectedPortfolioId(undefined);
        }}
      />
    </>
  );
}
