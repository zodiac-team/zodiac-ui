import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
// import { CardProvider, CardPluginState, Request } from '../types';
// import reducer from './reducers';
// import { EditorView } from 'prosemirror-view';
// import { setProvider, resolveCard } from './actions';
// import inlineCardNodeView from '../nodeviews/inlineCard';
// import blockCardNodeView from '../nodeviews/blockCard';
// import { replaceQueuedUrlWithCard } from './doc';
// import { CardNodeView } from '../nodeviews';

export const pluginKey = new PluginKey('cardPlugin');
//
// export const getPluginState = (editorState: EditorState) =>
//   pluginKey.getState(editorState) as CardPluginState | undefined;
//
// const handleResolved = (view: EditorView, request: Request) => resolvedCard => {
//   replaceQueuedUrlWithCard(request.url, resolvedCard)(
//     view.state,
//     view.dispatch,
//   );
//   return resolvedCard;
// };
//
// const handleRejected = (view: EditorView, request: Request) => rejected => {
//   view.dispatch(resolveCard(request.url)(view.state.tr));
// };
//
// export const resolveWithProvider = (
//   view: EditorView,
//   outstandingRequests,
//   provider,
//   request: Request,
// ) => {
//   const $pos = view.state.doc.resolve(request.pos);
//   const { parent } = $pos;
//   const isBlock =
//     parent.type.name === 'paragraph' &&
//     parent.childCount === 1 &&
//     parent.firstChild!.type.isText &&
//     parent.firstChild!.text === request.url &&
//     $pos.node($pos.depth - 1).type.name === 'doc';
//
//   outstandingRequests[request.url] = provider
//     .resolve(request.url, isBlock ? 'block' : 'inline')
//     .then(resolvedCard => {
//       delete outstandingRequests[request.url];
//       return resolvedCard;
//     })
//     .then(handleResolved(view, request), handleRejected(view, request));
// };
//
// export const createPlugin = ({
//   portalProviderAPI,
//   dispatch,
//   providerFactory,
// }) =>
//   new Plugin({
//     state: {
//       init(): CardPluginState {
//         return {
//           requests: [],
//           provider: null,
//         };
//       },
//
//       apply(tr, pluginState: CardPluginState) {
//         // update all the positions
//         const remappedState = {
//           ...pluginState,
//           requests: pluginState.requests.map(request => ({
//             ...request,
//             pos: tr.mapping.map(request.pos),
//           })),
//         };
//
//         // apply any actions
//         const meta = tr.getMeta(pluginKey);
//         if (meta) {
//           const nextPluginState = reducer(remappedState, meta);
//           return nextPluginState;
//         }
//
//         return remappedState;
//       },
//     },
//
//     view(view: EditorView) {
//       // listen for card provider changes
//       const handleProvider = (name, provider) => {
//         if (name !== 'cardProvider') {
//           return;
//         }
//
//         provider.then((cardProvider: CardProvider) => {
//           const { state, dispatch } = view;
//           dispatch(setProvider(cardProvider)(state.tr));
//         });
//       };
//
//       providerFactory.subscribe('cardProvider', handleProvider);
//       const outstandingRequests = {};
//
//       return {
//         update(view: EditorView, prevState: EditorState) {
//           const currentState = getPluginState(view.state);
//           const oldState = getPluginState(prevState);
//
//           if (currentState && currentState.provider) {
//             // find requests in this state that weren't in the old one
//             const newRequests = oldState
//               ? currentState.requests.filter(
//                   req =>
//                     !oldState.requests.find(
//                       oldReq =>
//                         oldReq.url === req.url && oldReq.pos === req.pos,
//                     ),
//                 )
//               : currentState.requests;
//
//             // ask the CardProvider to resolve all new requests
//             const { provider } = currentState;
//             newRequests.forEach(request => {
//               resolveWithProvider(view, outstandingRequests, provider, request);
//             });
//           }
//         },
//
//         destroy() {
//           // cancel all outstanding requests
//           Object.keys(outstandingRequests).forEach(url =>
//             Promise.reject(outstandingRequests[url]),
//           );
//
//           providerFactory.unsubscribe('cardProvider', handleProvider);
//         },
//       };
//     },
//
//     props: {
//       nodeViews: {
//         inlineCard: CardNodeView.fromComponent(
//           inlineCardNodeView,
//           portalProviderAPI,
//           {
//             providerFactory,
//           },
//         ),
//         blockCard: CardNodeView.fromComponent(
//           blockCardNodeView,
//           portalProviderAPI,
//           {
//             providerFactory,
//           },
//         ),
//       },
//     },
//
//     key: pluginKey,
//   });
