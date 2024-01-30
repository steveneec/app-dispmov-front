export type postType = {
    id: string,
    color: string,
    description: string,
    alt_description: string,
    urls: {
        raw: string,
        full: string,
        regular: string,
        small: string,
        thumb: string,
    },
    likes: number,
    user: {
        id: string,
        username: string,
        profile_image: {
            small: string,
            medium: string,
            large: string
        },
        social: {
            instagram_username: string,
            portfolio_url: string,
            twitter_username: string
        }
    }
}

export type userType = {
    id?: string,
    name: string,
    lastname: string
}