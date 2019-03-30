import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

import keymapPlugin from './keymap';
import inputRulePlugin from './input-rule';

const plugins = (schema: Schema) => {
  return [inputRulePlugin(schema), keymapPlugin(schema)].filter(
    plugin => !!plugin,
  ) as Plugin[];
};

export default plugins;
