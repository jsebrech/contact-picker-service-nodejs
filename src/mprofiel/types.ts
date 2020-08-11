import { OAuthConfig } from '../auth';

export interface ServiceConfig extends OAuthConfig {
    serviceUrl: string
}

export interface ContactItem {
    id: string,
    name: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    email?: string,
    domain?: string,
    avatarUrl?: string
}

export interface MprofielResult {
  _embedded: {
    profiles: Array<MprofielResultItem>
  },
  _links: {
    self: {
      href: string
    },
    first: {
      href: string
    },
    last: {
      href: string
    }
  },
  _page: {
    totalPages: number,
    totalElements: number,
    number: number,
    size: number
  },
}

export interface MprofielResultItem {
    id: string,
    firstName: string,
    lastName: string,
    nickName: string,
    fullName: string,
    userName: string,
    domain: string,
    avatarUrl: string,
    emailWork: string
}
