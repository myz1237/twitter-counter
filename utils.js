import { myAxios } from "./axios.js";
import fs from 'fs'


const INTERVAL = 62 * 1000 // request per 62 secs

export const getFollowers = async (userId, userName, count) => {
    let params = {
        "max_results": 1000,
        "user.fields": "public_metrics"
    }
    const url = `https://api.twitter.com/2/users/${userId}/followers`

    let hasNextPage = true;
    let nextToken = null;
    while (hasNextPage) {
        let resp = await getPage(params, nextToken, url);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                writeFile(resp.data, userName);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
        await sleep(INTERVAL);
    }
    fs.writeFileSync('result.csv', `Follower Count,${count}\r\n`, {flag: 'a'});
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const getPage = async (params, nextToken, url) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }
    const resp = await myAxios.get(url, {
        params: params
    });

    return JSON.parse(resp.data) 

}

const writeFile = (data, userName) => {
    const csvContent = data.reduce((pre, cur) => {
        return pre + `${userName},${cur.name ?? 'Unknown'}, ${cur.username ?? 'Unknown'},${cur?.public_metrics?.followers_count ?? 0},${cur?.public_metrics?.following_count ?? 0},${cur?.public_metrics?.tweet_count ?? 0},${cur?.public_metrics?.listed_count ?? 0}\r\n`;
    }, "");

    fs.writeFileSync('result.csv', csvContent, {flag: 'a'});
}

export const getUserId = async (username) => {
    const initUrl = `https://api.twitter.com/2/users/by/username/${username}`;
    try {
        const result = await myAxios.get(initUrl);
        return JSON.parse(result.data)?.data?.id;
    } catch (error) {
        console.log(error?.message);
        return false
    }    
    
}

export const getUserFollowerCount = async (userId) => {
    const url = `https://api.twitter.com/2/users/${userId}`;
    const params = {
       " user.fields": 'public_metrics'
    }
    try {
        const result = await myAxios.get(url, {
            params
        });
        return JSON.parse(result.data)?.data?.public_metrics?.followers_count
    } catch (error) {
        console.log(error?.message);
        return false;
    }   
}