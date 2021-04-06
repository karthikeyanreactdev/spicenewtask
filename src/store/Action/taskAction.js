import axios from 'axios';
import apiRoot from '../../ApiPath';

//actions
export const getAll = 'getAll';
export const Create = 'Create';
export const Update = 'Update';

// action creator

// this module handles create the task
export const createTask = (data) => async dispatch => {
    await axios.post(`${apiRoot.url}/task/lead_04412ba1d622466cab1f0ad941fcf303`,data)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: Create,
                    payload: 'Success'
                });
            },
            err => {             
                dispatch({
                    type: Create,
                    payload: 'Error'
                });
            }
        );
};
// this module update the ttask
export const updateTask = (data,id) => async dispatch => {
    await axios.put(`${apiRoot.url}/task/lead_04412ba1d622466cab1f0ad941fcf303/${id}`,data)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: Update,
                    payload: 'Success'
                });
            },
            err => {            
                dispatch({
                    type: Update,
                    payload: 'Error'
                });
            }
        );
};

// this module handles get all task

export const getAlltasks= () => async dispatch => {

    await axios.get(`${apiRoot.url}/task/lead_04412ba1d622466cab1f0ad941fcf303`)
        .then(response => response.data)
        .then(
            result => {
                dispatch({
                    type: getAll,
                    payload: result.results
                });
            },
            err => {
                dispatch({
                    type: getAll,
                    payload: []
                });

            }
        );
};
