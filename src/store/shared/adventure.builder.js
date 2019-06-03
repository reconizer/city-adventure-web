import axios from 'axios';
import Vue from 'vue';

import { i18n } from '@/translations/i18n'

import {
  SET_LOADING, SET_ERROR,
  SET_ADVENTURE, CLEAR_ADVENTURE,
  SET_ADVENTURE_STATUS,

  SET_ADVENTURE_POINTS, CLEAR_ADVENTURE_POINTS, 
  SET_POINT, ADD_POINT, REMOVE_POINT,
  SET_POINTS_ORDER,

  SET_CLUE, ADD_CLUE, REMOVE_CLUE,

  SET_MAIN_IMAGE, ADD_GALLERY_IMAGE,
  REMOVE_GALLERY_IMAGE,

  SET_UPLOAD_IN_PROGRESS, SET_UPLOAD_PROGRESS,
  SET_TOTAL_UPLOADS, SET_CURRENT_UPLOAD,
  CLEAR_UPLOAD_INFO
} from '@/store/mutation-types';

import {
  LOAD_ADVENTURE, UPDATE_ADVENTURE,

  UPLOAD_MAIN_IMAGE, UPDATE_GALLERY_IMAGES,
  CREATE_GALLERY_IMAGES, DESTROY_GALLERY_IMAGE,

  UPDATE_POINT, CREATE_POINT, DESTROY_POINT,
  UPDATE_POINTS,

  UPDATE_CLUE, CREATE_CLUE, DESTROY_CLUE,
  UPDATE_CLUES,
} from '@/store/action-types';

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_PENDING,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default (api) => {
  return {
    namespaced: true,
    state: {
      item: { status: null },
      points: [],
      history: [],

      upload: {
        inProgress: false,
        progress: 0,

        totalUploads: 1,
        currentUpload: 1
      },

      loading: false,
      errors: {
        [LOAD_ADVENTURE]: null, [UPDATE_ADVENTURE]: null,

        [UPDATE_POINT]: null, [CREATE_POINT]: null,
        [DESTROY_POINT]: null, [UPDATE_POINTS]: null,

        [UPDATE_CLUE]: null, [CREATE_CLUE]: null,
        [DESTROY_CLUE]: null, [UPDATE_CLUES]: null
      }
    },
    getters: {
      startingPoint: (state) => {
        return state.points[0] || null;
      },
      puzzlePoints: (state) => {
        return state.points.filter((element, index) => {
          return index > 0;
        });
      },

      published: (state) => state.item.status == ADVENTURES_PUBLISHED,
      inReview: (state) => state.item.status == ADVENTURES_IN_REVIEW,
      pending: (state) => state.item.status == ADVENTURES_PENDING,
      rejected: (state) => state.item.status == ADVENTURES_REJECTED,
      cancelled: (state) => state.item.status == ADVENTURES_CANCELLED,
      unpublished: (state) => state.item.status == ADVENTURES_UNPUBLISHED,

      publishedStatusLabel: (state) => {
        switch(state.item.status) {
          default:
          case ADVENTURES_PUBLISHED:
            return i18n.t("adventures.adventure_published");
          case ADVENTURES_IN_REVIEW:
            return i18n.t("adventures.adventure_in_review");
          case ADVENTURES_UNPUBLISHED:
            return i18n.t("adventures.adventure_unpublished");
          case ADVENTURES_REJECTED:
            return i18n.t("adventures.adventure_rejected");
          case ADVENTURES_PENDING:
            return i18n.t("adventures.adventure_pending");
          case ADVENTURES_CANCELLED:
            return i18n.t("adventures.adventure_cancelled");
        }
      },

      editable: (_, getters) => getters.pending
    },
    mutations: {
      /**
       * ADVENTURE
       */
      [SET_ADVENTURE] (state, adventure) {
        adventure.images = adventure.images.sort((i1, i2) => i1.order > i2.order);

        state.item = adventure;
      },

      [CLEAR_ADVENTURE] (state) {
        state.item = { };
      },

      [SET_ADVENTURE_POINTS] (state, points) {
        points.forEach((point) => {
          point.clues = point.clues.sort((c1, c2) => c1.order > c2.order);
        });

        state.points = points;
      },

      [CLEAR_ADVENTURE_POINTS] (state) {
        state.points = [];
      },

      /**
       * ADVENTURE IMAGES
       */
      [SET_MAIN_IMAGE] (state, mainImageURL) {
        state.item.cover_url = mainImageURL;
      },

      [ADD_GALLERY_IMAGE] (state, galleryImage) {
        state.item.images.push(galleryImage);
      },

      [REMOVE_GALLERY_IMAGE] (state, galleryImageId) {
        let index = state.item.images.findIndex(image => image.id == galleryImageId);

        state.item.images.splice(index, 1);
      },

      /**
       * POINTS
       */
      [ADD_POINT] (state, point) {
        state.points.push(point);
      },

      [SET_POINT] (state, { id, data }) {
        let index = state.points.findIndex(item => item.id == id);

        let params = Object.assign({ }, state.points[index], data);

        Vue.set(state.points, index, params);
      },

      [REMOVE_POINT] (state, pointId) {
        let index = state.points.findIndex(point => point.id == pointId);

        let child = state.points.find(point => point.parent_id == pointId);

        if(child) {
          let point = state.points[index];

          child.parent_id = point.parent_id;

          Vue.set(state.points, index + 1, child);
        }

        state.points.splice(index, 1);
      },

      [SET_POINTS_ORDER] (state, values) {
        let newPoints = [];

        for(let i = 0; i < values.length; i++) {
          let index = state.points.findIndex(point => point.id == values[i].id);

          let pointData = state.points[index];

          pointData.parent_id = values[i].parent_id;

          newPoints.push(pointData);
        }

        state.points = [state.points[0], ...newPoints];
      },

      /**
       * CLUES
       */
      [ADD_CLUE] (state, { pointId, data }) {
        let index = state.points.findIndex(item => item.id == pointId);
        let pointData = state.points[index]

        pointData.clues.push(data);

        Vue.set(state.points, index, pointData);
      },

      [SET_CLUE] (state, { pointId, clueId, data }) {
        let pointIndex = state.points.findIndex(item => item.id == pointId);
        let pointData = state.points[pointIndex];

        let index = pointData.clues.findIndex(item => item.id == clueId);

        Vue.set(state.points[pointIndex].clues, index, data)
      },

      [REMOVE_CLUE] (state, { pointId, clueId }) {
        let point = state.points.find(point => point.id == pointId);

        let index = point.clues.findIndex(clue => clue.id == clueId);

        point.clues.splice(index, 1);
      },

      /**
       * PUBLISHMENT-RELATED
       */
      [SET_ADVENTURE_STATUS] (state, status) {
        state.item.status = status;
      },

      /**
       * UPLOADS
       */
      [SET_UPLOAD_IN_PROGRESS] (state, uploading) {
        state.upload.inProgress = uploading;
      },

      [SET_UPLOAD_PROGRESS] (state, progress) {
        state.upload.progress = progress;
      },

      [SET_TOTAL_UPLOADS] (state, total) {
        state.upload.totalUploads = total;
      },

      [SET_CURRENT_UPLOAD] (state, current) {
        state.upload.currentUpload = current;
      },

      [CLEAR_UPLOAD_INFO] (state) {
        state.upload.inProgress = false;
        state.upload.progress = 0;
        state.upload.totalUploads = 1;
        state.upload.currentUpload = 1;
      },

      /**
       * GENERAL
       */
      [SET_LOADING] (state, loading) {
        state.loading = loading;
      },

      [SET_ERROR] (state, { key, error }) {
        state.errors[key] = error;
      }
    },
    actions: {
      /**
       * ADVENTURE
       */
      [LOAD_ADVENTURE] ({ commit }, { id }) {
        commit(CLEAR_ADVENTURE);
        commit(CLEAR_ADVENTURE_POINTS);

        commit(SET_LOADING, true);

        return Promise.all([
          api.adventures.loadAdventure(id),
          api.adventures.loadPoints(id)
        ]).then( (values) => {
            commit(SET_ADVENTURE, values[0].data);
            commit(SET_ADVENTURE_POINTS, values[1].data);

            commit(SET_LOADING, false);

            return values;
          })
          .catch( error => {
            commit(SET_ERROR, { key: LOAD_ADVENTURE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_ADVENTURE] ({ commit, state }, { params }) {
        commit(SET_LOADING, true);
        commit(SET_ERROR, { key: UPDATE_ADVENTURE, error: null });

        return api.adventures.updateAdventure(state.item.id, params)
          .then( response => {
            return api.adventures.loadAdventure(state.item.id)
          }).then( response => {
            commit(SET_ADVENTURE, response.data);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_ADVENTURE, error: error.response.data })
            commit(SET_LOADING, false);

            throw error;
          });
      },

      /**
       * ADVENTURE IMAGES
       */
      [UPLOAD_MAIN_IMAGE] ({ commit, state }, { file }) {
        commit(SET_LOADING, true);
        commit(CLEAR_UPLOAD_INFO);

        let onProgress = (progressEvent) => {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          commit(SET_UPLOAD_PROGRESS, percent);
        };

        return api.adventures.getAdventureMainImageUploadURL(state.item.id, file)
          .then( response => {
            commit(SET_UPLOAD_IN_PROGRESS, true);

            return api.adventures.uploadImage(file, response.data.url, onProgress);
          })
          .then( response => {
            commit(SET_MAIN_IMAGE, URL.createObjectURL(file));

            commit(CLEAR_UPLOAD_INFO);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPLOAD_MAIN_IMAGE, error: error.response.data });

            commit(SET_LOADING, false);

            commit(SET_UPLOAD_IN_PROGRESS, false);

            throw error;
          });
      },

      [CREATE_GALLERY_IMAGES] ({ commit, state }, { files }) {
        commit(SET_LOADING, true);
        commit(CLEAR_UPLOAD_INFO);

        let onProgress = (progressEvent) => {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          commit(SET_UPLOAD_PROGRESS, percent);
        };

        commit(SET_TOTAL_UPLOADS, files.length);
        commit(SET_UPLOAD_IN_PROGRESS, true);

        let baseOrder = Math.max(...(state.item.images.map((im) => im.order)));

        const upload = files.reduce( (prev, current, index) => {
          return prev
            .then( response => {
              return api.adventures.getAdventureGalleryImageUploadURL(state.item.id, current);
            })
            .then( response => {
              commit(SET_UPLOAD_PROGRESS, 0);
              commit(SET_CURRENT_UPLOAD, index + 1);

              return api.adventures.uploadImage(current, response.data.url, onProgress);
            })
            .then( response => {
              commit(ADD_GALLERY_IMAGE, {
                id: +new Date(),
                url: URL.createObjectURL(current),
                order: baseOrder + index + 1
              });

              //to allow chaining always return a promise as result
              return Promise.resolve();
            });
        }, Promise.resolve());

        return upload
          .then( (reponse) => {
            commit(CLEAR_UPLOAD_INFO);
            commit(SET_LOADING, false);
          })
          .catch( error => {
            console.log(error);
            commit(SET_ERROR, { key: CREATE_GALLERY_IMAGES, error: error.response.data });

            commit(SET_LOADING, false);

            commit(SET_UPLOAD_IN_PROGRESS, false);

            throw error;
          });
      },

      [DESTROY_GALLERY_IMAGE] ({ commit, state }, { imageId }) {
        commit(SET_LOADING, true);

        return api.adventures.destroyGalleryImage(state.item.id, imageId)
          .then( response => {
            commit(SET_LOADING, false);

            commit(REMOVE_GALLERY_IMAGE, imageId);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: DESTROY_GALLERY_IMAGE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_GALLERY_IMAGES] ({ commit, state }, { payload }) {
        commit(SET_LOADING, true);

        return api.adventures.updateAdventureImages(state.item.id, payload)
          .then( response => {
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_GALLERY_IMAGES, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      /**
       * POINTS
       */
      [CREATE_POINT] ({ commit, state }, { parentId, lat, lng }) {
        commit(SET_LOADING, true);

        return api.adventures.createPoint(state.item.id, parentId, lat, lng)
          .then( response => {
            commit(ADD_POINT, response.data);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: CREATE_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [UPDATE_POINT] ({ commit, state }, { pointId, params }) {
        commit(SET_LOADING, true);

        return api.adventures.updatePoint(state.item.id, pointId, params)
          .then( response => {
            return api.adventures.loadPoints(state.item.id);
          }).then( response => {
            commit(SET_ADVENTURE_POINTS, response.data);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [DESTROY_POINT] ({ commit, state }, { pointId }) {
        commit(SET_LOADING, true);

        return api.adventures.destroyPoint(state.item.id, pointId)
          .then( response => {
            commit(REMOVE_POINT, pointId);

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: DESTROY_POINT, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      // Used for re-ordering points
      [UPDATE_POINTS] ({ commit, state }, { payload }) {
        commit(SET_LOADING, true);

        return api.adventures.updatePoints(state.item.id, payload)
          .then( response => {
            commit(SET_POINTS_ORDER, payload);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_POINTS, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      /**
       * CLUES
       */
      [CREATE_CLUE] ({ commit, state }, { pointId, data, file }) {
        commit(SET_LOADING, true);

        let clueCreateResponse = null;

        let onProgress = (progressEvent) => {
          let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          commit(SET_UPLOAD_PROGRESS, percent);
        };

        return api.adventures.createClue(state.item.id, pointId, data)
          .then( response => {
            clueCreateResponse = response;

            return api.adventures.getClueAssetUploadURL(state.item.id, response.data.id, response.data.type, file);
          })
          .then( response => {
            if(file != null && data.type != 'text' && data.type != 'url') {
              commit(SET_UPLOAD_IN_PROGRESS, true);
            }

            return api.adventures.uploadClueAsset(file, response.data.url, onProgress);
          })
          .then( response => {
            if(file != null && data.type != 'text' && data.type != 'url') {
              if(data.type == 'video') {
                clueCreateResponse.data.video_url = URL.createObjectURL(file);
              } else {
                clueCreateResponse.data.url = URL.createObjectURL(file);
              }

              commit(CLEAR_UPLOAD_INFO);
            }

            commit(ADD_CLUE, {
              pointId: pointId,
              data: clueCreateResponse.data
            });

            commit(SET_LOADING, false);

            return clueCreateResponse;
          })
          .catch( error => {
            commit(SET_ERROR, { key: CREATE_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            commit(SET_UPLOAD_IN_PROGRESS, false);

            throw error;
          });
      },

      [UPDATE_CLUE] ({ commit, state }, { pointId, clueId, data }) {
        commit(SET_LOADING, true);

        return api.adventures.updateClue(state.item.id, pointId, clueId, data)
          .then( response => {
            return api.adventures.loadPoints(state.item.id);
          }).then( response => {
            commit(SET_ADVENTURE_POINTS, response.data);
            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      [DESTROY_CLUE] ({ commit, state }, { pointId, clueId }) {
        commit(SET_LOADING, true);

        return api.adventures.destroyClue(state.item.id, pointId, clueId)
          .then( response => {
            commit(REMOVE_CLUE, { pointId, clueId });

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: DESTROY_CLUE, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      },

      // Used for re-ordering clues
      [UPDATE_CLUES] ({ commit, state }, { payload }) {
        commit(SET_LOADING, true);

        return api.adventures.updateClues(state.item.id, payload)
          .then( response => {
            //TODO does not require any response?
            //TODO does it require state manipulation?

            commit(SET_LOADING, false);

            return response;
          })
          .catch( error => {
            commit(SET_ERROR, { key: UPDATE_CLUES, error: error.response.data });
            commit(SET_LOADING, false);

            throw error;
          });
      }
    }
  }
}
