import * as React from 'react';
import Menu from '@mui/material/Menu';
import { styled as materialStyled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const MaterialStyledEmptyText = materialStyled(Typography)({
  fontSize: 16,
  textAlign: 'center',
  margin: '30px 0',
}) as typeof Typography;

interface NotificationMenuProps {
  anchorEl: null | HTMLElement;
  handleClose: VoidFunction;
}

interface ITitleProps {
  isRead: boolean;
}

const MaterialStyledTitle = materialStyled(Typography)(
  ({ isRead }: ITitleProps) => ({
    fontWeight: isRead ? 400 : 'bold',
    fontSize: 16,
    lineHeight: '130%',
    color: isRead ? '#667085' : 'black',
  }),
);

const MaterialStyledDescription = materialStyled(Typography)(
  ({ isRead }: ITitleProps) => ({
    fontWeight: isRead ? 400 : 'bold',
    lineHeight: '130%',
    fontSize: 14,
    color: isRead ? '#667085' : 'black',
  }),
);

const StyledDivider = materialStyled(Divider)({
  marginTop: 10,
  marginBottom: 10,
}) as typeof Divider;

export default function NotificationMenu(props: NotificationMenuProps) {
  const { anchorEl, handleClose } = props;
  const open = Boolean(anchorEl);
  const notifications = [
    {
      notificationId: '1',
      isRead: false,
      title: 'test',
      description: 'description',
    },
  ];

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          minWidth: '300px',
          maxWidth: '300px',
          maxHeight: '75vh',
          padding: '20px',
          border: '1px solid #E3E8EF',
          boxShadow: '0 0 10px 2px #E3E8EF',
          overflowX: 'hidden',
          overflowY: 'scroll',
          mt: 1.5,
          '& ul.MuiList-root': {
            padding: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {notifications.length === 0 && (
        <MaterialStyledEmptyText>No notifications</MaterialStyledEmptyText>
      )}
      {notifications.map((el, index) => (
        <div key={el.notificationId}>
          <MaterialStyledTitle isRead={el.isRead}>
            {el.title}
          </MaterialStyledTitle>
          <MaterialStyledDescription isRead={el.isRead}>
            {el.description}
          </MaterialStyledDescription>
          {index !== notifications.length - 1 && <StyledDivider />}
        </div>
      ))}
    </Menu>
  );
}
