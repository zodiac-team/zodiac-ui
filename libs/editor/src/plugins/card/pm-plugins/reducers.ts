// import {
//   CardPluginState,
//   CardPluginAction,
//   SetProvider,
//   Queue,
//   Resolve,
//   Request,
// } from '../types';
//
// const queue = (state: CardPluginState, action: Queue) => {
//   return {
//     ...state,
//     requests: state.requests.concat(action.requests),
//   };
// };
//
// const resolve = (state: CardPluginState, action: Resolve) => {
//   const requests = state.requests.reduce(
//     (requests, request) => {
//       if (request.url !== action.url) {
//         requests.push(request);
//       }
//
//       return requests;
//     },
//     [] as Request[],
//   );
//
//   return {
//     ...state,
//     requests,
//   };
// };
//
// const setProvider = (state: CardPluginState, action: SetProvider) => {
//   return { ...state, provider: action.provider };
// };
//
// export default (
//   state: CardPluginState,
//   action: CardPluginAction,
// ): CardPluginState => {
//   switch (action.type) {
//     case 'QUEUE':
//       return queue(state, action);
//     case 'SET_PROVIDER':
//       return setProvider(state, action);
//     case 'RESOLVE':
//       return resolve(state, action);
//   }
// };
