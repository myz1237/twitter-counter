
import { getFollowers, getUserFollowerCount, getUserId } from "./utils.js";
import fs from 'fs'

/*
    1. Update the nameList
    2. Run the code
*/

const nameList = [
	'richwgalvin',
	'SBF_FTX',
	'CryptoCobain',
	'kyled116',
	'Arthur_0x',
	'IamNomad',
	'CozomoMedici',
	'convexdegen',
	'KariyaKanav',
	'danielesesta',
	'josephdelong',
	'CryptoSeq',
	'dhof',
	'richardchen39',
	'kevinrose',
	'Vince_Van_Dough',
	'ptj_official',
	'CryptoKaleo',
	'ChrisBlec',
	'Pentosh1',
	'cmsintern',
	'0xbunnygirl',
	'crypto_bitlord7',
	'0xSisyphus',
	'WuBlockchain',
	'CroissantEth',
	'Lomashuk',
	'AutomataEmily',
	'matthuang',
	'paradigm',
	'machibigbrother',
	'0xtuba',
	'CathieDWood',
	'mcuban',
	'0x_b1',
	'sama',
	'wintermute_t',
	'redphonecrypto',
	'0xAkshay',
	'ASvanevik',
	'AlamedaTrabucco',
	'chamath',
	'cmsholdings',
	'CurveFinance',
	'TheChicagoVC',
	'bigmagicdao',
	'haydenzadams',
	'lawmaster',
	'jack',
	'anildelphi',
	'JayHao8',
	'cdixon',
	'YanLiberman',
	'Dogetoshi',
	'kaiynne',
	'Shaughnessy119',
	'draecomino',
	'paoloardoino',
	'iamDCinvestor',
	'danheld',
	'sassal0x',
	'VentureCoinist',
	'QwQiao',
	'FEhrsam',
	'el33th4xor',
	'hasufl',
	'iamjosephyoung',
	'jbrukh',
	'cburniske',
	'PanteraCapital',
	'RaoulGMI',
	'gavofyork',
	'DoveyWan',
	'BarrySilbert',
	'brian_armstrong',
	'AriDavidPaul',
	'novogratz',
	'ethereumJoseph',
	'ErikVoorhees',
	'gavinandresen',
	'zhusu'
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
        await getFollowers(userId, username, count);
        console.log(`Fetching followers of ${username} is done.`)
    }

}


(async() => {
    await main()
})()