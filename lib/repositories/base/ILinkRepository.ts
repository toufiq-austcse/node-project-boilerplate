import {Link} from '../../models/Link';
import {User} from '../../models/User';

export interface ILinkRepository {
    create(link: Link): Promise<Link>;
}
