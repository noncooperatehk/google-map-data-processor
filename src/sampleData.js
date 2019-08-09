let document = {
    name: ['親共 vs 真愛港商店地圖'],
    description: ['分店眾多之連鎖店, 未能逐一分店加入:<br>親共:<br>金拱門<br>大家樂<br>吉野家<br>華潤<br>Pacific Coffee<br>燉奶佬<br>Italian Tomato<br><br>真愛港:<br>PIZZA HUT<br><br>以上PIN 亦加到維港上<br><br>中資銀行:<br>中國銀行<br>集友銀行<br>交通銀行<br>南洋商業銀行<br>新華銀行<br>中南銀行<br>金城銀行<br>國華商業銀行<br>浙江興業銀行<br>鹽業銀行<br>廣東省銀行<br>華僑商業銀行<br>寶生銀行<br><br>-------------------------------------------------------------------<br><br>以下一切資料據知情人士透露(警方教路,一句知情人士大曬)<br><br>顏色越深越愛<br>只有當事人第一身說話作証先會最深色<br>第三身(食客聽到XXX)只可設低一級<br>有回應者會按回應升降級別<br><br>親共<br>紅 》橙 〉淺橙<br><br>真愛港<br>綠 》淺灰<br><br>認清商戶, 消費前三思<br><br>報料: https://lihkg.com/thread/1220413/page/1<br><br>想幫手入野email hk.shop.record@gmail.com'],
    Style: [
        {
            '$': [Object],
            IconStyle: [Array],
            BalloonStyle: [Array]
        }
    ],
    Folder: [
        {
            name: [Array],
            //Problem:
            // 1. some category refers to people and they do not correspond to a location
            // Solution:
            // we don't target people.
            // we don't target products, we target companies.
            // products may not have an address and it can pollute the map
            // products can be added back if afterwards, so they can be left out in this stage.
            // we only target things with a valid address
            // 2. With different business model, some subsidiary of one company has different stands from other subsidiaries
            // Solution: export all data and let the data checker to filter it.
            // 3. What if some data is updated ? How do we know ?
            // Solution: use git to set version and compare different version of the downloaded kml file
            Placemark: [Array]
        }
    ]
}

let placeMark = [
    {
        name: ['紅橋餐廳 '], //show this
        description: //this is parsed into extended Data, so no need to handle this
            ['<img src="https://lh4.googleusercontent.com/fmo52gYmUfu4KCTuEF_Vo0OxDQk_BSxTNt2znS9DjNxiQJnvLW-08yqvIYX2zq7LLji0rfFwEgMG8qdolqp6C4hIyp2AGTO0EKl3H0v4l7jG4VXY6y5zgoradwhuxMc1KvF39lY" height="200" width="auto" /><br><br>description: https://www.facebook.com/groups/TaipoTaipo/permalink/10162017490055245?sfns=mo<br>Location: 大埔<br>Group: 紅橋餐廳<br><br><img src="https://lh5.googleusercontent.com/pmTOfr3ZKTnnU5q4eiTq-k8zXvshDA37RaEqlgexPpGt-59dLbSJxOsAQTAwrjFfJA-BdadMadFDoVIMcJihwtA8nBDPEXuN0ajLU9P2xs6KxuT0drsNpAXYFkuDzAPhYJLeC1U" height="200" width="auto" />'],
        styleUrl: ['#icon-1577-F9A825-labelson'], //use color code to filter place markers
        ExtendedData: [[Object]],
        Point: [[Object]]
    }
]

let extendedData = [
    {
        Data: [
            { //Show this
                '$': {
                    name: 'description'
                },
                value: [
                    '去片\nhttps://www.facebook.com/watch/?v=2292683320953684\n香港華記茶餐廳想紅，大家幫下佢啦\nhttps://lih.kg/1214454\n咩話？華記茶餐廳？大家識做啦：）\nhttps://lih.kg/1320359\n'
                ]
            },
            { //Show this
                '$': {
                    name: 'Location'
                },
                value: [
                    '東京'
                ]
            },
            { //Show this
                '$': {
                    name: 'Group'
                },
                value: ['華記茶餐廳']
            },
            {
                '$': {name: 'gx_media_links'}, //Handling: No need to show this
                value: [
                    'https://lh6.googleusercontent.com/VXRVENqFgksLtpruvakqG-AXXNoOjHdMWZS13JptEURDb6-qUCZP3LA9i6cWeX1CsMndhmLKtCvnCNr6Kw-ADNwx2FDpnvvLigR1HJlF7ahGZw8XbVFO-BpnaMRsdSOZ7FPtqg https://lh5.googleusercontent.com/IEwQUHMuheSU4iyG1jrCIt4EtBpYyp--_KUCUYdeRlRlD366tjUP6TsTGeAyDG9HMzSAe3CVM6Mupq0iCiMaP7JEwzXpwq7mY3UmATPcEwY8KS_6Yz7L-fLcgkW5c4RW4bFJ'
                ]
            }]
    }
]

//Problem:
//1. should we target restaurants outside hong kong ?
//answer: we can place a marker but we do mainly focus on Hong Kong
let point = [
    {//three points in the coordinate. the last one must be zero
        coordinates: ['\n            114.1683732,22.448147,0\n          ']
    }
]
