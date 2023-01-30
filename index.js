
import { getFollowers, getUserFollowerCount, getUserId } from "./utils.js";
import fs from 'fs'

/*
    1. Update the nameList
    2. Run the code
*/

const nameList = [
    '1kxnetwork',
];

async function main(){
    const title = '\uFEFFTarget Twitter,Follower Name,Follower UserName,Followers Count,Following Count,Tweet Count,Listed Count\r\n';
    fs.writeFileSync('result.csv', title, {flag: 'a'});
    for (const username of nameList){
        console.log('Turn to ', username);
        const userId = await getUserId(username);
        if (!userId) {
            console.log('Cannot find ', username);
            continue;
        }
        const count = await getUserFollowerCount(userId);
        if (!count) {
            console.log('Cannot find followers.');
            continue;
        }
        console.log(`${username} has ${count} followers, it will take ${Math.ceil(count / 1000)} mins to fetch all followers.`)
        console.log('Fetching...');
        await getFollowers(userId, username);
        console.log(`Fetching followers of ${username} is done.`)
    }

}


(async() => {
    await main()
})()