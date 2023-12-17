export interface UserDetails {
    avatar_url?: string
    bio?: string,
    html_url?: string
    location?: string
    name?: string
    twitter_username?: string,
    public_repos?: number,
    login?: string
}

export interface UserRepoList {
    name?: string,
    description?: string,
    topics?: Array<string>
}