import axiosClient from "./axiosClient";

export const api = {
    getListGames: async () => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}`;
        return await axiosClient.get(url);
    },

    getListReleased: async () => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}&dates=2022-01-01,2022-12-31&ordering=-added`;
        return await axiosClient.get(url);
    },

    getGameByFilters: async (genres?: string, ordering?: string) => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}&ordering=${ordering}&genres=${genres}`;
        return await axiosClient.get(url);
    },

    getListByGenres: async (genre: string) => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}&genres=${genre}`
        return await axiosClient.get(url);
    },

    getPopularGames: async () => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}&ordering=-added`;
        return await axiosClient.get(url);
    },

    getGamesBySearch: async (search: string | undefined) => {
        const url = `games?key=${import.meta.env.VITE_API_KEY}&search=${search}&ordering=name,released&metacritic=20,100&search_precise=${search}&search_exact=true`;
        return await axiosClient.get(url);
    },

    getDetalinsGame: async (id: string | undefined) => {
        const url = `games/${id}?key=${import.meta.env.VITE_API_KEY}`
        return await axiosClient.get(url);
    },

    getTreilerGame: async (id: string | undefined) => {
        const url = `games/${id}/movies?key=${import.meta.env.VITE_API_KEY}`
        return await axiosClient.get(url);
    },

    getGameScreenshots: async (id: string | undefined) => {
        const url = `games/${id}/screenshots?key=${import.meta.env.VITE_API_KEY}`
        return await axiosClient.get(url);
    },

    getGameRelated: async (id: string | undefined) => {
        const url = `games/${id}/game-series?key=${import.meta.env.VITE_API_KEY}`
        return await axiosClient.get(url);
    },

    getGameAchievements: async (id: string | undefined) => {
        const url = `games/${id}/achievements?key=${import.meta.env.VITE_API_KEY}`
        return await axiosClient.get(url);
    },
    getListDlc: async (id: string | undefined) => {
        const url = `games/${id}/parent-games?key=${import.meta.env.VITE_API_KEY}&ordering=-added`;
        return await axiosClient.get(url);
    },
}
