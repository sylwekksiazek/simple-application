import React from 'react';
import { Button } from 'react-bootstrap';
import { IRoom, RoomAvailabilityStatus } from '../../../models';

interface RoomProps {
  room: IRoom;
  onCheckAvailability: (roomId: number) => void;
  onBook: (room: IRoom) => void;
}

const RoomListItem: React.FC<RoomProps> = ({
  room,
  onCheckAvailability,
  onBook,
}) => {
  const handleCheckAvailability = () => {
    onCheckAvailability(room.id);
  };

  const handleBook = () => {
    onBook(room);
  };

  return (
    <tr>
      <td className="align-middle">{room.name}</td>
      <td className="align-middle">
        {room.price.value || room.price.value}{' '}
        {room.price.currencyCode || room.price.currencyCode}
      </td>
      <td className="align-middle">
        {room.availabilityStatus || (
          <Button
            variant="outline-primary"
            aria-label={`Check availability for ${room.name}`}
            onClick={handleCheckAvailability}
          >
            check
          </Button>
        )}
      </td>
      <td className="align-middle">
        {room.oldPrice && room.oldPrice.value - room.price.value}
      </td>
      <td className="align-middle d-flex">
        <Button
          variant="outline-primary"
          aria-label={`Book ${room.name}`}
          onClick={handleBook}
          disabled={
            room.availabilityStatus !== RoomAvailabilityStatus.AVAILABLE
          }
        >
          Book
        </Button>
      </td>
    </tr>
  );
};

export default RoomListItem;
