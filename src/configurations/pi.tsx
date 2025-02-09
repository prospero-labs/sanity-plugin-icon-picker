import decamelize from 'decamelize';
import * as Pi from 'react-icons/pi';
import { createTags } from '../utils/tags';
import type { FormatFunction, ProviderConfiguration } from '../types';

type PiKey = keyof typeof Pi;

const convertFormat: FormatFunction = (name, options = {}) => {
  //FORMAT REFERENCE https://github.com/tailwindlabs/heroicons
  if (options.outputFormat === 'react') return name;

  const separator = '-';

  //Remove react icon prefixes/identifiers Pi
  const reactPrefix = name.replace(/^(Pi)(.*$)/, '$2');

  //Separate letters followed by numbers (decamelize defaults to omitting separation of letter followed by number)
  const prefix = reactPrefix.replace(/([a-z])([0-9])/i, `$1${separator}$2`);

  return decamelize(prefix, separator);
};

const configuration: ProviderConfiguration = {
  title: 'Phosphor Icons',
  provider: 'pi',
  icons: (options = {}) => {
    return Object.keys(Pi).map((name) => {
      const Icon = Pi[name as PiKey];
      return {
        name: convertFormat(name, options),
        component: () => <Icon />,
        tags: createTags(name, convertFormat),
      };
    });
  },
};

export default configuration;
