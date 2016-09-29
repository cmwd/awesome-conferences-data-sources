import { stringify } from 'querystring';
import fetch from '../utils/fetch';

export const getConferences = host =>
  ({ limit = 20, offset = 0 }) =>
    fetch(`${host}/conference?${stringify({ limit, offset })}`)
      .then(response => response.json());

export const getConference = host =>
  ({ slug }) =>
    fetch(`${host}/conference/${slug}`)
      .then(response => response.json());

export const getVideos = host =>
  ({ conferenceId }) =>
    fetch(`${host}/video/${conferenceId}`)
      .then(response => response.json());
