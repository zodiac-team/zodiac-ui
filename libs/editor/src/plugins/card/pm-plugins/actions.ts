import { pluginKey } from './main';
import { CardProvider, CardPluginAction, Request } from '../types';
import { Transaction } from 'prosemirror-state';

export const cardAction = (tr, action: CardPluginAction): Transaction => {
  return tr.setMeta(pluginKey, action);
};

export const resolveCard = url => (tr: Transaction) =>
  cardAction(tr, {
    type: 'RESOLVE',
    url,
  });

export const queueCards = (requests: Request[]) => (tr: Transaction) =>
  cardAction(tr, {
    type: 'QUEUE',
    requests: requests,
  });

export const setProvider = (cardProvider: CardProvider | null) => (
  tr: Transaction,
) =>
  cardAction(tr, {
    type: 'SET_PROVIDER',
    provider: cardProvider,
  });
