/* eslint-disable max-len */

const TEST_CASE_1 =
`
## Conferences

* [Awwwards Conference](http://conference.awwwards.com) // [@awwwardsNYC](https://twitter.com/awwwardsNYC)
* [BackboneConf](http://backboneconf.com/) // [@backboneconf](https://twitter.com/backboneconf)


### North American
* [!!Con](http://www.bangbangcon.com) // [@bangbangcon](http://twitter.com/bangbangcon)
#### New York
* [AlterConf](http://www.alterconf.com/) // [@AlterConf](https://twitter.com/alterconf)


### South American
* [Brazil JS Conf](http://braziljs.com.br/) // [@braziljs](http://www.twitter.com/braziljs)
### European
* [Arrrrcamp](http://2015.arrrrcamp.be) // [@arrrrcamp](https://twitter.com/arrrrcamp)
* [Beyond Tellerrand](http://beyondtellerrand.com) // [@btconf](https://twitter.com/btconf)

### Asian
* [CSSConf Asia](http://cssconf.asia/) // [@CSSconfasia](https://twitter.com/cssconfasia)
* [Jing JS (京JS)](http://jsconf.cn) // [@jingjsconf](https://twitter.com/jingjsconf)


## Call for Speakers

These sites list open calls for speakers.
`;

const TEST_CASE_1_RESULT = [
  { name: 'Awwwards Conference', url: 'http://conference.awwwards.com', twitterId: 'awwwardsNYC', region: 'Global' },
  { name: 'BackboneConf', url: 'http://backboneconf.com/', twitterId: 'backboneconf', region: 'Global' },
  { name: '!!Con', url: 'http://www.bangbangcon.com', twitterId: 'bangbangcon', region: 'North American' },
  { name: 'AlterConf', url: 'http://www.alterconf.com/', twitterId: 'AlterConf', region: 'North American' },
  { name: 'Brazil JS Conf', url: 'http://braziljs.com.br/', twitterId: 'braziljs', region: 'South American' },
  { name: 'Arrrrcamp', url: 'http://2015.arrrrcamp.be', twitterId: 'arrrrcamp', region: 'European' },
  { name: 'Beyond Tellerrand', url: 'http://beyondtellerrand.com', twitterId: 'btconf', region: 'European' },
  { name: 'CSSConf Asia', url: 'http://cssconf.asia/', twitterId: 'CSSconfasia', region: 'Asian' },
  { name: 'Jing JS (京JS)', url: 'http://jsconf.cn', twitterId: 'jingjsconf', region: 'Asian' },
];

module.exports = { TEST_CASE_1, TEST_CASE_1_RESULT };