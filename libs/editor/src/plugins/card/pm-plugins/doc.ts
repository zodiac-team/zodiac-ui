// import { Transaction, EditorState, NodeSelection } from 'prosemirror-state';
//
// import { pluginKey } from './main';
// import { CardPluginState, Request, CardAppearance } from '../types';
// import { resolveCard, queueCards } from './actions';
// import { appearanceForNodeType } from '../utils';
//
// import { Command } from '../../../types';
// import { processRawValue, getStepRange } from '../../../utils';
// import { Schema } from 'prosemirror-model';
// import { md } from '../../paste/pm-plugins/main';
// import { closeHistory } from 'prosemirror-history';
//
// export const replaceQueuedUrlWithCard = (
//   url: string,
//   cardData: any,
// ): Command => (editorState, dispatch) => {
//   const state = pluginKey.getState(editorState) as CardPluginState | undefined;
//   if (!state) {
//     return false;
//   }
//
//   // find the requests for this URL
//   const requests = state.requests.filter(req => req.url === url);
//
//   // try to transform response to ADF
//   const schema: Schema = editorState.schema;
//   const { inlineCard } = schema.nodes;
//   const cardAdf = processRawValue(schema, cardData);
//
//   let tr = editorState.tr;
//   if (cardAdf) {
//     requests.forEach(request => {
//       // replace all the outstanding links with their cards
//       const pos = tr.mapping.map(request.pos);
//       const node = tr.doc.nodeAt(pos);
//       if (!node || !node.type.isText) {
//         return;
//       }
//
//       // not a link anymore
//       const linkMark = node.marks.find(mark => mark.type.name === 'link');
//       if (!linkMark) {
//         return;
//       }
//
//       const textSlice = node.text;
//       if (linkMark.attrs.href !== url || textSlice !== url) {
//         return;
//       }
//
//       // ED-5638: add an extra space after inline cards to avoid re-rendering them
//       const nodes = [cardAdf];
//       if (cardAdf.type === inlineCard) {
//         nodes.push(schema.text(' '));
//       }
//
//       tr = tr.replaceWith(pos, pos + url.length, nodes);
//     });
//   }
//
//   if (dispatch) {
//     dispatch(resolveCard(url)(closeHistory(tr)));
//   }
//   return true;
// };
//
// export const queueCardsFromChangedTr = (
//   state: EditorState,
//   tr: Transaction,
//   normalizeLinkText: boolean = true,
// ): Transaction => {
//   const { schema } = state;
//   const { link } = schema.marks;
//
//   const stepRange = getStepRange(tr);
//   if (!stepRange) {
//     // no steps mutate this document, do nothing
//     return tr;
//   }
//
//   const requests: Request[] = [];
//   tr.doc.nodesBetween(stepRange.from, stepRange.to, (node, pos) => {
//     if (!node.isText) {
//       return true;
//     }
//
//     const linkMark = node.marks.find(mark => mark.type === link);
//
//     if (linkMark) {
//       // ED-6041: compare normalised link text after linkfy from Markdown transformer
//       // instead, since it always decodes URL ('%20' -> ' ') on the link text
//       const normalizedLinkText = md.normalizeLinkText(linkMark.attrs.href);
//
//       // don't bother queueing nodes that have user-defined text for a link
//       if (node.text !== normalizedLinkText) {
//         return false;
//       }
//
//       requests.push({
//         url: linkMark.attrs.href,
//         pos,
//         appearance: 'inline',
//       } as Request);
//     }
//
//     return false;
//   });
//
//   return queueCards(requests)(tr);
// };
//
// export const changeSelectedCardToLink: Command = (state, dispatch) => {
//   const selectedNode =
//     state.selection instanceof NodeSelection && state.selection.node;
//   if (!selectedNode) {
//     return false;
//   }
//
//   const { link } = state.schema.marks;
//
//   const tr = state.tr.replaceSelectionWith(
//     state.schema.text(selectedNode.attrs.url, [
//       link.create({ href: selectedNode.attrs.url }),
//     ]),
//     false,
//   );
//
//   if (dispatch) {
//     dispatch(tr.scrollIntoView());
//   }
//
//   return true;
// };
//
// export const setSelectedCardAppearance: (
//   appearance: CardAppearance,
// ) => Command = appearance => (state, dispatch) => {
//   const selectedNode =
//     state.selection instanceof NodeSelection && state.selection.node;
//   if (!selectedNode) {
//     return false;
//   }
//
//   if (appearanceForNodeType(selectedNode.type) === appearance) {
//     return false;
//   }
//
//   const { inlineCard, blockCard } = state.schema.nodes;
//   const pos = state.selection.from;
//
//   if (appearance === 'block' && state.selection.$from.parent.childCount === 1) {
//     const tr = state.tr.replaceRangeWith(
//       pos - 1,
//       pos + selectedNode.nodeSize + 1,
//       blockCard.createChecked(
//         selectedNode.attrs,
//         undefined,
//         selectedNode.marks,
//       ),
//     );
//
//     if (dispatch) {
//       dispatch(tr.scrollIntoView());
//     }
//     return true;
//   }
//
//   const tr = state.tr.setNodeMarkup(
//     pos,
//     appearance === 'inline' ? inlineCard : blockCard,
//     selectedNode.attrs,
//     selectedNode.marks,
//   );
//
//   if (dispatch) {
//     dispatch(tr.scrollIntoView());
//   }
//
//   return true;
// };
