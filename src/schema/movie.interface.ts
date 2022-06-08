export interface Movie {
    id: number;
    title: string;
    runtime: string;
    year: string;
    mpaa_rating: string;
    genres: Record<number, string>; //{ [key: number]: string };
    description: string;
    release_date: string;
    rating: string;
}

export function createInitMovie(): Movie {
    return {
        id: 0,
        title: '',
        runtime: '',
        year: '',
        mpaa_rating: '',
        genres: {},
        description: '',
        release_date: '',
        rating: '',
    };
}
