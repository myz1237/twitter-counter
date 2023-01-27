
import { getFollowers, getUserId } from "./utils.js";
import fs from 'fs'

const nameList = [
    // '1kxnetwork',
	// 'RariCapital',
	// '0xMaki',
	// 'CryptoMessiah',
	// 'Tetranode',
	'bluekirbyfi',
	'bantg',
	'DeFianceCapital',
	'Fiskantes',
	'safetyth1rd',
	'Daryllautk',
	'EvgenyGaevoy',
	'0mllwntrmt3',
	'intangiblecoins',
	'danrobinson',
	'zhusu',
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
	'gavinandresen'
];

async function main(){
    const users = [];
    const title = '\uFEFFTarget Twitter,Follower Name,Follower UserName,Followers Count,Following Count,Tweet Count,Listed Count\r\n';
    fs.writeFileSync('result.csv', title, {flag: 'a'});
    for (const username of nameList){
        console.log('Turn to ', username);
        const userId = await getUserId(username);
        if (!userId) {
            console.log('Cannot find ', username);
            continue;
        }
        console.log('UserId: ', userId);
        const data = await getFollowers(userId, username);
        users.push(data)
    }

    // csvContent = users.reduce((pre, cur, index) => {
    //     const userData = cur.reduce((previous, user) => {
    //         return previous + `${nameList[index]},${user.username},${user.created_at},${user.location ?? 'Unknown'}\r\n`;
    //     }, "");
    //     return pre + userData
    // }, "\uFEFFTarget Twitter,Follower UserName,Follower Account Created At,Follower Location\r\n");

    // fs.writeFileSync('result.csv', csvContent, {flag: 'a'});
}


(async() => {
    await main()
})()