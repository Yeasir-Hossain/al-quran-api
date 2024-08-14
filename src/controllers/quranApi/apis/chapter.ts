import { AxiosError } from "axios";
import Api from "../req";
import { ChapterApi, ListChapters, Chapter, ChapterInfo, ALLOWED_LANGUAGES } from "../types";
import { handleError, handleResponse } from "../utils";

const api = Api();


export const chapter: ChapterApi = {
    listChapters(language = 'en'): Promise<ListChapters | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/chapters?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getChapter(id: number, language = 'en'): Promise<Chapter | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${id}?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    },
    getChapterInfo(chapter_id: number, language = 'en'): Promise<ChapterInfo | Error | AxiosError> {
        return new Promise((resolve, reject) => {
            api.get(`/chapters/${chapter_id}/info?${new URLSearchParams({ language })}`)
                .then(handleResponse(resolve))
                .catch(handleError(reject));
        });
    }
};

