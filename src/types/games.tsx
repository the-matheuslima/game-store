export interface Games {
    map: any
    slice: any
    name: string,
    background_image: string
    background_image_additional?: string
    description_raw: string,
    description: string,
    playtime: string,
    rating: string,
    metacritic: number,
    rating_top: string,
    publishers: Object[],
    platforms: Object[],
    genres: Genres[],
    tags: Tags[],
    ratings: Ratings[]
    id: number,
    released: string
}

interface Tags {
    games_count: number
    id: number
    image_background: string
    language: string
    name: string
    slug: string
}


export interface favorite {
    id: number;
    name: string;
    background_image: string;
    metacritic: number;
    genres: Genres[];
};

interface Genres {
    id: number
    name: string
    slug: string
}

interface Ratings {
    count: number
    id: number
    percent: number
    title: string
}


