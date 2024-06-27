import { IRoom, IRoomAvail } from '../models';
import axios from 'axios';

const API_URL: string = 'https://dcontent.inviacdn.net/shared/dev/test-api';

export const fetchRoomList = async (): Promise<IRoom[]> => {
  try {
    const response = await axios.get(`${API_URL}/rooms`);
    return response.data;
  } catch {
    throw new Error('Failed to fetch room list');
  }
};

export const fetchRoomAvail = async (id: number): Promise<IRoomAvail> => {
  try {
    const response = await axios.get(`${API_URL}/room/${id}`);
    return response.data;
  } catch {
    throw new Error('Failed to fetch room availability');
  }
};
