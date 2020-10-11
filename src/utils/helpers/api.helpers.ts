type Query = string | string[] | undefined;

/**
 * Concat queries using variables name and value
 * 
 * @param queries list of queries
 * @example q1="hi", q2="hello" => ?q1="hi"&q2="hello"
 */
export function createQueryString(...queries: Query[]): string {
    return '?' + queries.map(query => {
        if(!query) {
            return null;
        }

        if(typeof query === 'string') {
            return `${[query]}=${query}`;
        }

        return `${[query]}=${query.join(',')}`;
    }).join('&');
}