import Cube from 'datatypes/Cube';

import { Notification } from 'datatypes/Notification';
import Image from './Image';

export default interface User {
  id: string;
  username: string;
  usernameLower?: string;
  cubes?: Cube[];
  about?: string;
  hideTagColors?: boolean;
  followedCubes?: string[];
  followedUsers?: string[];
  following?: string[];
  image?: Image;
  imageName?: string;
  roles?: string[];
  theme?: string;
  hideFeatured?: boolean;
  patron?: string;
  notifications?: Notification[];
}
