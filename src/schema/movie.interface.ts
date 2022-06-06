export interface Movie {
    id: number;
    title: string;
    runtime: number;
    year: number;
    mpaa_rating: string;
    genres: Record<number, string>; //{ [key: number]: string };
    description: string;
}
