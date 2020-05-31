import {Link} from '../../models/Link';
import {User} from '../../models/User';

export interface ILinkService {
    create(link: Link): Promise<Link>;
}
