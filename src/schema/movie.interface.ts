export interface Movie {
    id: number;
    title: string;
    runtime: number;
    year: number;
    mpaa_rating: string;
    genres: Record<number, string>; //{ [key: number]: string };
    description: string;
    release_date: string;
    rating: number;
}

export function createInitMovie(): Movie {
    return {
        id: -1,
        title: '',
        runtime: -1,
        year: 0,
        mpaa_rating: '',
        genres: {},
        description: '',
        release_date: '',
        rating: -1,
    };
}
