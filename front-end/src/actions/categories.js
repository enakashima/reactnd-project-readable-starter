export const RECEIVE_CATEGORIES = 'RECIEVE_CATEGORIES'

export function receiveCategories(categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories
    }
}