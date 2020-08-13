import rp = require('request-promise')
import { ServiceConfig, ContactItem, MprofielResult, MprofielResultItem } from './types';
import { authenticatedOAuth2 } from '../auth';

const mapResultItem = (item: MprofielResultItem) => {
    return {
        id: item.id,
        name: item.fullName,
        firstName: item.firstName,
        lastName: item.lastName,
        userName: item.userName,
        email: item.emailWork,
        domain: item.domain,
        avatarUrl: item.avatarUrl
    };
}
const mapResult = (result: MprofielResult) =>
    result._embedded.profiles.map(mapResultItem).sort(sortByNameFn);

const getFirstWord = (str: string) => (str || '').split(' ')[0];
const sortByNameFn = (a: ContactItem, b: ContactItem) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase());

/**
 * Create a function that calls the mprofiel service and finds contacts
 * matching a search string
 */
export = function createService(config: ServiceConfig): (search: string) => Promise<ContactItem[]> {
    const getContacts = (accessToken: string, search: string) => {
        if (!search) return Promise.resolve([]);
        const searchrequest =
            rp.get(config.serviceUrl, {
                auth: { bearer: accessToken },
                json: true,
                qs: { search }
            })
            .then(mapResult);

        return searchrequest.then((value) => value);
    }
    return authenticatedOAuth2(config, getContacts);
}
