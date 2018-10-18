import * as Color from 'color';

import { ContentType } from './content-type';
import { Icon } from './icon';

export class ContentItem {
  id: string;
  title: string;
  accent: Color;
  contentType: ContentType;
  icon?: Icon; // if omitted, will show a default course icon for courses. required by other content
  // TODO: maybe subclass "other content" to make it required there?
}
