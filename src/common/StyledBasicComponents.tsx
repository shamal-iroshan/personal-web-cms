import styled from 'styled-components';
import { Form } from 'formik';

export const StyledForm = styled(Form)`
  width: 100%;
  align-self: center;
`;

export const SharedErrorText = styled.p`
  color: #fc8181;
  font-size: 14px;
  text-align: left;
  margin-top: 2px;
`;

export const EmptyText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #718096;
`;

export const TableHeaderLabel = styled.span<{
  background?: string;
  color?: string;
}>`
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  background: ${({ background }) => background ?? '#eff8ff'};
  border-radius: 22px;
  padding: 2px 8px;
  color: ${({ color }) => color ?? '#175cd3'};
  align-self: center;
  margin-left: 10px;
  letter-spacing: normal;
  white-space: nowrap;
`;
