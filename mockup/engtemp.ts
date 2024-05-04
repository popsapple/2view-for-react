import { createServer } from "miragejs";

createServer({
    routes() {
        this.get("/api/sripts", () => {
            return {
                url: 'https://vod.lawnorder.go.kr/cyberland/LawEdu_Drama_ep02.mp4',
                scripts: [
                    {
                        sentence: '제가 무얼 잘못한걸까요?',
                        unscramble: '제가/잘못한걸까요?/무얼',
                        start: '0.030',
                        end: '0.060',
                        idx: 0
                    },
                    {
                        sentence: '수출대금이 들어오지 않아 사파리 기업에게 연락을 했더니',
                        unscramble: '들어오지 않아/수출대금이/사파리 기업에게/했더니/연락을',
                        start: '0.065',
                        end: '0.110',
                        idx: 1
                    },
                    {
                        sentence: '이미 보냈다면서 영수증을 보내주는 거에요!',
                        unscramble: '보냈다면서/이미/영수증을/거에요!/보내주는',
                        start: '0.115',
                        end: '0.150',
                        idx: 2
                    },
                    {
                        sentence: '하지만 이미 영수증에는 다른 계좌번호가 적혀 있었고',
                        unscramble: '있었고/하지만/이미 영수증에는/계좌번호가/다른/적혀',
                        start: '0.155',
                        end: '0.180',
                        idx: 3
                    },
                    {
                        sentence: '사파리 기업은 이미 돈을 다 넣었다면서 수출대금을 돌려줄 수 없다고 하는 거에요.',
                        unscramble: '수출대금을/없다고/돈을 다/기업은 이미/넣었다면서/사파리/돌려줄 수/하는 거에요.',
                        start: '0.185',
                        end: '0.250',
                        idx: 4
                    },
                    {
                        sentence: '어떻게 된 일이죠?',
                        unscramble: '일이죠?/어떻게/된',
                        start: '0.255',
                        end: '0.280',
                        idx: 5
                    }
                ]
            }
        })
    },
})