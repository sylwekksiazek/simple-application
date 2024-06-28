import React, { useEffect, useState } from 'react';
import { IRoom } from '../../models';
import { fetchRoomAvail, fetchRoomList } from '../../services';
import { Button, Pagination, Table } from 'react-bootstrap';
import RoomListItem from './RoomListItem/RoomListItem.tsx';

const RoomList = () => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<'name' | 'price'>('price');
  const [page, setPage] = useState<number>(1);
  const rowsPerPage: number = 4;

  const getRoomList = async () => {
    const rooms = await fetchRoomList();
    setRooms(rooms);
  };

  const getSingleRoomAvail = async (roomId: number) => {
    const avail = await fetchRoomAvail(roomId);
    setRooms((prevRooms) =>
      prevRooms.map((room: IRoom) =>
        room.id === roomId ? { ...room, avail } : room,
      ),
    );
  };

  const getAllRoomsAvail = async () => {
    await Promise.all(rooms.map((room) => getSingleRoomAvail(room.id)));
  };

  const handleBook = (room: IRoom) => {
    console.log(
      `Booked room: ${room.name} for ${room.avail?.price?.value} ${room.avail?.price?.currencyCode}`,
    );
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const handleSort = (property: 'name' | 'price') => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(1);
  };

  const sortedRooms = rooms.sort((a, b) => {
    if (orderBy === 'price') {
      return order === 'asc'
        ? a.price.value - b.price.value
        : b.price.value - a.price.value;
    } else if (orderBy === 'name') {
      return order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const paginatedRooms = sortedRooms.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const totalPages = Math.ceil(rooms.length / rowsPerPage);

  return (
    <div className="container">
      <div className="d-flex justify-content-between my-2 vertic">
        <h2>Room List</h2>
        <Button
          variant="outline-primary"
          aria-label="Check all rooms availability"
          onClick={getAllRoomsAvail}
          disabled={rooms.every((room) => room.avail)}
        >
          Check Availabilities
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th
              className="align-middle"
              role="button"
              aria-label="Sort by name"
              onClick={() => handleSort('name')}
            >
              Name {orderBy === 'name' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th
              className="align-middle"
              role="button"
              aria-label="Sort by price"
              onClick={() => handleSort('price')}
            >
              Initial Price{' '}
              {orderBy === 'price' ? (order === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th className="align-middle">Availability</th>
            <th className="align-middle">New Price</th>
            <th className="align-middle">Price Diff</th>
            <th className="align-middle">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRooms.map((room) => (
            <RoomListItem
              key={room.id}
              room={room}
              onCheckAvailability={getSingleRoomAvail}
              onBook={handleBook}
            />
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center">
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === page}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default RoomList;
