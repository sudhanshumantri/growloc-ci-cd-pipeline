import Pusher from 'pusher-js';
import { fetchPusherRequest } from '../actions/pusher';

export async function getPusherData(){
    const pusher = new Pusher('74168d0c587988b1d7a3', {
        cluster: 'ap2',
        encrypted: true
      });
      const channel = pusher.subscribe('sensor-channel');
      channel.bind("sensor-event", data => {
        fetchPusherRequest(data.data);
         
      });
}