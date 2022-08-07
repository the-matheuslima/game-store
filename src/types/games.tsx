export interface Games {
    name: string,
    background_image: string
    description_raw: string
    playtime: string
    rating: string
    rating_top: string
    publishers: Object[],
    platforms: Object[],
    genres: Genres[],
    tags: Tags[]
    id: number,
}

interface Tags {
    games_count: number
    id: number
    image_background: string
    language: string
    name: string
    slug: string
}

interface Genres {
    id: number
    name: string
    slug: string
}

// export interface Search {

// }