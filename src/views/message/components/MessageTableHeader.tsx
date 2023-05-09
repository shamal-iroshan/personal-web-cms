import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SelectChangeEvent } from '@mui/material/Select';
import TableHeader from '../../../common/TableHeader';
import { MessageSortBy } from '../../../utils/constants';
import SortByMenu from './SortByMenu';
import { useAppSelector } from '../../../store/types';

const sortByMenuForMessage = [
  { value: MessageSortBy.ALL, label: 'All' },
  { value: MessageSortBy.READ, label: 'Read' },
  { value: MessageSortBy.UNREAD, label: 'Unread' },
];

export default function MessageTableHeader() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total } = useAppSelector((state) => state.messageReducer.allMessages);

  const currentSortBy =
    (searchParams.get('sortBy') as MessageSortBy) ?? MessageSortBy.ALL;

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(currentSortBy);
  }, [currentSortBy]);

  const handleSortByChange = (event: SelectChangeEvent) => {
    switch (event.target.value) {
      case MessageSortBy.ALL:
        searchParams.set('sortBy', MessageSortBy.ALL);
        break;
      case MessageSortBy.READ:
        searchParams.set('sortBy', MessageSortBy.READ);
        break;
      case MessageSortBy.UNREAD:
        searchParams.set('sortBy', MessageSortBy.UNREAD);
        break;
      default:
        searchParams.delete('sortBy');
    }
    setSearchParams(searchParams);
  };

  return (
    <TableHeader
      title="Message"
      total={total}
      description="Mange messages from here."
    >
      <SortByMenu
        currentSortBy={currentSortBy}
        handleSortByChange={handleSortByChange}
        options={sortByMenuForMessage}
      />
    </TableHeader>
  );
}
