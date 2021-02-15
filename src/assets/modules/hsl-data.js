import {fetchPostJson} from './network';
const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const getRidesByStopId = async (id) => {
  const query = `{
    stop(id: "HSL:${id}") {
      name
      stoptimesWithoutPatterns {
        scheduledArrival
        realtimeArrival
        arrivalDelay
        scheduledDeparture
        realtimeDeparture
        departureDelay
        realtime
        realtimeState
        serviceDay
        headsign
        trip {
          routeShortName
          tripHeadsign
        }
      }
    }
  }`;
  return await fetchPostJson(apiUrl, "application/graphql", query);
};

/**
 *
 * @param {number} seconds - since midnight
 * @returns {string} HH:MMM
 */
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60) - (hours * 60);

  return `${hours}:${minutes < 10 ? '0'+minutes : minutes}`;
};

const HSLData = {getRidesByStopId, formatTime};

export default HSLData;
